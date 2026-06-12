const EDGE_BASE = 'https://tvldqprhqcdtalkghtbh.supabase.co/functions/v1/mock-auth';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bGRxcHJocWNkdGFsa2dodGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NDM4NzEsImV4cCI6MjA5NjMxOTg3MX0.4KIIk8_NamaOChvltkYZBfsK1QnPUL13wViKK7nQpvE';

const headers = () => ({
  'Content-Type': 'application/json',
  'Apikey': ANON_KEY,
});

const SESSION_KEY = 'mock_session_token';

export const mockLogin = async ({ username, password }) => {
  const res = await fetch(`${EDGE_BASE}/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.errors?.[0]?.message || 'Login failed');
    err.response = { data };
    throw err;
  }
  localStorage.setItem(SESSION_KEY, data.token);
  return data;
};

export const mockGetMyInfo = async () => {
  const token = localStorage.getItem(SESSION_KEY);
  if (!token) return null;
  const res = await fetch(`${EDGE_BASE}/me`, {
    method: 'GET',
    headers: { ...headers(), 'x-session-token': token },
  });
  if (!res.ok) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return res.json();
};

export const mockLogout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const hasMockSession = () => !!localStorage.getItem(SESSION_KEY);
