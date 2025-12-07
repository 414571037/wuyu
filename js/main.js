// Simple interaction script: reveal on scroll, animate progress bars, lightbox
(function () {
    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // if it contains progress bars, animate them
                const bars = entry.target.querySelectorAll('.progress-bar');
                bars.forEach(b => {
                    const val = b.getAttribute('data-value') || 0;
                    setTimeout(() => b.style.width = val + '%', 80);
                });
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));

    // Also animate any bars already in DOM
    document.querySelectorAll('.progress-bar').forEach(b => {
        const p = b.closest('.reveal');
        if (!p) { const val = b.getAttribute('data-value') || 0; setTimeout(() => b.style.width = val + '%', 120); }
    });

    // Lightbox simple implementation
    const lb = document.createElement('div'); lb.className = 'lb-backdrop';
    lb.innerHTML = '<div class="lb-content" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(lb);
    const lbContent = lb.querySelector('.lb-content');
    document.addEventListener('click', e => {
        const card = e.target.closest('.project-card');
        if (card) {
            const title = card.getAttribute('data-title') || '';
            const thumb = card.querySelector('.thumb');
            const bg = thumb ? getComputedStyle(thumb).backgroundImage.replace(/url\("|"\)/g, '') : '';
            lbContent.innerHTML = `<h3 style="margin-top:0">${title}</h3><div style="height:60vh;background-image:url('${bg}');background-size:cover;background-position:center;border-radius:8px"></div>`;
            lb.classList.add('show');
        }
        if (e.target === lb) lb.classList.remove('show');
    });

    // Smooth nav scrolling
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Parallax hero background - subtle
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY / 6;
            hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
        });
    }
})();
