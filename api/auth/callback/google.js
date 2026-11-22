const crypto = require('crypto');

function cookieValue(req, name) {
  const header = req.headers.cookie || '';
  const part = header.split(';').map(v => v.trim()).find(v => v.startsWith(name + '='));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : '';
}
function safeEqual(a, b) {
  const aa = Buffer.from(a || ''); const bb = Buffer.from(b || '');
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}
function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}
function redirectError(res, code) {
  res.writeHead(302, { Location: `/?login_error=${encodeURIComponent(code)}#my-bots` });
  res.end();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET, SITE_URL } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !SESSION_SECRET || SESSION_SECRET.length < 32 || !SITE_URL) return res.status(503).send('Google sign-in is not configured.');
  const stateCookie = cookieValue(req, 'oauth_state');
  res.setHeader('Set-Cookie', [
    'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
  ]);
  if (!req.query.code || !safeEqual(req.query.state, stateCookie)) return redirectError(res, 'state');
  const redirectUri = `${SITE_URL.replace(/\/$/, '')}/api/auth/callback/google`;
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: req.query.code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });
    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok || !tokens.access_token) return redirectError(res, 'token');
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const profile = await profileResponse.json();
    if (!profileResponse.ok || !profile.email || profile.verified_email !== true) return redirectError(res, 'email');
    const session = Buffer.from(JSON.stringify({ email: profile.email, name: profile.name || '', picture: profile.picture || '', exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
    const value = `${session}.${sign(session, SESSION_SECRET)}`;
    res.setHeader('Set-Cookie', [
      'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
      `retzef_session=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
    ]);
    res.writeHead(302, { Location: '/?login=success#my-bots' });
    res.end();
  } catch (error) {
    return redirectError(res, 'server');
  }
};
