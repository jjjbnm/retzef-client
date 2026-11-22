const crypto = require('crypto');
module.exports = function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, SESSION_SECRET, SITE_URL } = process.env;
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !SESSION_SECRET || SESSION_SECRET.length < 32 || !SITE_URL) return res.status(503).send('Discord sign-in is not configured. Add DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in Vercel Environment Variables.');
  const state = crypto.randomBytes(32).toString('hex');
  const redirectUri = `${SITE_URL.replace(/\/$/, '')}/api/auth/callback`;
  res.setHeader('Set-Cookie', `discord_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
  const params = new URLSearchParams({ client_id: DISCORD_CLIENT_ID, redirect_uri: redirectUri, response_type: 'code', scope: 'identify email', state });
  res.writeHead(302, { Location: `https://discord.com/oauth2/authorize?${params}` });
  res.end();
};
