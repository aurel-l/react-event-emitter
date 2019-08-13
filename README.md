# react-event-emitter

DOM CustomEvent emitter written in React.

## Why?

Interacting between React and other libraries can sometimes be a bit cumbersome
because of the difference in paradigms. Maybe in the future React will allow to
work in an easier way with CustomEvents, but for now you'd need to switch from
the usual declarative logic in writting components in JSX to an imperative way
to hook up the logic in React and your other library's logic.

It was originally made to interact with CustomElements inside of a React app.

## Requirements, installation and usage

You need to have a recent version Node.js installed with a working `npm` command.

Also, this has `react` and `react-dom` as peer dependencies.

To install, run in a shell:

```shell
npm install react-event-emitter
```

Then, in the JavaScript you want to use it, import it as a ES module:

```javascript
import EventEmitter from 'react-event-emitter';
```

Or, if you still use commonjs modules for browser code, import it as such:

```javascript
const EventEmitter = require('react-event-emitter');
```

To see more, refer to the [examples](#example-usage) section.

## API

### props

| name       | type      | required | default     |
| ---------- | --------- | -------- | ----------- |
| children   | ReactNode | no       | `null`      |
| eventType  | string    | yes      | `undefined` |
| detail     | any       | no       | `undefined` |
| waitUntil  | Promise   | no       | `undefined` |
| bubbles    | boolean   | no       | `undefined` |
| cancelable | boolean   | no       | `undefined` |
| composed   | boolean   | no       | `undefined` |

### notes

1. To avoid race-conditions, when an event is sent before the element that is
   supposed to listen to it does so, a `waitUntil` prop has been introduced.

2. `bubbles`, `cancelable`, and `composed` are directly sent as-is to the
   CustomEvent constructor, see
   [here](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) for more
   information.

## Example usage

1. simple

Some DOM element higher up the tree is listening to a `load` event containing some data

```jsx
import EventEmitter from 'react-event-emitter';

const Component = ({ data }) => <EventEmitter eventType="load" detail={data} />;
```

2. with Custom Elements

In the case where the definition for `data-visualisation` might not be ready yet
(code-splitting and async loading of the definition), but it's the element that
is supposed to listen for the emitted event, use the `waitUntil` prop to wait
for its definition to be loaded.

```jsx
import EventEmitter from 'react-event-emitter';

const Component = ({ data }) => (
  <data-visualisation>
    <EventEmitter
      eventType="load"
      detail={data}
      waitUntil={customElements.whenDefined('data-visualisation')}
    />
  </data-visualisation>
);
```

## Development

Library written in TypeScript.

You can run the tests (unit, linting, and type) by running `npm run test`.

To build a new bundle, run `npm run build`, or `npm run build:dev` for
development mode.

## Acknowledgement

This package's code was started while working within the
[Molecular Modeling and Bioinformatics (MMB)](https://mmb.irbbarcelona.org/)
group at the
[Institute for Research in Biomedicine (IRB)](https://www.irbbarcelona.org/).
