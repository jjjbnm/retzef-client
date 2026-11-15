const toast=document.getElementById('toast');
function note(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3200)}
function connect(){location.href='/api/auth/discord'}
document.getElementById('connect').addEventListener('click',connect);
document.getElementById('connect-card').addEventListener('click',connect);
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-view]').forEach(item=>item.classList.remove('selected'));
 button.classList.add('selected');
 const labels={home:'סקירה כללית',messages:'שיחות',spaces:'מרחבים',activity:'פעילות',connections:'חיבורים',settings:'הגדרות'};
 document.getElementById('page-title').textContent=labels[button.dataset.view]||'Retzef Client';
 if(button.dataset.view!=='home') note('החלק הזה יופעל בהמשך.');
}));
document.getElementById('settings').addEventListener('click',()=>{document.querySelector('[data-view="settings"]').click()});
function showUser(user){
 if(!user)return;
 document.getElementById('username').textContent=user.global_name||user.username||'משתמש Discord';
 document.getElementById('user-avatar').textContent=(user.username||'D').slice(0,1).toUpperCase();
 document.getElementById('status').textContent='מחובר';
 document.getElementById('connection-dot').style.background='#43b581';
 document.getElementById('connect').textContent='מחובר';
 document.getElementById('discord-state').textContent='מחובר';
}
function renderGuilds(guilds){
 const panel=document.getElementById('guilds-panel'),list=document.getElementById('guild-list');
 panel.hidden=false;document.getElementById('guild-count').textContent=String(guilds.length);
 document.getElementById('spaces-status').textContent=guilds.length+' מרחבים נמצאו';
 list.replaceChildren();
 if(!guilds.length){const p=document.createElement('p');p.className='guild-empty';p.textContent='לא נמצאו מרחבים בחשבון.';list.append(p);return}
 guilds.forEach(guild=>{
  const item=document.createElement('article');item.className='guild-item';
  const avatar=document.createElement('div');avatar.className='guild-avatar';avatar.textContent=(guild.name||'?').slice(0,1).toUpperCase();
  if(guild.icon) {const img=document.createElement('img');img.alt='';img.src='https://cdn.discordapp.com/icons/'+encodeURIComponent(guild.id)+'/'+encodeURIComponent(guild.icon)+'.png?size=64';img.onerror=()=>img.remove();avatar.replaceChildren(img)}
  const info=document.createElement('div');info.className='guild-info';
  const name=document.createElement('strong');name.textContent=guild.name||'ללא שם';
  const meta=document.createElement('small');meta.textContent=guild.owner?'בעלים':'חבר';
  info.append(name,meta);item.append(avatar,info);list.append(item);
 });
}
async function loadSession(){
 try{
  const response=await fetch('/api/auth/me',{cache:'no-store'}),data=await response.json();
  if(!data.user)return;
  showUser(data.user);
  const guildResponse=await fetch('/api/auth/guilds',{cache:'no-store'}),guildData=await guildResponse.json();
  if(guildResponse.ok&&Array.isArray(guildData.guilds))renderGuilds(guildData.guilds);
  else note(guildData.error||'לא ניתן לטעון מרחבים כרגע.');
 }catch(error){console.error(error)}
}
const params=new URLSearchParams(location.search);
if(params.has('connected')){note('חשבון Discord חובר בהצלחה.');history.replaceState({},'',location.pathname)}
if(params.has('error')){note('החיבור לא הושלם. יש לבדוק את הגדרות Discord.');history.replaceState({},'',location.pathname)}
loadSession();
