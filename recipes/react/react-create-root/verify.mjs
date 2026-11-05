import assert from 'node:assert/strict';
import { assertListedError, createRoot, newContainer, React, ReactDOM, reportVersions } from '../support.mjs';

const app = React.createElement('p', null, 'hello');

const container = newContainer();
React.act(() => createRoot(container).render(app));
assert.equal(container.innerHTML, '<p>hello</p>');

assertListedError(import.meta.dirname, () => ReactDOM.render(app, newContainer()));

reportVersions();
