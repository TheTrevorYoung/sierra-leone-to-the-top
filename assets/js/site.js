const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

// v2.4: simplify the public navigation around the site's core jobs.
if (navLinks) {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const navItems = [
    ['stories.html', 'Stories'],
    ['discover.html', 'Discover'],
    ['watch.html', 'Watch'],
    ['about.html', 'About'],
    ['search.html', 'Search']
  ];
  navLinks.innerHTML = navItems.map(([href, label]) => {
    const active = current === href ? ' aria-current="page"' : '';
    const cls = href === 'search.html' ? ' class="nav-search"' : '';
    const aria = href === 'search.html' ? ' aria-label="Search Sierra Leone To The Top"' : '';
    return `<a${cls} href="${href}"${active}${aria}>${label}</a>`;
  }).join('');
}

if (menuButton && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    if (open) navLinks.querySelector('a')?.focus({preventScroll: true});
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 980px)').matches) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

document.getElementById('year')?.append(new Date().getFullYear());

const cfg = window.SLTT_CONFIG || {};
document.querySelectorAll('[data-social]').forEach((link) => {
  const key = link.dataset.social;
  const url = cfg[key];
  if (url) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.hidden = true;
  }
});
document.querySelectorAll('[data-social-notice]').forEach((el) => el.remove());

if (cfg.contactEmail) {
  document.querySelectorAll('[data-email-link]').forEach((a) => {
    a.href = `mailto:${cfg.contactEmail}?subject=Sierra%20Leone%20To%20The%20Top%20story%20lead`;
  });
  document.querySelectorAll('[data-email-notice]').forEach((el) => el.remove());
} else {
  document.querySelectorAll('[data-email-link]').forEach((a) => {
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', (e) => e.preventDefault());
  });
}

// v2.4 shared visual refinements. Kept here so the current static pages inherit the update together.
const v24Style = document.createElement('style');
v24Style.textContent = `
  .v24-ready-poster{display:flex;min-height:100%;padding:clamp(28px,5vw,56px);background:linear-gradient(145deg,#0b1f33,#123a59);color:#fff;flex-direction:column;justify-content:flex-end;gap:10px;text-decoration:none}
  .v24-ready-poster .v24-kicker{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;opacity:.78}
  .v24-ready-poster strong{font-size:clamp(2rem,5vw,4.6rem);line-height:.94;max-width:8ch}
  .v24-ready-poster span:last-child{max-width:36ch;opacity:.9}
  .v24-story-meta{display:flex;flex-wrap:wrap;gap:8px 16px;margin:18px 0 0;font-size:.92rem;color:var(--muted,#5d6873)}
  .v24-story-tools{margin-top:32px;padding-top:22px;border-top:1px solid rgba(11,31,51,.16);display:flex;flex-wrap:wrap;align-items:center;gap:12px}
  .v24-story-tools button,.v24-story-tools a{font:inherit}
  .v24-disclosure{margin-top:28px;padding:18px 20px;background:rgba(11,31,51,.045);border-left:3px solid #0b1f33}
  .v24-editorial-lead{margin-top:24px;padding:22px;border:1px solid rgba(11,31,51,.14);border-radius:12px;background:#fff}
  .v24-closed{max-width:760px;margin:0 auto;padding:clamp(72px,12vw,140px) 24px}
  .v24-closed h1{max-width:14ch}.v24-closed p{max-width:62ch}
  .editorial-pillar-grid.v24-compressed>a:nth-child(n+5){display:none}
  @media (max-width:720px){.v24-ready-poster{min-height:360px}.v24-story-tools{align-items:stretch;flex-direction:column}.v24-story-tools .btn{width:100%;text-align:center}}
`;
document.head.appendChild(v24Style);

const pageName = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const baseUrl = 'https://thetrevoryoung.github.io/sierra-leone-to-the-top/';

