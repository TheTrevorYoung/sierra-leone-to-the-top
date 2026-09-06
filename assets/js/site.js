const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

// v2.5: simplify the public navigation around the site's core jobs.
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

// v2.5 shared visual refinements. Kept here so the current static pages inherit the update together.
const v25Style = document.createElement('style');
v25Style.textContent = `
  .v24-ready-poster{display:flex;min-height:100%;padding:clamp(28px,5vw,56px);background:linear-gradient(145deg,#0b1f33,#123a59);color:#fff;flex-direction:column;justify-content:flex-end;gap:10px;text-decoration:none}
  .v24-ready-poster .v24-kicker{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;opacity:.78}
  .v24-ready-poster strong{font-size:clamp(2rem,5vw,4.6rem);line-height:.94;max-width:8ch}
  .v24-ready-poster span:last-child{max-width:36ch;opacity:.9}
  .v24-story-meta{display:flex;flex-wrap:wrap;gap:8px 16px;margin:18px 0 0;font-size:.92rem;color:var(--muted,#5d6873)}
  .v24-story-tools{margin-top:32px;padding-top:22px;border-top:1px solid rgba(11,31,51,.16);display:flex;flex-wrap:wrap;align-items:center;gap:12px}
  .v24-story-tools button,.v24-story-tools a{font:inherit}
  .v24-disclosure{margin-top:28px;padding:18px 20px;background:rgba(11,31,51,.045);border-left:3px solid #0b1f33}
  .v24-editorial-lead{margin-top:24px;padding:22px;border:1px solid rgba(11,31,51,.14);border-radius:12px;background:#fff}
  .editorial-pillar-grid.v24-compressed>a:nth-child(n+5){display:none}
  .sltt-intake{max-width:920px;margin:0 auto}
  .sltt-intake-intro{max-width:700px;margin-bottom:28px}
  .sltt-intake-form{padding:clamp(22px,4vw,38px);border:1px solid rgba(11,31,51,.14);border-radius:14px;background:#fff}
  .sltt-intake-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .sltt-field{display:flex;flex-direction:column;gap:7px}
  .sltt-field.full{grid-column:1/-1}
  .sltt-field label{font-weight:700}
  .sltt-field input,.sltt-field select,.sltt-field textarea{width:100%;font:inherit;padding:12px 13px;border:1px solid rgba(11,31,51,.28);border-radius:8px;background:#fff;color:inherit}
  .sltt-field textarea{min-height:116px;resize:vertical}
  .sltt-intake-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:22px}
  .sltt-intake-note{margin-top:18px;padding:14px 16px;background:rgba(11,31,51,.045);border-left:3px solid #0b1f33;font-size:.94rem}
  .sltt-form-status{margin:12px 0 0;font-weight:700}
  .sltt-status-key{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 30px}
  .sltt-status-badge{display:inline-flex;align-items:center;width:max-content;padding:6px 9px;border-radius:999px;font-size:.74rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;border:1px solid rgba(11,31,51,.22);background:#fff;color:#0b1f33}
  .sltt-status-production{background:rgba(11,31,51,.08)}
  .sltt-status-coming{border-style:dashed}
  .sltt-status-released{background:#0b1f33;color:#fff}
  .sltt-status-archive{background:rgba(125,96,45,.1)}
  .watch-series .sltt-status-badge{margin-bottom:10px}
  .sltt-current-note{font-size:.94rem;color:var(--muted,#5d6873)}
  @media (max-width:720px){
    .v24-ready-poster{min-height:360px}
    .v24-story-tools{align-items:stretch;flex-direction:column}
    .v24-story-tools .btn{width:100%;text-align:center}
    .sltt-intake-grid{grid-template-columns:1fr}
    .sltt-field.full{grid-column:auto}
    .sltt-intake-actions{align-items:stretch;flex-direction:column}
    .sltt-intake-actions .btn{width:100%;text-align:center}
  }
`;
document.head.appendChild(v25Style);

const pageName = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const baseUrl = 'https://thetrevoryoung.github.io/sierra-leone-to-the-top/';

// Use absolute social-preview URLs at runtime and keep canonical share URLs consistent.
document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((meta) => {
  const value = meta.getAttribute('content');
  if (value && !/^https?:\/\//i.test(value)) meta.setAttribute('content', new URL(value, baseUrl).href);
});

// Homepage: current reporting first, with less explanatory copy.
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

  const currentSection = document.querySelector('.latest-grid')?.closest('.section');
  const currentHeader = currentSection?.querySelector('.section-header');
  if (currentHeader) {
    const currentEyebrow = currentHeader.querySelector('.eyebrow');
    const currentTitle = currentHeader.querySelector('h2');
    const currentIntro = currentHeader.querySelector(':scope > p');
    if (currentEyebrow) currentEyebrow.textContent = 'Current reporting';
    if (currentTitle) currentTitle.textContent = 'What’s happening now.';
    if (currentIntro) currentIntro.textContent = 'New reporting, useful guides and documented stories from across Sierra Leone.';
  }

  document.querySelector('.editorial-pillar-grid')?.classList.add('v24-compressed');
  document.querySelectorAll('.section-header > p').forEach((p, index) => {
    if (index < 2 && p.textContent.length > 120) p.remove();
  });
}

