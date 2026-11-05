---
id: react-string-refs
title: React 19 removed string refs
stack: react
applies_to: ">= 19.0"
tags: ["ref", "class-component", "dom", "upgrade"]
errors: ["Expected ref to be a function, an object returned by React.createRef(), or undefined/null"]
sources: ["https://react.dev/blog/2024/04/25/react-19-upgrade-guide"]
---

## Mistake

```jsx
class SearchBox extends React.Component {
  componentDidMount() {
    this.refs.input.focus();
  }

  render() {
    return <input ref="input" />;
  }
}
```

## Correct

```jsx
class SearchBox extends React.Component {
  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    return <input ref={this.input} />;
  }
}
```

In function components, use `useRef`.

## Why

React 19 removed string refs, which had been deprecated for years. The error appears when the component renders.
