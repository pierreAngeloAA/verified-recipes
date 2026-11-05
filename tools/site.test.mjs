import assert from 'node:assert/strict';
import { test } from 'node:test';
import { escapeHtml, indexPage, markdownToHtml, recipePage, sitemap } from './lib/site.mjs';

const SITE = 'https://example.github.io/verified-recipes';
const NOW = new Date('2026-11-05T12:00:00Z');

const recipe = {
  id: 'react-create-root',
  title: 'React 19 removed `ReactDOM.render`',
  stack: 'react',
  applies_to: '>= 19.0',
  errors: ['ReactDOM.render is not a function'],
  sources: ['https://react.dev/blog'],
  body: '## Mistake\n\n```jsx\nReactDOM.render(<App />, root);\n```\n\nUse `createRoot` & more.\n\n## Why\n\nIt was removed.',
  verification: { status: 'pass', checked_at: '2026-11-02', versions: { react: '19.3.1' } },
};

test('escapes HTML special characters', () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
});

test('converts headings, paragraphs and code', () => {
  const html = markdownToHtml(recipe.body);

  assert.match(html, /<h2>Mistake<\/h2>/);
  assert.match(html, /<pre><code class="language-jsx">ReactDOM\.render\(&lt;App \/&gt;, root\);<\/code><\/pre>/);
  assert.match(html, /<p>Use <code>createRoot<\/code> &amp; more\.<\/p>/);
  assert.match(html, /<h2>Why<\/h2>/);
});

test('never lets recipe text become markup', () => {
  const html = markdownToHtml('A <script>alert(1)</script> line\n\n```\n<script>alert(2)</script>\n```\n\n`<img src=x>`');

  assert.doesNotMatch(html, /<script|<img/);
});

test('the page title starts with the exact error', () => {
  assert.match(recipePage(recipe, SITE, NOW), /<title>ReactDOM\.render is not a function - React fix<\/title>/);
});

test('the page shows its evidence and canonical URL', () => {
  const html = recipePage(recipe, SITE, NOW);

  assert.match(html, /Verified by running code on 2026-11-02 with react 19\.3\.1/);
  assert.match(html, /rel="canonical" href="https:\/\/example\.github\.io\/verified-recipes\/recipes\/react-create-root\.html"/);
  assert.match(html, /<html lang="en">/);
});

test('a failing recipe warns the reader', () => {
  const failing = { ...recipe, verification: { ...recipe.verification, status: 'fail' } };

  assert.match(recipePage(failing, SITE, NOW), /Failing verification.*may be wrong/);
});

test('an unverified recipe does not claim evidence', () => {
  const html = recipePage({ ...recipe, verification: null }, SITE, NOW);

  assert.match(html, /Not verified yet/);
  assert.doesNotMatch(html, /Verified by running code/);
});

test('the index links each recipe', () => {
  assert.match(indexPage([recipe], SITE), /href="recipes\/react-create-root\.html"/);
});

test('the sitemap lists pages with their check date', () => {
  const xml = sitemap([recipe], SITE);

  assert.match(xml, /recipes\/react-create-root\.html<\/loc><lastmod>2026-11-02<\/lastmod>/);
});
