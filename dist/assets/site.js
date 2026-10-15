const page = document.body.dataset.page || '';

const mainNav = document.querySelector('.nav-links');
if (mainNav && !mainNav.querySelector('a[href="privacy.html"]')) {
  const privacyLink = document.createElement('a');
  privacyLink.className = 'nav-link';
  privacyLink.dataset.nav = 'privacy';
  privacyLink.href = location.pathname.endsWith('/privacy-vi.html') ? 'privacy-vi.html' : 'privacy.html';
  privacyLink.textContent = document.documentElement.lang === 'en' ? 'Privacy' : 'Quyền riêng tư';
  const contactLink = mainNav.querySelector('.nav-cta');
  mainNav.insertBefore(privacyLink, contactLink);
}

document.querySelectorAll('[data-nav]').forEach(link => {
  if (link.dataset.nav === page) link.classList.add('active');
});

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.innerHTML = open ? '✕' : '☰';
});

const transition = document.querySelector('.page-transition');
requestAnimationFrame(() => transition?.classList.add('enter'));
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || link.target === '_blank') return;
  link.addEventListener('click', event => {
    event.preventDefault();
    transition?.classList.remove('enter');
    transition?.classList.add('leave');
    setTimeout(() => { window.location.href = href; }, 460);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const slider = document.querySelector('.app-slider');
document.querySelector('[data-slider="next"]')?.addEventListener('click', () => slider.scrollBy({ left: slider.clientWidth * .72, behavior: 'smooth' }));
document.querySelector('[data-slider="prev"]')?.addEventListener('click', () => slider.scrollBy({ left: -slider.clientWidth * .72, behavior: 'smooth' }));

document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`[NOVA Studio] ${data.get('subject')}`);
  const body = encodeURIComponent(`Tên: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  const toast = document.querySelector('.toast');
  toast?.classList.add('show');
  setTimeout(() => toast?.classList.remove('show'), 3200);
  setTimeout(() => { window.location.href = `mailto:hello@novastudio.app?subject=${subject}&body=${body}`; }, 450);
});

if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.append(glow);
  window.addEventListener('pointermove', e => {
    glow.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: 'forwards' });
  });
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('pointermove', e => {
    if (!heroBg) return;
    const x = (e.clientX / innerWidth - .5) * 10;
    const y = (e.clientY / innerHeight - .5) * 8;
    heroBg.style.transform = `scale(1.035) translate(${x}px, ${y}px)`;
  });
}

document.querySelector('[data-year]')?.replaceChildren(String(new Date().getFullYear()));
