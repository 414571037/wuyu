// Interaction: reveal on scroll, animate progress bars, lightbox, smooth scroll
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        const bars = entry.target.querySelectorAll('.progress-bar');
        bars.forEach(b=>{
          const val = b.getAttribute('data-value')||0;
          setTimeout(()=>b.style.width = val + '%', 80);
        });
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  function applyProgressBars(){
    document.querySelectorAll('.progress-bar').forEach(b=>{
      const val = b.getAttribute('data-value')||0;
      if(!b.parentElement.querySelector('.percent')){
        const p = document.createElement('div'); p.className='percent'; p.textContent = val + '%';
        b.parentElement.parentElement.insertBefore(p, b.parentElement.nextSibling);
      }
      setTimeout(()=>b.style.width = val + '%', 120);
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyProgressBars); else applyProgressBars();

  // lightbox
  const lb = document.createElement('div'); lb.className='lb-backdrop'; lb.innerHTML = '<div class="lb-content" role="dialog" aria-modal="true"></div>';
  document.body.appendChild(lb);
  const lbContent = lb.querySelector('.lb-content');
  document.addEventListener('click', e=>{
    const card = e.target.closest('.project-card');
    if(card){
      const title = card.getAttribute('data-title') || (card.querySelector('h3')?card.querySelector('h3').textContent:'');
      const thumb = card.querySelector('.thumb');
      const bg = thumb ? getComputedStyle(thumb).backgroundImage.replace(/url\("|"\)/g,'') : '';
      lbContent.innerHTML = `<h3 style="margin-top:0">${title}</h3><div style="height:60vh;background-image:url('${bg}');background-size:cover;background-position:center;border-radius:8px"></div>`;
      lb.classList.add('show');
    }
    if(e.target === lb) lb.classList.remove('show');
  });

  // smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault(); const el = document.querySelector(href); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // back-to-top
  const btn = document.getElementById('back-to-top');
  function checkScroll(){ if(window.scrollY>200) btn.classList.add('show'); else btn.classList.remove('show'); }
  if(btn){ btn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'})); window.addEventListener('scroll', checkScroll); checkScroll(); }

})();
