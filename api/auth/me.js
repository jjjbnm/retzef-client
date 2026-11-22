const crypto = require('crypto');
function sign(value, secret) { return crypto.createHmac('sha256', secret).update(value).digest('base64url'); }
function safeEqual(a, b) { const aa = Buffer.from(a || ''); const bb = Buffer.from(b || ''); return aa.length === bb.length && crypto.timingSafeEqual(aa, bb); }
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ authenticated: false });
  const secret = process.env.SESSION_SECRET;
  const raw = (req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith('retzef_session='));
  if (!secret || !raw) return res.status(200).json({ authenticated: false });
  try {
    const value = decodeURIComponent(raw.slice('retzef_session='.length));
    const dot = value.lastIndexOf('.'); const payload = value.slice(0, dot); const signature = value.slice(dot + 1);
    if (!payload || !safeEqual(signature, sign(payload, secret))) return res.status(200).json({ authenticated: false });
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!user.email || user.exp < Date.now()) return res.status(200).json({ authenticated: false });
    return res.status(200).json({ authenticated: true, user: { email: user.email, name: user.name, picture: user.picture } });
  } catch (e) { return res.status(200).json({ authenticated: false }); }
};