// Contribute: one lean intake system with category routing. No data leaves the browser unless the visitor chooses email.
if (pageName === 'contribute.html') {
  const main = document.querySelector('#main');
  if (main) {
    const channelReady = Boolean(cfg.contactEmail);
    main.innerHTML = `
      <section class="page-hero"><div class="container"><span class="eyebrow">Contribute</span><h1>Help us find the next story.</h1><p>One simple intake for people, businesses, culture, places, communities, diaspora, youth and ideas.</p></div></section>
      <section class="section"><div class="container sltt-intake">
        <div class="sltt-intake-intro"><span class="side-label">Story leads & nominations</span><h2>Give us enough to investigate.</h2><p>A nomination is a lead, not a promise of coverage. We verify material independently and retain editorial control over what we publish.</p></div>
        <form class="sltt-intake-form" data-sltt-intake>
          <div class="sltt-intake-grid">
            <div class="sltt-field"><label for="sltt-category">Category</label><select id="sltt-category" name="category" required>
              <option value="">Choose one</option>
              <option>People & Stories</option><option>Business & Innovation</option><option>Culture & Heritage</option><option>Discover / Place</option><option>Communities & Development</option><option>Diaspora</option><option>Youth & Opportunity</option><option>Ideas & Solutions</option>
            </select></div>
            <div class="sltt-field"><label for="sltt-name">Your name</label><input id="sltt-name" name="name" autocomplete="name" required></div>
            <div class="sltt-field"><label for="sltt-email">Your email</label><input id="sltt-email" name="email" type="email" autocomplete="email" required></div>
            <div class="sltt-field"><label for="sltt-location">Location or community</label><input id="sltt-location" name="location" placeholder="Optional"></div>
            <div class="sltt-field full"><label for="sltt-subject">Who or what should we look at?</label><input id="sltt-subject" name="subject" required maxlength="160"></div>
            <div class="sltt-field full"><label for="sltt-why">Why is this worth covering?</label><textarea id="sltt-why" name="why" required maxlength="1600"></textarea></div>
            <div class="sltt-field full"><label for="sltt-evidence">Evidence or starting sources</label><textarea id="sltt-evidence" name="evidence" maxlength="1600" placeholder="Links, documents, public records, people to contact, or other verifiable starting points."></textarea></div>
            <div class="sltt-field full"><label for="sltt-contact">Best contact for the person or organization</label><input id="sltt-contact" name="contact" placeholder="Optional name, email, phone, website or social account"></div>
          </div>
          <div class="sltt-intake-actions">
            <button class="btn primary" type="submit">${channelReady ? 'Prepare email submission' : 'Copy story lead'}</button>
            <a class="btn secondary" href="contact.html">Other inquiries</a>
          </div>
          <p class="sltt-form-status" data-sltt-form-status aria-live="polite"></p>
          <div class="sltt-intake-note">${channelReady
            ? 'This form prepares an email in your own mail app. The website does not store the form submission.'
            : 'The official submission email is not connected yet. You can still prepare and copy a structured lead now; direct email submission will activate automatically when the official address is connected.'}</div>
        </form>
      </div></section>`;
  }

  const form = document.querySelector('[data-sltt-intake]');
  const status = document.querySelector('[data-sltt-form-status]');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
      'SIERRA LEONE TO THE TOP — STORY LEAD',
      '',
      `Category: ${data.get('category') || ''}`,
      `Submitted by: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Location/community: ${data.get('location') || 'Not provided'}`,
      '',
      `Subject: ${data.get('subject') || ''}`,
      '',
      'Why this is worth covering:',
      String(data.get('why') || ''),
      '',
      'Evidence / starting sources:',
      String(data.get('evidence') || 'Not provided'),
      '',
      'Best contact:',
      String(data.get('contact') || 'Not provided')
    ].join('\n');

    if (cfg.contactEmail) {
      const subject = `SLTT story lead — ${data.get('category') || 'General'} — ${data.get('subject') || ''}`.slice(0, 180);
      location.href = `mailto:${cfg.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) status.textContent = 'Your mail app should open with the structured lead ready to review.';
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      if (status) status.textContent = 'Story lead copied. Save it until the official submission channel opens.';
    } catch (_) {
      if (status) status.textContent = 'Copy was blocked by your browser. Select the form text manually or use the Contact page.';
    }
  });
}

// Watch: make release state explicit so previews, future releases and archive material cannot be confused.
if (pageName === 'watch.html') {
  const stageNote = document.querySelector('.watch-stage-note');
  if (stageNote && !document.querySelector('.sltt-status-key')) {
    const key = document.createElement('div');
    key.className = 'sltt-status-key';
    key.setAttribute('aria-label', 'Video status guide');
    key.innerHTML = '<span class="sltt-status-badge sltt-status-released">Released</span><span class="sltt-status-badge sltt-status-production">In production</span><span class="sltt-status-badge sltt-status-coming">Coming soon</span><span class="sltt-status-badge sltt-status-archive">Archive</span>';
    stageNote.insertAdjacentElement('afterend', key);
  }

  const mainStatus = document.querySelector('.watch-video-grid .video-status');
  if (mainStatus) mainStatus.textContent = 'In production';

  document.querySelectorAll('.watch-series').forEach((card) => {
    if (!card.querySelector('.sltt-status-badge')) {
      const badge = document.createElement('span');
      badge.className = 'sltt-status-badge sltt-status-production';
      badge.textContent = 'In production';
      card.prepend(badge);
    }
  });

  const archiveHeading = [...document.querySelectorAll('#main h2')].find((h) => h.textContent.trim().toLowerCase() === 'archive');
  if (archiveHeading && !archiveHeading.querySelector('.sltt-status-badge')) {
    const badge = document.createElement('span');
    badge.className = 'sltt-status-badge sltt-status-archive';
    badge.textContent = 'Archive';
    badge.style.marginLeft = '10px';
    badge.style.verticalAlign = 'middle';
    archiveHeading.append(' ', badge);
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
