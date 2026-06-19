-- ============================================================================
-- Migration 003 — Fix search_content() ranking
--
-- Bug: the hybrid rank formula PENALIZED the document that matched the text
-- query. A text-matching row was scored `similarity * 0.7 + ts_rank * 0.3`,
-- while non-matching rows kept their FULL similarity. Because ts_rank values
-- are tiny (~0.05), the 0.3 weight never compensates for the 0.3 similarity
-- lost — so the exact doc you searched for ranked *below* its lookalike
-- siblings. With template-similar component docs clustered at ~0.8 cosine
-- similarity, the target doc fell out of the top-N entirely (e.g. asking about
-- "Tag" returned Button/Checkbox/Input and the model concluded Tag was
-- undocumented).
--
-- Fix: vector similarity is the base score; a text match is a positive BOOST,
-- never a penalty. Pure-vector ranking is already correct for these docs, so
-- the text signal is now only a small tie-breaker/relevance bump.
-- ============================================================================

CREATE OR REPLACE FUNCTION search_content(
  query_embedding vector(1024),
  query_text TEXT DEFAULT NULL,
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10,
  filter_category TEXT DEFAULT NULL,
  filter_tags TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  id TEXT,
  title TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  confidence TEXT,
  similarity FLOAT,
  rank FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT
      e.id,
      e.title,
      e.content,
      e.category,
      e.tags,
      e.confidence,
      1 - (e.embedding <=> query_embedding) AS similarity
    FROM content_entries e
    WHERE
      (filter_category IS NULL OR e.category = filter_category)
      AND (filter_tags IS NULL OR e.tags && filter_tags)
      AND e.embedding IS NOT NULL
  ),
  text_results AS (
    SELECT
      e.id,
      ts_rank(e.search_text, plainto_tsquery('english', query_text)) AS text_rank
    FROM content_entries e
    WHERE
      query_text IS NOT NULL
      AND e.search_text @@ plainto_tsquery('english', query_text)
  )
  SELECT
    v.id,
    v.title,
    v.content,
    v.category,
    v.tags,
    v.confidence,
    v.similarity,
    -- Base = vector similarity; text match adds a small positive boost only.
    (v.similarity + 0.15 * COALESCE(t.text_rank, 0)) AS rank
  FROM vector_results v
  LEFT JOIN text_results t ON v.id = t.id
  WHERE v.similarity >= match_threshold
  ORDER BY rank DESC
  LIMIT match_count;
END;
$$;
