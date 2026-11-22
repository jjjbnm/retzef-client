const crypto = require('crypto');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET, SITE_URL } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !SESSION_SECRET || SESSION_SECRET.length < 32 || !SITE_URL) {
    return res.status(503).send('Google sign-in is not configured yet. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and a SESSION_SECRET of at least 32 characters in Vercel Environment Variables.');
  }
  const state = crypto.randomBytes(32).toString('hex');
  const redirectUri = `${SITE_URL.replace(/\/$/, '')}/api/auth/callback/google`;
  res.setHeader('Set-Cookie', `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account'
  });
  res.writeHead(302, { Location: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
  res.end();
};
