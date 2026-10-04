import { channel, videos } from './data/channel.js';
import { setupPlayer } from './components/player.js';

document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('#nav');
menu.hidden=false;
function closeMenu() {menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const tools=document.querySelector('.collection-tools'), search=document.querySelector('#search'), empty=document.querySelector('#video-empty');
tools.hidden=false;
let category='All';
function filterVideos() {
  const query=search.value.trim().toLocaleLowerCase();
  let count=0;
  document.querySelectorAll('#video-grid [data-video]').forEach(card=>{
    const video=videos.find(v=>v.id===card.dataset.video);
    const visible=video && (category==='All'||video.category===category) && video.title.toLocaleLowerCase().includes(query);
    card.hidden=!visible; if(visible)count++;
  });
  empty.hidden=count>0;
  empty.querySelector('h3').textContent=videos.length ? 'No videos match your search.' : 'The next adventure is on YouTube.';
  empty.querySelector('p').textContent=videos.length ? 'Try another title or choose a different category.' : query || category!=='All' ? 'No matching videos are available here yet. Browse the channel on YouTube.' : 'Explore the channel’s videos directly on YouTube.';
  document.querySelector('#results').textContent=`${count} video${count===1?'':'s'} found`;
}
search.addEventListener('input',filterVideos);
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterVideos();}));
document.querySelectorAll('.thumbnail img').forEach(img=>{const handle=()=>{img.hidden=true;img.parentElement.classList.add('thumbnail-unavailable');};img.addEventListener('error',handle);if(img.complete&&!img.naturalWidth)handle();});
setupPlayer(videos);
const scene=document.querySelector('#scene');
const observer=new IntersectionObserver(async entries=>{
  if(!entries.some(e=>e.isIntersecting))return;
  observer.disconnect();
  try {const {setupScene}=await import('./scene.js');setupScene(scene);} catch {scene.dataset.state='fallback';}
},{rootMargin:'150px'});
observer.observe(scene);
// Additional supplied social links are rendered only when actual URLs exist.
channel.socials.forEach(s=>{if(!/^https:\/\//.test(s.url))return;const a=document.createElement('a');a.href=s.url;a.textContent=s.label;document.querySelector('.footer>div').append(a);});
