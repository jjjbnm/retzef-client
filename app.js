const $=id=>document.getElementById(id);
const STORAGE_KEY='retzef.plugins.v1';
let plugins=readPlugins();
let filter='all';
function readPlugins(){try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(value)?value:[]}catch{return[]}}
function savePlugins(){localStorage.setItem(STORAGE_KEY,JSON.stringify(plugins))}
function safeUrl(value){if(!value)return'';try{const url=new URL(value);return url.protocol==='https:'?url.href:''}catch{return''}}
function render(){
 const query=$('searchInput').value.trim().toLowerCase();
 const shown=plugins.filter(p=>(filter==='all'||filter==='installed')&&((p.name+' '+p.description).toLowerCase().includes(query)));
 $('resultCount').textContent=shown.length+' PLUGIN'+(shown.length===1?'':'S');
 $('pluginGrid').innerHTML=shown.map(p=>'<article class="plugin-card"><div class="card-top"><div class="plugin-symbol">'+escapeHtml(p.name.slice(0,1).toUpperCase())+'</div><span class="added-tag">Added</span></div><div><h3>'+escapeHtml(p.name)+'</h3><p>'+escapeHtml(p.description||'No description provided.')+'</p></div>'+(p.url?'<a class="card-url" href="'+escapeHtml(p.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(p.url)+'</a>':'')+'</article>').join('');
 $('emptyState').hidden=shown.length!==0;
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function openDialog(){$('pluginDialog').showModal();$('pluginName').focus()}
function closeDialog(){$('pluginDialog').close()}
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2300)}
$('addPlugin').addEventListener('click',openDialog);
$('emptyAdd').addEventListener('click',openDialog);
$('closeDialog').addEventListener('click',closeDialog);
$('cancelDialog').addEventListener('click',closeDialog);
$('searchInput').addEventListener('input',render);
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===button));render()}));
$('pluginForm').addEventListener('submit',event=>{event.preventDefault();const name=$('pluginName').value.trim();const description=$('pluginDescription').value.trim();const rawUrl=$('pluginUrl').value.trim();const url=safeUrl(rawUrl);if(!name)return;if(rawUrl&&!url){toast('Please use a valid HTTPS URL.');return}plugins.unshift({id:Date.now(),name,description,url});savePlugins();$('pluginForm').reset();closeDialog();render();toast('Plugin added to this browser.')});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!$('pluginDialog').open){event.preventDefault();$('searchInput').focus()}});
render();