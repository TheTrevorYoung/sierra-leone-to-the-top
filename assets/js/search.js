(() => {
  const form = document.querySelector('[data-search-form]');
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  const status = document.querySelector('[data-search-status]');
  if (!form || !input || !results || !status) return;

  const pages = Array.isArray(window.SLTT_SEARCH_INDEX) ? window.SLTT_SEARCH_INDEX : [];
  const normalize = (s) => String(s || '').toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  function tokenize(query) {
    return normalize(query).trim().split(/\s+/).filter(Boolean).slice(0, 8);
  }

  function scorePage(page, terms) {
    const title = normalize(page.title + ' ' + page.h1);
    const desc = normalize(page.description);
    const body = normalize(page.text);
    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 12;
      if (desc.includes(term)) score += 6;
      if (body.includes(term)) score += 2;
    }
    const all = terms.every(term => title.includes(term) || desc.includes(term) || body.includes(term));
    if (all) score += 10;
    return score;
  }

  function snippet(page, terms) {
    const plain = String(page.description || page.text || '');
    if (page.description) return page.description;
    const lower = normalize(plain);
    let pos = -1;
    for (const term of terms) {
      const p = lower.indexOf(term);
      if (p >= 0 && (pos < 0 || p < pos)) pos = p;
    }
    if (pos < 0) pos = 0;
    const start = Math.max(0, pos - 75);
    const end = Math.min(plain.length, start + 230);
    return (start > 0 ? '…' : '') + plain.slice(start, end).trim() + (end < plain.length ? '…' : '');
  }

  function clearResults() {
    while (results.firstChild) results.removeChild(results.firstChild);
  }

  function render(query, updateUrl = true) {
    const terms = tokenize(query);
    clearResults();

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (query.trim()) url.searchParams.set('q', query.trim());
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }

    if (!terms.length) {
      status.textContent = 'Search stories, people, businesses, places, culture, diaspora, youth and ideas.';
      document.querySelector('[data-search-empty]')?.removeAttribute('hidden');
      return;
    }

    document.querySelector('[data-search-empty]')?.setAttribute('hidden', '');

    const ranked = pages
      .map(page => ({page, score: scorePage(page, terms)}))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
      .slice(0, 20);

    status.textContent = ranked.length
      ? `${ranked.length} result${ranked.length === 1 ? '' : 's'} for “${query.trim()}”.`
      : `No results for “${query.trim()}”. Try a broader word or another spelling.`;

    for (const {page} of ranked) {
      const a = document.createElement('a');
      a.className = 'search-result';
      a.href = page.url;

      const meta = document.createElement('span');
      meta.className = 'search-result-type';
      meta.textContent = page.category;

      const h2 = document.createElement('h2');
      h2.textContent = page.h1 || page.title;

      const p = document.createElement('p');
      p.textContent = snippet(page, terms);

      const go = document.createElement('span');
      go.className = 'text-link';
      go.textContent = 'Open →';

      a.append(meta, h2, p, go);
      results.appendChild(a);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    render(input.value);
  });

  let timer = null;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => render(input.value), 120);
  });

  const initial = new URL(window.location.href).searchParams.get('q') || '';
  input.value = initial;
  render(initial, false);
})();