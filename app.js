const VERSION="6.0.0";
const projects=[
{id:"retzef-discord",name:"Retzef Discord",mark:"RD",kind:"client",status:"CONCEPT",desc:"Client מקורי ל-Discord עם ממשק וכלים שנבנה בעצמנו, תוך שימוש בממשקים והרשאות רשמיים.",platforms:"WEB · DESKTOP",accent:"#ff7138"},
{id:"retzef-minecraft",name:"Retzef Minecraft",mark:"RM",kind:"client",status:"PLANNING",desc:"סביבת Minecraft מקורית עם חוויית משתמש, כלים ותוספים משלנו.",platforms:"WINDOWS · ANDROID",accent:"#a7d7b2"},
{id:"retzef-roblox",name:"Retzef Roblox",mark:"RR",kind:"client",status:"PLANNING",desc:"פרויקט מקורי לכלי Roblox ולסביבת שימוש מותאמת, בלי לעקוף הגנות של הפלטפורמה.",platforms:"WINDOWS · ANDROID",accent:"#8eb8f2"}
];
const library=[
{id:"discord",name:"Discord",mark:"D",kind:"app",desc:"קהילות, צ׳אטים ושיחות.",url:"https://discord.com/download"},
{id:"minecraft",name:"Minecraft",mark:"M",kind:"game",desc:"בנייה, חקירה והרפתקאות.",url:"https://www.minecraft.net/"},
{id:"roblox",name:"Roblox",mark:"R",kind:"game",desc:"משחקים וחוויות מהקהילה.",url:"https://www.roblox.com/download"},
{id:"obs",name:"OBS Studio",mark:"O",kind:"app",desc:"הקלטה ושידור חי.",url:"https://obsproject.com/"},
{id:"vscode",name:"Visual Studio Code",mark:"VS",kind:"app",desc:"עורך קוד וכלי פיתוח.",url:"https://code.visualstudio.com/"},
{id:"steam",name:"Steam",mark:"S",kind:"app",desc:"ספריית משחקים וקהילה.",url:"https://store.steampowered.com/about/"}
];
const $=s=>document.querySelector(s);
const read=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v:d}catch{return d}};
let favorites=read("retzef-v6-favorites",[]),recent=read("retzef-v6-recent",[]),custom=read("retzef-v6-projects",[]),page="home",query="",kind="all";
const all=()=>[...projects,...library,...custom];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function toast(t){const n=document.createElement("div");n.className="toast";n.textContent=t;$("#toasts").append(n);setTimeout(()=>n.remove(),2600)}
function save(){localStorage.setItem("retzef-v6-favorites",JSON.stringify(favorites));localStorage.setItem("retzef-v6-recent",JSON.stringify(recent));localStorage.setItem("retzef-v6-projects",JSON.stringify(custom))}
function projectCard(x){return '<article class="project-card" data-open="'+esc(x.id)+'" style="--card-accent:'+esc(x.accent||"#ff7138")+'"><div class="project-top"><div class="project-mark">'+esc(x.mark||"R")+'</div><span class="project-status">'+esc(x.status||"PERSONAL")+'</span></div><h3>'+esc(x.name)+'</h3><p>'+esc(x.desc||"פרויקט אישי בסביבת Retzef.")+'</p><div class="project-bottom"><span>'+esc(x.platforms||"RETZEF PROJECT")+'</span><span class="project-arrow">←</span></div></article>'}
function libraryCard(x){return '<article class="library-card" data-open="'+esc(x.id)+'"><div class="library-mark">'+esc(x.mark)+'</div><div class="library-info"><b>'+esc(x.name)+'</b><small>'+({app:"APPLICATION",game:"GAME",client:"RETZEF CLIENT"})[x.kind]+'</small></div><button class="fav-btn '+(favorites.includes(x.id)?"on":"")+'" data-fav="'+esc(x.id)+'" aria-label="מועדפים">'+(favorites.includes(x.id)?"★":"☆")+'</button></article>'}
function render(){
$("#favCount").textContent=favorites.length;$("#favoriteMetric").textContent=String(favorites.length).padStart(2,"0");
const visibleProjects=projects.filter(x=>(page!=="favorites"||favorites.includes(x.id))&&(page!=="recent"||recent.includes(x.id))&&(!query||x.name.toLowerCase().includes(query)||x.desc.toLowerCase().includes(query)));
const visibleLibrary=library.filter(x=>(page!=="favorites"||favorites.includes(x.id))&&(page!=="recent"||recent.includes(x.id))&&(kind==="all"||kind===x.kind)&&(!query||x.name.toLowerCase().includes(query)||x.desc.toLowerCase().includes(query)));
$("#projectGrid").innerHTML=visibleProjects.length?visibleProjects.map(projectCard).join(""):'<div class="empty-state">אין פרויקטים להצגה כרגע.</div>';
$("#libraryGrid").innerHTML=visibleLibrary.length?visibleLibrary.map(libraryCard).join(""):'<div class="empty-state">לא נמצאו פריטים. נסה לשנות את החיפוש או הסינון.</div>';
$("#projectCount").textContent=String(projects.length+custom.length).padStart(2,"0");$("#progressCount").textContent=String(projects.length+custom.length).padStart(2,"0");
const names={home:"סקירה כללית",projects:"הפרויקטים שלי",apps:"אפליקציות",games:"משחקים",favorites:"מועדפים",recent:"אחרונים",settings:"הגדרות"};
$("#pageTitle").textContent=names[page]||names.home;$("#listHeading").textContent=page==="projects"?"הפרויקטים שלי":page==="apps"?"אפליקציות":page==="games"?"משחקים":page==="favorites"?"המועדפים שלי":page==="recent"?"נצפו לאחרונה":"הספרייה";
$("#listSub").textContent=page==="projects"?"העבודות המקוריות שאנחנו בונים.":"אפליקציות ומשחקים שימושיים בסביבת העבודה.";
$("#featuredSection").hidden=page!=="home"&&page!=="projects";$("#metrics").hidden=page!=="home";$("#librarySection").hidden=page==="settings";
$("#projectGrid").parentElement.hidden=page==="apps"||page==="games"||page==="settings";
document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
if(page==="settings"){$("#libraryGrid").innerHTML='<div class="settings-panel"><div class="eyebrow muted">PREFERENCES</div><h3>הגדרות סביבת העבודה</h3><p>הנתונים האישיים כמו מועדפים, פרויקטים שיצרת והיסטוריית צפייה נשמרים בדפדפן במכשיר הזה.</p><button class="button button-ghost" id="clearFavorites">ניקוי מועדפים</button><button class="button button-ghost" id="clearRecent">ניקוי היסטוריה</button><button class="button button-ghost" id="exportData">ייצוא גיבוי</button></div>'}
}
function setPage(p){page=p;kind=p==="apps"?"app":p==="games"?"game":"all";$("#typeFilter").value=kind;$("#search").value="";query="";$("#sidebar").classList.remove("open");render();window.scrollTo({top:0,behavior:"smooth"})}
function showDetail(id){const x=all().find(a=>a.id===id);if(!x)return;recent=[id,...recent.filter(v=>v!==id)].slice(0,30);save();render();$("#modalBody").innerHTML='<div class="eyebrow muted">RETZEF WORKSPACE / '+esc(x.kind.toUpperCase())+'</div><h2 id="modalTitle">'+esc(x.name)+'</h2><p>'+esc(x.desc||"פרויקט אישי בסביבת Retzef.")+'</p><p>'+esc(x.platforms||"")+'</p><div class="modal-actions">'+(x.url?'<a class="button button-primary" href="'+esc(x.url)+'" target="_blank" rel="noopener">פתיחה באתר הרשמי ↗</a>':'<button class="button button-primary" id="projectStatus">פרויקט בתכנון</button>')+'<button class="button button-ghost" data-fav="'+esc(x.id)+'">'+(favorites.includes(x.id)?"הסר ממועדפים":"הוסף למועדפים")+'</button></div>'+(x.kind==="client"?'<p>זהו כרטיס פרויקט. הוא אינו מציג Client עובד או מתקין עד שהפיתוח שלו יושלם.</p>':"");$("#modal").hidden=false}
function createProject(){ $("#modalBody").innerHTML='<div class="eyebrow muted">NEW WORK</div><h2 id="modalTitle">יצירת פרויקט חדש</h2><p>הוסף רעיון חדש למרחב העבודה שלך.</p><label>שם הפרויקט<input id="newName" maxlength="48" placeholder="שם הפרויקט"></label><label>תיאור קצר<input id="newDesc" maxlength="140" placeholder="מה אנחנו בונים?"></label><label>סוג<select id="newKind"><option value="client">Custom Client</option><option value="app">אפליקציה</option><option value="game">משחק</option></select></label><div class="modal-actions"><button class="button button-primary" id="saveProject">יצירת פרויקט</button><button class="button button-ghost" id="cancelCreate">ביטול</button></div>';$("#modal").hidden=false}
function closeModal(){$("#modal").hidden=true}
document.addEventListener("click",e=>{
const nav=e.target.closest("[data-page]");if(nav){e.preventDefault();setPage(nav.dataset.page);return}
const fav=e.target.closest("[data-fav]");if(fav){e.stopPropagation();const id=fav.dataset.fav;favorites=favorites.includes(id)?favorites.filter(v=>v!==id):[...favorites,id];save();render();if(!$("#modal").hidden&&all().some(x=>x.id===id))showDetail(id);toast(favorites.includes(id)?"נוסף למועדפים":"הוסר מהמועדפים");return}
const open=e.target.closest("[data-open]");if(open){showDetail(open.dataset.open);return}
if(e.target.id==="createBtn")createProject();
if(e.target.id==="modalClose"||e.target.id==="cancelCreate"||e.target.id==="modal")closeModal();
if(e.target.id==="saveProject"){const name=$("#newName").value.trim(),desc=$("#newDesc").value.trim(),k=$("#newKind").value;if(!name){toast("צריך להוסיף שם לפרויקט");return}custom.push({id:"custom-"+Date.now(),name,desc,kind:k,mark:name.slice(0,2).toUpperCase(),status:"NEW IDEA",platforms:"PERSONAL PROJECT",accent:"#ff7138"});save();closeModal();setPage("projects");toast("הפרויקט נוסף למרחב העבודה")}
if(e.target.id==="clearFavorites"){favorites=[];save();render();toast("המועדפים נוקו")}
if(e.target.id==="clearRecent"){recent=[];save();render();toast("ההיסטוריה נוקתה")}
if(e.target.id==="exportData"){const blob=new Blob([JSON.stringify({favorites,recent,custom},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="retzef-client-backup.json";a.click();URL.revokeObjectURL(a.href)}
});
$("#modalClose").addEventListener("click",closeModal);$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#search").addEventListener("input",e=>{query=e.target.value.trim().toLowerCase();render()});
$("#typeFilter").addEventListener("change",e=>{kind=e.target.value;render()});
$("#sortFilter").addEventListener("change",e=>{if(e.target.value==="az")library.sort((a,b)=>a.name.localeCompare(b.name));else library.sort((a,b)=>["discord","minecraft","roblox","obs","vscode","steam"].indexOf(a.id)-["discord","minecraft","roblox","obs","vscode","steam"].indexOf(b.id));render()});
$("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("retzef-v6-light",document.body.classList.contains("light")?"1":"0")});
if(localStorage.getItem("retzef-v6-light")==="1")document.body.classList.add("light");
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus()}if(e.key==="Escape")closeModal()});
render();