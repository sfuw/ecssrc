
CREATE TABLE IF NOT EXISTS mock_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE mock_users ENABLE ROW LEVEL SECURITY;

-- No public read/write — only the service role (edge function) can access this table
CREATE POLICY "no_public_select" ON mock_users FOR SELECT TO anon USING (false);
CREATE POLICY "no_public_insert" ON mock_users FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "no_public_update" ON mock_users FOR UPDATE TO anon USING (false);
CREATE POLICY "no_public_delete" ON mock_users FOR DELETE TO anon USING (false);

-- Insert the sfu account with bcrypt hash of 'sfuwasnotheldaccountable1234'
-- Using pgcrypto to hash the password
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO mock_users (username, password_hash)
VALUES ('sfu', crypt('sfuwasnotheldaccountable1234', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;
