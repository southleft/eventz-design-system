/**
 * Preload polyfill: provide a global `WebSocket` on Node < 22 so that
 * @supabase/realtime-js (pulled in by @supabase/supabase-js) initializes.
 *
 * The realtime WebSocketFactory returns `globalThis.WebSocket` if present
 * BEFORE it gates on the Node version, so defining it here lets the publish
 * step run on the project's default Node 20 (no Node 22 required).
 * On Node 22+ this is a no-op (native WebSocket already exists).
 */
try {
  if (typeof globalThis.WebSocket === 'undefined') {
    const ws = require('ws');
    globalThis.WebSocket = ws.WebSocket || ws;
  }
} catch {
  // ws not resolvable / native WebSocket present — ignore
}
