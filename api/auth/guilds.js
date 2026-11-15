const crypto=require('crypto');
function readCookie(req,name){const raw=req.headers.cookie||'';const part=raw.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='));return part?decodeURIComponent(part.slice(name.length+1)):''}
function openSession(value,secret){const packed=Buffer.from(value,'base64url');if(packed.length<29)throw new Error('Invalid session');const iv=packed.subarray(0,12),tag=packed.subarray(12,28),body=packed.subarray(28);const key=crypto.createHash('sha256').update(secret).digest();const decipher=crypto.createDecipheriv('aes-256-gcm',key,iv);decipher.setAuthTag(tag);return JSON.parse(Buffer.concat([decipher.update(body),decipher.final()]).toString())}
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 const secret=process.env.SESSION_SECRET;
 if(!secret)return res.status(503).json({error:'Session configuration missing'});
 const cookie=readCookie(req,'rz_session');
 if(!cookie)return res.status(401).json({error:'Not connected'});
 try{
  const session=openSession(cookie,secret);
  if(!session.access_token||session.expires_at<Date.now())return res.status(401).json({error:'Session expired'});
  const response=await fetch('https://discord.com/api/users/@me/guilds',{headers:{Authorization:'Bearer '+session.access_token}});
  if(!response.ok)return res.status(response.status===401?401:502).json({error:'Could not load Discord communities'});
  const guilds=await response.json();
  return res.status(200).json({guilds:guilds.map(g=>({id:g.id,name:g.name,icon:g.icon,owner:!!g.owner,permissions:g.permissions}))});
 }catch(error){console.error('Guild loading failed:',error.message);return res.status(401).json({error:'Session invalid or expired'})}
};