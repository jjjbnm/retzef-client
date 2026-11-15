const crypto=require('crypto');
module.exports=(req,res)=>{
  const {DISCORD_CLIENT_ID,SITE_URL}=process.env;
  if(!DISCORD_CLIENT_ID||!SITE_URL)return res.status(503).send('Set DISCORD_CLIENT_ID and SITE_URL in Vercel.');
  const state=crypto.randomBytes(24).toString('hex');
  const redirect=process.env.DISCORD_REDIRECT_URI||new URL('/api/auth/callback',SITE_URL).href;
  res.setHeader('Set-Cookie','rz_state='+state+'; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600');
  const u=new URL('https://discord.com/oauth2/authorize');
  const scopes='identify guilds email connections guilds.join gdm.join messages.read openid applications.commands.permissions.update role_connections.write guilds.members.read rpc rpc.notifications.read rpc.activities.write rpc.screenshare.write rpc.video.write rpc.voice.write applications.store.update applications.commands';
  for(const [k,v] of Object.entries({client_id:DISCORD_CLIENT_ID,response_type:'code',redirect_uri:redirect,scope:scopes}))u.searchParams.set(k,v);
  u.searchParams.set('state',state);
  return res.redirect(302,u.href);
};