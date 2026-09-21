import { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '@core/components/server/Breadcrumbs';
import { Heading } from '@core/components/server/Heading';
import { Text } from '@core/components/server/Text';
import { Tag } from '@core/components/server/Tag';
import { Button } from '@core/components/client/Button';
import { Input } from '@core/components/client/Input';
import { Select } from '@core/components/client/Select';
import { Alert } from '@core/components/client/Alert';
import { SearchIcon, UploadIcon } from '@core/icons';
import { EVENT, OWNERS, SPONSORS, TIERS } from './data/sponsors';
import { getHealth, urgencyScore } from './data/health';
import type { Health, Sponsor } from './data/types';
import { PipelineSummary } from './components/PipelineSummary';
import { AttentionList } from './components/AttentionList';
import { SponsorTable } from './components/SponsorTable';
import { SponsorDetail, type SponsorAction } from './components/SponsorDetail';
import { AddSponsor } from './components/AddSponsor';

type Filter = 'all' | Exclude<Health, 'declined'>;
type PageState = 'default' | 'loading' | 'empty' | 'error';
type Theme = 'light' | 'dark';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'at-risk', label: 'At risk' },
  { value: 'pending-payment', label: 'Pending payment' },
  { value: 'in-negotiation', label: 'In negotiation' },
  { value: 'confirmed', label: 'Confirmed' }
];

const initialState = (): PageState => {
  const p = new URLSearchParams(window.location.search).get('state');
  return p === 'loading' || p === 'empty' || p === 'error' ? p : 'default';
};

