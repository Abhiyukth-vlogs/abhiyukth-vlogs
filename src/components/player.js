export function setupPlayer(videos) {
  const dialog = document.querySelector('#player');
  const frame = document.querySelector('#player-frame');
  const title = document.querySelector('#player-title');
  const fallback = document.querySelector('#watch-fallback');
  const close = document.querySelector('#close-player');
  let trigger;
  function cleanup() {
    frame.replaceChildren(); // Removing the iframe terminates playback.
    document.body.classList.remove('modal-open');
    trigger?.focus();
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', cleanup);
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); }});
  dialog.addEventListener('keydown', e => {
    if(e.key !== 'Tab') return;
    // Explicit boundary trapping supplements the native modal's focus isolation.
    const first=close, last=fallback;
    if(e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.addEventListener('click', e => {
    const link=e.target.closest('a[data-video]');
    if(!link || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const video=videos.find(v=>v.id===link.dataset.video);
    if(!video || typeof dialog.showModal !== 'function') return;
    e.preventDefault(); trigger=link;
    title.textContent=video.title;
    fallback.href=link.href;
    const iframe=document.createElement('iframe');
    iframe.title=video.title;
    iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0`;
    iframe.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.allowFullscreen=true;
    iframe.addEventListener('error',()=> { const message=document.createElement('p'); message.textContent='Playback is unavailable. Use the YouTube link below.'; frame.replaceChildren(message); });
    frame.replaceChildren(iframe);
    dialog.showModal(); document.body.classList.add('modal-open'); close.focus();
  });
}
