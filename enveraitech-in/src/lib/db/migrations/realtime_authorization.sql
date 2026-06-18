-- ─────────────────────────────────────────────────────────────────────────────
-- Supabase Realtime Authorization for the enveraitech.in lounge
--
-- The lounge subscribes to PRIVATE channels (config.private = true). Supabase
-- gates private Broadcast + Presence with RLS on the realtime.messages table,
-- evaluated against the short-lived team JWT minted by /api/realtime/token
-- (role = "authenticated").
--
-- Run ONCE in the Supabase SQL editor (or psql) for this project.
-- Until this is applied, the lounge still works (messages persist via the API
-- and load on refresh); only live delivery/presence is disabled.
-- ─────────────────────────────────────────────────────────────────────────────

-- Allow authenticated team tokens to RECEIVE broadcast/presence on lounge:* channels.
create policy "lounge_read_authenticated"
on realtime.messages
for select
to authenticated
using (
  realtime.topic() like 'lounge:%'
);

-- Allow authenticated team tokens to SEND broadcast + track presence on lounge:* channels.
create policy "lounge_write_authenticated"
on realtime.messages
for insert
to authenticated
with check (
  realtime.topic() like 'lounge:%'
);

-- NOTE: This scopes access to the team because the JWT is only issued by our
-- server (/api/realtime/token) to allowlisted members, signed with the project
-- JWT secret. Anyone without that token authenticates only as the anon role,
-- which these policies do not grant. To tighten further (per-room membership),
-- replace the topic LIKE checks with a lookup against a membership table.
