---
id: react-create-root
title: React 19 removed ReactDOM.render
stack: react
applies_to: ">= 19.0"
tags: ["react-dom", "render", "root", "entry-point", "upgrade"]
errors: ["ReactDOM.render is not a function"]
sources: ["https://react.dev/blog/2024/04/25/react-19-upgrade-guide"]
---

## Mistake

```jsx
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Correct

```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## Why

React 19 removed `ReactDOM.render`, which had been deprecated since React 18. `createRoot` is imported from `react-dom/client`, not from `react-dom`.