export function App() {
  const [pageState, setPageState] = useState<PageState>(initialState);
  const [sponsors, setSponsors] = useState<Sponsor[]>(SPONSORS);
  const [filter, setFilter] = useState<Filter>('all');
  const [tier, setTier] = useState('All tiers');
  const [owner, setOwner] = useState('All owners');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string>();
  const [toast, setToast] = useState<string>();
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // Tokens default to dark; light is applied through data-theme on the root, as in Storybook.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const data = pageState === 'empty' ? [] : sponsors;

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: 0,
      'at-risk': 0,
      'pending-payment': 0,
      'in-negotiation': 0,
      confirmed: 0
    };
    for (const s of data) {
      const h = getHealth(s).health;
      if (h === 'declined') continue;
      c.all += 1;
      c[h] += 1;
    }
    return c;
  }, [data]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter(s => (filter === 'all' ? true : getHealth(s).health === filter))
      .filter(s => (tier === 'All tiers' ? true : s.tier === tier))
      .filter(s => (owner === 'All owners' ? true : s.nextAction.owner === owner))
      .filter(s => !q || `${s.name} ${s.contact}`.toLowerCase().includes(q))
      .sort((a, b) => urgencyScore(a) - urgencyScore(b));
  }, [data, filter, tier, owner, query]);

  const hasActiveFilters = filter !== 'all' || tier !== 'All tiers' || owner !== 'All owners' || query !== '';
  const clearFilters = () => {
    setFilter('all');
    setTier('All tiers');
    setOwner('All owners');
    setQuery('');
  };

  const update = (id: string, patch: (s: Sponsor) => Sponsor, message: string) => {
    setSponsors(list => list.map(s => (s.id === id ? patch(s) : s)));
    setToast(message);
  };

  const onAction = (id: string, action: SponsorAction) => {
    const target = sponsors.find(s => s.id === id);
    if (!target) return;
    if (action === 'sign-contract') {
      update(
        id,
        s => ({
          ...s,
          contract: 'Signed',
          contractSentDaysAgo: undefined,
          stage: 'Committed',
          downgradeRequestedTo: undefined,
          lastActivityDaysAgo: 0,
          deliverables: s.deliverables ?? { done: 0, total: 4, missing: ['Logo (vector)', 'Booth requirements', 'Speaker bio', 'Attendee perk'] },
          nextAction: { label: 'Send invoice', dueInDays: 1, owner: s.nextAction.owner, waitingOn: 'us' }
        }),
        `${target.name}: contract marked signed. Next: send invoice.`
      );
    } else if (action === 'record-payment') {
      update(
        id,
        s => ({
          ...s,
          payment: 'Paid',
          paymentDueInDays: undefined,
          paymentAmountPaid: s.value,
          stage: 'Active',
          lastActivityDaysAgo: 0,
          nextAction: { label: 'Collect outstanding deliverables', dueInDays: 7, owner: s.nextAction.owner, waitingOn: 'sponsor' }
        }),
        `${target.name}: payment recorded.`
      );
    } else if (action === 'send-reminder') {
      update(id, s => ({ ...s, lastActivityDaysAgo: 0 }), `Reminder sent to ${target.contact} at ${target.name}.`);
    } else {
      update(id, s => ({ ...s, stage: 'Declined' }), `${target.name} marked as declined.`);
    }
    setOpenId(undefined);
  };

  return (
    <div className="min-h-screen bg-color-background-default text-color-content-default">
      <main className="mx-auto flex max-w-360 flex-col gap-8 px-4 py-8 md:px-8">
        <header className="flex flex-col gap-4">
          <Breadcrumbs items={[{ label: 'Events', href: '#' }, { label: EVENT.name, href: '#' }]} current="Sponsors" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h1" size="4xl" noMargin>
                Sponsor Pipeline
              </Heading>
              <Text size="base" color="weak">
                {EVENT.name} · {EVENT.city} · {EVENT.daysToEvent} days to go
              </Text>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" startIcon={<UploadIcon />}>
                Import
              </Button>
              <AddSponsor
                onAdd={s => {
                  setSponsors(list => [s, ...list]);
                  setPageState('default');
                  setToast(`${s.name} added as a prospect.`);
                }}
              />
            </div>
          </div>
        </header>

        {pageState === 'error' ? (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-color-border-subtle p-6" role="alert">
            <Heading as="h2" size="xl" noMargin>
              We could not load your sponsors
            </Heading>
            <Text color="weak">Check your connection and try again. Your changes are safe.</Text>
            <Button onClick={() => setPageState('default')}>Try again</Button>
          </div>
        ) : pageState === 'loading' ? (
          <LoadingSkeleton />
        ) : pageState === 'empty' ? (
          <EmptyPipeline onAdd={() => setPageState('default')} />
        ) : (
          <>
            <PipelineSummary sponsors={data} />
            <AttentionList sponsors={data} onOpen={setOpenId} />

            <section aria-labelledby="pipeline-heading" className="flex flex-col gap-4">
              <Heading as="h2" id="pipeline-heading" size="xl" noMargin>
                All sponsors
              </Heading>

              <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-64 flex-1 [&>*]:w-full">
                  <Input
                    ariaLabel="Search sponsors"
                    placeholder="Search sponsors or contacts"
                    type="search"
                    startIcon={<SearchIcon />}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <div className="w-44 [&>*]:w-full">
                  <Select
                    value={tier}
                    onValueChange={setTier}
                    InputProps={{ ariaLabel: 'Filter by tier' }}
                    options={['All tiers', ...TIERS.map(t => t.tier)].map(option => ({ option }))}
                  />
                </div>
                <div className="w-44 [&>*]:w-full">
                  <Select
                    value={owner}
                    onValueChange={setOwner}
                    InputProps={{ ariaLabel: 'Filter by owner' }}
                    options={['All owners', ...OWNERS].map(option => ({ option }))}
                  />
                </div>
              </div>

              <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
                {FILTERS.map(f => (
                  <Tag
                    key={f.value}
                    isInteractive
                    isActive={filter === f.value}
                    aria-pressed={filter === f.value}
                    label={`${f.label} · ${counts[f.value]}`}
                    onClick={() => setFilter(f.value)}
                  />
                ))}
              </div>

              {visible.length === 0 ? (
                <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-color-border-default p-8">
                  <Heading as="h3" size="lg" noMargin>
                    No sponsors match these filters
                  </Heading>
                  <Text color="weak">Try a different status or tier, or clear your filters.</Text>
                  {hasActiveFilters ? (
                    <Button variant="secondary" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  ) : null}
                </div>
              ) : (
                <SponsorTable sponsors={visible} onOpen={setOpenId} />
              )}
            </section>
          </>
        )}

        <footer className="flex flex-wrap items-center gap-3 border-t border-color-border-subtle pt-6">
          <Text size="xs" color="weak" transform="uppercase" weight="bold">
            Design review: page state and theme
          </Text>
          {(['default', 'loading', 'empty', 'error'] as PageState[]).map(st => (
            <Tag
              key={st}
              isInteractive
              isActive={pageState === st}
              aria-pressed={pageState === st}
              label={st[0].toUpperCase() + st.slice(1)}
              onClick={() => setPageState(st)}
            />
          ))}
          <span className="mx-2 h-4 w-px bg-color-border-subtle" aria-hidden="true" />
          {(['light', 'dark'] as Theme[]).map(t => (
            <Tag
              key={t}
              isInteractive
              isActive={theme === t}
              aria-pressed={theme === t}
              label={t[0].toUpperCase() + t.slice(1)}
              onClick={() => setTheme(t)}
            />
          ))}
        </footer>
      </main>

      <SponsorDetail
        sponsor={sponsors.find(s => s.id === openId)}
        onClose={() => setOpenId(undefined)}
        onAction={onAction}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50" role="status" aria-live="polite">
          <Alert variant="success" title={toast} isDismissible onCloseClick={() => setToast(undefined)} />
        </div>
      ) : null}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading sponsors" className="flex flex-col gap-4">
      <div className="h-48 animate-pulse rounded-lg bg-color-background-weak" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-color-background-weak" />
      ))}
    </div>
  );
}

function EmptyPipeline({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-color-border-default px-6 py-16 text-center">
      <Heading as="h2" size="2xl" noMargin>
        Start your sponsor pipeline
      </Heading>
      <Text color="weak" className="max-w-md">
        Add the first sponsor you are talking to, or import a spreadsheet. Eventz will flag stalled deals, unsigned
        contracts and late payments as you go.
      </Text>
      <div className="flex gap-3">
        <Button variant="secondary" startIcon={<UploadIcon />}>
          Import from spreadsheet
        </Button>
        <Button onClick={onAdd}>Load sample sponsors</Button>
      </div>
    </div>
  );
}
