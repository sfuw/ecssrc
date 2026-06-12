
CREATE OR REPLACE FUNCTION verify_mock_user(p_username TEXT, p_password TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id BIGINT;
  v_hash TEXT;
BEGIN
  SELECT id, password_hash INTO v_id, v_hash
  FROM mock_users
  WHERE username = p_username;

  IF v_id IS NULL THEN
    RETURN NULL;
  END IF;

  IF v_hash = crypt(p_password, v_hash) THEN
    RETURN v_id;
  END IF;

  RETURN NULL;
END;
$$;
