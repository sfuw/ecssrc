
CREATE TABLE IF NOT EXISTS mock_sessions (
  token TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id BIGINT NOT NULL REFERENCES mock_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT now() + INTERVAL '7 days'
);

ALTER TABLE mock_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_select_sessions" ON mock_sessions FOR SELECT TO anon USING (false);
CREATE POLICY "no_public_insert_sessions" ON mock_sessions FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "no_public_update_sessions" ON mock_sessions FOR UPDATE TO anon USING (false);
CREATE POLICY "no_public_delete_sessions" ON mock_sessions FOR DELETE TO anon USING (false);
