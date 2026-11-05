import assert from 'node:assert/strict';
import { assertListedError, createRoot, newContainer, React, reportVersions } from '../support.mjs';

const h = React.createElement;

let attachedTag = null;
class ObjectRef extends React.Component {
  input = React.createRef();

  componentDidMount() {
    attachedTag = this.input.current.tagName;
  }

  render() {
    return h('input', { ref: this.input });
  }
}
React.act(() => createRoot(newContainer()).render(h(ObjectRef)));
assert.equal(attachedTag, 'INPUT');

class StringRef extends React.Component {
  render() {
    return h('input', { ref: 'input' });
  }
}
assertListedError(import.meta.dirname, () => {
  React.act(() => createRoot(newContainer()).render(h(StringRef)));
});

reportVersions();