// Use absolute social-preview URLs at runtime and keep canonical share URLs consistent.
document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((meta) => {
  const value = meta.getAttribute('content');
  if (value && !/^https?:\/\//i.test(value)) meta.setAttribute('content', new URL(value, baseUrl).href);
});

// Homepage: story first, country first, less explanatory copy.
if (pageName === 'index.html') {
  const hero = document.querySelector('.hero');
  const eyebrow = hero?.querySelector('.eyebrow');
  const title = hero?.querySelector('h1');
  const lead = hero?.querySelector('.lead');
  const actions = hero?.querySelector('.hero-actions');
  const media = hero?.querySelector('.hero-media');

  if (eyebrow) eyebrow.textContent = 'Sierra Leone, now';
  if (title) title.textContent = 'See the Sierra Leone being built now.';
  if (lead) lead.textContent = 'Stories about the people, places, businesses and ideas shaping the country — reported with context, evidence and pride.';
  if (actions) actions.innerHTML = '<a class="btn primary" href="story-ready-salone-startups.html">Read the lead story</a><a class="btn secondary" href="discover.html">Discover Sierra Leone</a>';
  if (media) {
    media.href = 'story-ready-salone-startups.html';
    media.setAttribute('aria-label', 'Read READY Salone: five startups solving five different problems');
    media.classList.add('v24-ready-poster');
    media.innerHTML = '<span class="v24-kicker">Business Radar · READY Salone</span><strong>Five startups. Five problems to solve.</strong><span>Small-business tools, bioenergy, waste, agriculture and localized AI — one look at what founders are trying to build now.</span>';
  }

  document.querySelector('.editorial-pillar-grid')?.classList.add('v24-compressed');
  document.querySelectorAll('.section-header > p').forEach((p, index) => {
    if (index < 2 && p.textContent.length > 120) p.remove();
  });
}

// The Contribute route is intentionally closed while editorial intake is being redesigned.
if (pageName === 'contribute.html') {
  const main = document.querySelector('#main');
  if (main) {
    main.innerHTML = '<section class="v24-closed"><span class="eyebrow">Editorial intake</span><h1>Contributions are closed for now.</h1><p>We are tightening the editorial system before reopening public submissions. Sierra Leone To The Top will continue finding and reporting stories directly in the meantime.</p><p><a class="btn primary" href="stories.html">Read the latest stories</a> <a class="btn secondary" href="about.html">About the platform</a></p></section>';
  }
}

// Make the editorial lead explicit without turning the platform into a personality brand.
if (pageName === 'about.html') {
  const prose = document.querySelector('.prose');
  if (prose && !document.querySelector('.v24-editorial-lead')) {
    const block = document.createElement('div');
    block.className = 'v24-editorial-lead';
    block.innerHTML = '<span class="meta">Editorial leadership</span><h3>Trevor Young</h3><p>Trevor Young serves as editorial lead for Sierra Leone To The Top. The platform remains bigger than one person: stories are selected and presented against the published editorial standards, evidence rules and nonpartisan mission.</p>';
    prose.prepend(block);
  }
}

// Story pages: clear leadership, disclosure, related reading and simple sharing.
if (pageName.startsWith('story-')) {
  const main = document.querySelector('#main');
  const h1 = main?.querySelector('h1');
  if (h1 && !document.querySelector('.v24-story-meta')) {
    const meta = document.createElement('div');
    meta.className = 'v24-story-meta';
    meta.innerHTML = '<span>Published by Sierra Leone To The Top</span><span>Editorial lead: Trevor Young</span>';
    h1.insertAdjacentElement('afterend', meta);
  }

  if (main && !document.querySelector('.v24-story-tools')) {
    const tools = document.createElement('section');
    tools.className = 'container v24-story-tools';
    tools.innerHTML = '<strong>Share this story</strong><button class="btn secondary" type="button" data-v24-share>Share</button><button class="btn secondary" type="button" data-v24-copy>Copy link</button><a class="text-link" href="stories.html">More stories →</a>';
    main.appendChild(tools);

    const disclosure = document.createElement('div');
    disclosure.className = 'container v24-disclosure';
    disclosure.innerHTML = '<strong>Editorial disclosure:</strong> Archive material, sourced reporting and sponsored relationships are labeled when applicable. Sponsorship does not determine editorial conclusions.';
    main.appendChild(disclosure);
  }
}

document.querySelector('[data-v24-share]')?.addEventListener('click', async () => {
  const shareData = {title: document.title, text: document.querySelector('meta[name="description"]')?.content || '', url: location.href};
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
  } else {
    try { await navigator.clipboard.writeText(location.href); } catch (_) {}
  }
});

document.querySelector('[data-v24-copy]')?.addEventListener('click', async (event) => {
  try {
    await navigator.clipboard.writeText(location.href);
    const button = event.currentTarget;
    const old = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = old; }, 1600);
  } catch (_) {}
});
