const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    if (open) {
      navLinks.querySelector('a')?.focus({preventScroll: true});
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 980px)').matches) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

document.getElementById('year')?.append(new Date().getFullYear());

const cfg = window.SLTT_CONFIG || {};
let connectedSocials = 0;
document.querySelectorAll('[data-social]').forEach((link) => {
  const key = link.dataset.social;
  const url = cfg[key];
  if (url) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    connectedSocials += 1;
  } else {
    link.hidden = true;
  }
});
document.querySelectorAll('[data-social-notice]').forEach((el) => el.remove());


// Connect contact/submission email without changing page markup.
if (cfg.contactEmail) {
  document.querySelectorAll('[data-email-link]').forEach((a) => {
    a.href = `mailto:${cfg.contactEmail}?subject=Sierra%20Leone%20To%20The%20Top%20story%20lead`;
  });
  document.querySelectorAll('[data-email-notice]').forEach((el) => el.remove());
} else {
  document.querySelectorAll('[data-email-link]').forEach((a) => {
    a.setAttribute('aria-disabled','true');
    a.addEventListener('click', (e) => e.preventDefault());
  });
}
