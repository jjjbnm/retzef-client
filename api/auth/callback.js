const crypto = require('crypto');
function cookieValue(req, name) { const header=req.headers.cookie||''; const part=header.split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'=')); return part?decodeURIComponent(part.slice(name.length+1)):''; }
function safeEqual(a,b){const aa=Buffer.from(a||'');const bb=Buffer.from(b||'');return aa.length===bb.length&&crypto.timingSafeEqual(aa,bb);}
function sign(value,secret){return crypto.createHmac('sha256',secret).update(value).digest('base64url');}
function fail(res,code){res.writeHead(302,{Location:`/?login_error=${encodeURIComponent(code)}#my-bots`});res.end();}
module.exports=async function handler(req,res){
 if(req.method!=='GET')return res.status(405).send('Method not allowed');
 const {DISCORD_CLIENT_ID,DISCORD_CLIENT_SECRET,SESSION_SECRET,SITE_URL}=process.env;
 const clear='discord_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
 if(!DISCORD_CLIENT_ID||!DISCORD_CLIENT_SECRET||!SESSION_SECRET||SESSION_SECRET.length<32||!SITE_URL)return res.status(503).send('Discord sign-in is not configured.');
 const state=cookieValue(req,'discord_oauth_state');
 res.setHeader('Set-Cookie',clear);
 if(!req.query.code||!safeEqual(req.query.state,state))return fail(res,'state');
 const redirectUri=`${SITE_URL.replace(/\/$/,'')}/api/auth/callback`;
 try{
  const tokenResponse=await fetch('https://discord.com/api/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:DISCORD_CLIENT_ID,client_secret:DISCORD_CLIENT_SECRET,grant_type:'authorization_code',code:req.query.code,redirect_uri:redirectUri})});
  const tokens=await tokenResponse.json();
  if(!tokenResponse.ok||!tokens.access_token)return fail(res,'token');
  const profileResponse=await fetch('https://discord.com/api/users/@me',{headers:{Authorization:`Bearer ${tokens.access_token}`}});
  const profile=await profileResponse.json();
  if(!profileResponse.ok||!profile.id||!profile.username)return fail(res,'profile');
  const session=Buffer.from(JSON.stringify({id:String(profile.id),username:profile.username,name:profile.global_name||profile.username,avatar:profile.avatar||'',exp:Date.now()+7*24*60*60*1000})).toString('base64url');
  const value=`${session}.${sign(session,SESSION_SECRET)}`;
  res.setHeader('Set-Cookie',[clear,`retzef_session=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`]);
  res.writeHead(302,{Location:'/?login=success#my-bots'});res.end();
 }catch(e){return fail(res,'server');}
};
