module.exports = function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Set-Cookie', 'retzef_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true });
};
