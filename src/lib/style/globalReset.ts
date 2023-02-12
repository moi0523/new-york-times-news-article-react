// language=scss
const GlobalResetStyle = `
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
  }

  * {
    word-break: keep-all;
  }

  i {
    font-style: normal;
  }

  li {
    list-style: none;
    font-style: normal;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
  }

  hr {
    margin: 0;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: none;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b {
    font-weight: 600;
  }

  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    vertical-align: bottom;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }

  button,
  input {
    overflow: visible;
  }

  input, textarea {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }

  button, [role="button"] {
    background: none;
    border: none;
    cursor: pointer;
    user-select: none;
  }

  input:focus,
  button:focus,
  summary:focus,
  textarea,
  input:active,
  button:active,
  textarea:active {
    outline: none;
  }

  button,
  select {
    text-transform: none;
  }

  [type='button'],
  [type='reset'],
  [type='submit'],
  button {
    -webkit-appearance: button;
  }

  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
    resize: none;
  }

  textarea::placeholder {
    font-size: inherit;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    outline-offset: -2px;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    cursor: pointer;
    display: block;
    list-style-type: none;

  }

  summary::-webkit-details-marker {
    display: none;
  }

  [hidden],
  template {
    display: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  dt,
  dd {
    font-style: normal;
  }

  /* CSS RESET */

  html {
    --100vh: calc(var(--1vh-as-px, 1vh) * 100);
    --100vw: calc(var(--1vw-as-px, 1vw) * 100);

    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    font-family: Apple SD Gothic Neo, arial, sans-serif;
    font-size: 100%;
    line-height: 1.5;
    min-height: 100%;
    display: flex;
    overflow-x: hidden;
    // scrollbar-gutter: stable both-edges;
  }

  body {
    -ms-overflow-style: scrollbar;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  html, body {
    flex: 1;
    width: var(--100vw);
    min-height: var(--100vh);
  }
`;

export { GlobalResetStyle };
