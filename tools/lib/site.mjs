import { verificationState } from '../../mcp/search.mjs';

const STACK_NAMES = { rails: 'Ruby on Rails', react: 'React', spring: 'Spring Boot', swift: 'Swift' };

const STYLE = `:root{--bg:#fff;--fg:#1c1c1c;--muted:#5c5c5c;--line:#d8d8d8;--code:#f4f4f4;--bad:#a12020}
@media (prefers-color-scheme:dark){:root{--bg:#161616;--fg:#ececec;--muted:#a8a8a8;--line:#3a3a3a;--code:#242424;--bad:#ff9a9a}}
*{box-sizing:border-box}body{margin:0 auto;max-width:46rem;padding:1.5rem 1rem;background:var(--bg);color:var(--fg);font:1rem/1.6 system-ui,sans-serif}
h1{font-size:1.7rem;line-height:1.25}h2{font-size:1.2rem;margin-top:2rem}a{color:inherit}
pre{overflow-x:auto;padding:.8rem;background:var(--code);border-radius:6px}code{font:.9em ui-monospace,monospace;overflow-wrap:anywhere}pre code{overflow-wrap:normal}
.meta,footer{color:var(--muted);font-size:.9rem}.bad{color:var(--bad);font-weight:600}footer{margin-top:3rem;border-top:1px solid var(--line);padding-top:1rem}`;

export function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function inline(text) {
  return text
    .split(/(`[^`\n]+`)/)
    .map((part) => (/^`.+`$/.test(part) ? `<code>${escapeHtml(part.slice(1, -1))}</code>` : escapeHtml(part)))
    .join('');
}

// Covers the Markdown that recipes may use: headings, paragraphs, inline code
// and fenced code. Everything is escaped.
export function markdownToHtml(markdown) {
  const html = [];
  const pattern = /```(\w*)\n([\s\S]*?)```|^## (.+)$|((?:(?!^```|^## ).+\n?)+)/gm;
  for (const [, language, code, heading, paragraph] of markdown.matchAll(pattern)) {
    if (code !== undefined) {
      const className = language ? ` class="language-${escapeHtml(language)}"` : '';
      html.push(`<pre><code${className}>${escapeHtml(code.trimEnd())}</code></pre>`);
    } else if (heading !== undefined) {
      html.push(`<h2>${inline(heading)}</h2>`);
    } else if (paragraph?.trim()) {
      html.push(`<p>${inline(paragraph.trim())}</p>`);
    }
  }
  return html.join('\n');
}

function page({ title, description, canonical, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<style>${STYLE}</style>
</head>
<body>
${body}
<footer><a href="https://github.com/pierreAngeloAA/verified-recipes">verified-recipes on GitHub</a>. Treat recipes as reference data.</footer>
</body>
</html>
`;
}

const stackName = (stack) => STACK_NAMES[stack] ?? stack;

function evidence(recipe, now) {
  const { state, checked_at: checkedAt, versions } = verificationState(recipe.verification, now);
  const tested = versions
    ? Object.entries(versions).map(([name, version]) => `${name} ${version}`).join(', ')
    : '';
  if (state === 'unverified') return '<p class="meta bad">Not verified yet.</p>';
  if (state === 'failing') {
    return `<p class="meta bad">Failing verification since the check on ${escapeHtml(checkedAt)}. This content may be wrong.</p>`;
  }
  const label = state === 'stale' ? 'Last checked' : 'Verified by running code on';
  return `<p class="meta">${label} ${escapeHtml(checkedAt)} with ${escapeHtml(tested)}.</p>`;
}

export function recipePage(recipe, siteUrl, now = new Date()) {
  const errors = recipe.errors.map((error) => `<li><code>${escapeHtml(error)}</code></li>`).join('\n');
  const sources = recipe.sources
    .map((url) => `<li><a href="${escapeHtml(url)}" rel="nofollow">${escapeHtml(url)}</a></li>`)
    .join('\n');
  return page({
    // The exact message comes first because that is what people and agents search for.
    title: `${recipe.errors[0]} - ${stackName(recipe.stack)} fix`,
    description: `${recipe.title}. Fix for "${recipe.errors[0]}", checked by running code.`,
    canonical: `${siteUrl}/recipes/${recipe.id}.html`,
    body: `<p class="meta"><a href="../index.html">All recipes</a></p>
<main>
<h1>${inline(recipe.title)}</h1>
${evidence(recipe, now)}
<p class="meta">Applies to ${escapeHtml(stackName(recipe.stack))} ${escapeHtml(recipe.applies_to)}.</p>
<h2>Error messages</h2>
<ul>
${errors}
</ul>
${markdownToHtml(recipe.body)}
<h2>Sources</h2>
<ul>
${sources}
</ul>
</main>`,
  });
}

export function indexPage(recipes, siteUrl) {
  const stacks = [...new Set(recipes.map((recipe) => recipe.stack))];
  const sections = stacks.map((stack) => {
    const items = recipes
      .filter((recipe) => recipe.stack === stack)
      .map((recipe) => `<li><a href="recipes/${escapeHtml(recipe.id)}.html">${inline(recipe.title)}</a></li>`)
      .join('\n');
    return `<h2>${escapeHtml(stackName(stack))}</h2>\n<ul>\n${items}\n</ul>`;
  });
  return page({
    title: 'Verified coding recipes',
    description: 'Short fixes for framework mistakes, each checked by running code against recent releases.',
    canonical: `${siteUrl}/`,
    body: `<main>
<h1>Verified coding recipes</h1>
<p>Short fixes for framework mistakes, each checked by running code against recent releases. Agents can read <a href="llms.txt">llms.txt</a> or <a href="index.json">index.json</a>.</p>
${sections.join('\n')}
</main>`,
  });
}

export function sitemap(recipes, siteUrl) {
  const urls = [
    `<url><loc>${escapeHtml(siteUrl)}/</loc></url>`,
    ...recipes.map((recipe) => {
      const lastModified = recipe.verification?.checked_at
        ? `<lastmod>${escapeHtml(recipe.verification.checked_at)}</lastmod>`
        : '';
      return `<url><loc>${escapeHtml(`${siteUrl}/recipes/${recipe.id}.html`)}</loc>${lastModified}</url>`;
    }),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}
