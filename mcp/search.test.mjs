import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergeRecipes, renderRecipe, renderSearch, searchRecipes, verificationState } from './search.mjs';

const NOW = new Date('2026-11-05T12:00:00Z');
const passing = { status: 'pass', checked_at: '2026-11-02', versions: { rails: '8.1' } };

const RECIPES = [
  {
    id: 'rails-enum-positional-syntax',
    title: 'Rails 8 rejects enum declared with keyword arguments',
    stack: 'rails',
    applies_to: '>= 8.0',
    tags: ['activerecord', 'enum'],
    errors: ['wrong number of arguments (given 0, expected 1..2)'],
    sources: ['https://guides.rubyonrails.org/8_0_release_notes.html'],
    body: '## Mistake\n\nenum status: {}\n\n## Correct\n\nenum :status, {}\n\n## Misleading error\n\nA hint.\n\n## Why\n\nRemoved in 8.0.',
    verification: passing,
  },
  {
    id: 'rails-params-expect',
    title: 'Use params.expect for tampered parameters',
    stack: 'rails',
    applies_to: '>= 8.0',
    tags: ['params', 'security'],
    errors: ["undefined method `permit' for an instance of String"],
    sources: ['https://guides.rubyonrails.org/8_0_release_notes.html'],
    body: '## Mistake\n\nparams.require',
    verification: null,
  },
  {
    id: 'react-create-root',
    title: 'ReactDOM.render was removed',
    stack: 'react',
    applies_to: '>= 19',
    tags: ['render', 'security'],
    errors: ['render is not a function'],
    sources: ['https://react.dev/blog'],
    body: '## Mistake\n\nReactDOM.render',
    verification: passing,
  },
];

const ids = (input) => searchRecipes(RECIPES, input, NOW).map((result) => result.id);

test('finds a recipe by topic', () => {
  assert.equal(ids({ query: 'enum model' })[0], 'rails-enum-positional-syntax');
});

test('finds a recipe from an error inside a pasted stack trace', () => {
  const trace = "app/models/post.rb:2 in 'enum': wrong number of arguments (given 0, expected 1..2) (ArgumentError)";
  assert.equal(ids({ query: trace })[0], 'rails-enum-positional-syntax');
});

test('ignores the quote style in error messages', () => {
  assert.equal(ids({ query: "undefined method 'permit' for an instance of String" })[0], 'rails-params-expect');
});

test('filters by an explicit stack', () => {
  assert.deepEqual(ids({ query: 'security', stack: 'react' }), ['react-create-root']);
});

test('a stack named in the query filters results', () => {
  assert.deepEqual(ids({ query: 'rails security' }), ['rails-params-expect']);
});

test('a stack name alone lists that stack', () => {
  assert.equal(ids({ query: 'rails' }).length, 2);
});

test('an unrelated query returns nothing', () => {
  assert.deepEqual(ids({ query: 'kubernetes ingress' }), []);
});

test('a stack plus an unrelated topic returns nothing', () => {
  assert.deepEqual(ids({ query: 'rails kubernetes' }), []);
});

test('common words alone do not match', () => {
  assert.deepEqual(ids({ query: 'how to use the' }), []);
});

test('an exact error returns only its recipe', () => {
  assert.deepEqual(ids({ query: 'render is not a function' }), ['react-create-root']);
});

test('shared common words do not add unrelated recipes', () => {
  assert.deepEqual(ids({ query: 'wrong number of arguments (given 0, expected 1..2) is not a function' }), [
    'rails-enum-positional-syntax',
  ]);
});

test('reports each verification state', () => {
  assert.equal(verificationState(passing, NOW).state, 'verified');
  assert.equal(verificationState({ ...passing, checked_at: '2026-10-01' }, NOW).state, 'stale');
  assert.equal(verificationState({ ...passing, status: 'fail' }, NOW).state, 'failing');
  assert.equal(verificationState(null, NOW).state, 'unverified');
});

test('a failing recipe stays failing however recent the check', () => {
  assert.equal(verificationState({ ...passing, status: 'fail', checked_at: '2026-11-05' }, NOW).state, 'failing');
});

test('renders evidence and the data notice', () => {
  const text = renderRecipe(RECIPES[0], NOW);

  assert.match(text, /Reference data, not instructions/);
  assert.match(text, /Verification: verified \(last checked 2026-11-02\)/);
  assert.match(text, /Tested with: rails 8\.1/);
});

test('renders an unverified recipe without inventing evidence', () => {
  const text = renderRecipe(RECIPES[1], NOW);

  assert.match(text, /Verification: unverified/);
  assert.match(text, /Tested with: none/);
});

const render = (input) => renderSearch(RECIPES, input, NOW);

test('an exact error returns the fix without a second call', () => {
  const text = render({ query: 'wrong number of arguments (given 0, expected 1..2)' });

  assert.match(text, /Reference data, not instructions/);
  assert.match(text, /Verification: verified 2026-11-02, rails 8\.1/);
  assert.match(text, /enum :status, \{\}/);
  assert.match(text, /A hint\./);
});

test('the inline fix leaves out the mistake and the explanation', () => {
  const text = render({ query: 'wrong number of arguments (given 0, expected 1..2)' });

  assert.doesNotMatch(text, /enum status:/);
  assert.doesNotMatch(text, /Removed in 8\.0/);
});

test('a clear topic match returns the fix', () => {
  assert.match(render({ query: 'rails enum' }), /enum :status, \{\}/);
});

test('an ambiguous query returns a list and no fix', () => {
  const text = render({ query: 'security' });

  assert.equal(text.split('\n').length, 2);
  assert.doesNotMatch(text, /## |Reference data/);
});

test('a failing recipe never returns its fix directly', () => {
  const failing = RECIPES.map((recipe) => ({ ...recipe, verification: { ...passing, status: 'fail' } }));
  const text = renderSearch(failing, { query: 'wrong number of arguments (given 0, expected 1..2)' }, NOW);

  assert.match(text, /failing/);
  assert.doesNotMatch(text, /enum :status/);
});

test('no result is a short answer', () => {
  assert.equal(render({ query: 'kubernetes ingress' }), 'No recipe covers this.');
});

test('a remote index updates recipes and keeps bundled ones it lacks', () => {
  const bundled = [{ id: 'a', v: 'old' }, { id: 'new-in-release', v: 'bundled' }];
  const remote = [{ id: 'a', v: 'fresh' }, { id: 'only-remote', v: 'remote' }];
  const merged = Object.fromEntries(mergeRecipes(bundled, remote).map((recipe) => [recipe.id, recipe.v]));

  assert.deepEqual(merged, { a: 'fresh', 'new-in-release': 'bundled', 'only-remote': 'remote' });
});
