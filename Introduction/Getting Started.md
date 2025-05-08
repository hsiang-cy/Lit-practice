# Getting Started

There are many ways to get started using Lit, from our Playground and interactive tutorial to installing into an existing project.

Get started right away with the interactive playground and examples. Start with "Hello World", then customize it or move on to more examples.

Take our step-by-step tutorial to learn how to build a Lit component in minutes.

We provide TypeScript and JavaScript component starter kits for creating standalone reusable components. See Starter Kits.

Lit is available as the lit package via npm.

Then import into JavaScript or TypeScript files:

Lit is also available as pre-built, single-file bundles. These are provided for more flexibility around development workflows: for example, if you would prefer to download a single file rather than use npm and build tools. The bundles are standard JavaScript modules with no dependencies - any modern browser should be able to import and run the bundles from within a <script type="module"> like this:

If you're using npm for client-side dependencies, you should use the lit package, not these bundles. The bundles intentionally combine most or all of Lit into a single file, which can cause your page to download more code than it needs.

To browse the bundles, go to https://cdn.jsdelivr.net/gh/lit/dist/ and use the dropdown menu to go to the page for a particular version. On that page, there will be a directory for each type of bundle available for that version. There are two types of bundles:

See Adding Lit to an existing project for instructions on adding Lit to an existing project or application.

The Open WC project has a project generator that can scaffold out an application project using Lit.


1. Lit Playground
2. Interactive tutorial
3. Lit starter kits
4. Install locally from npm
5. Use bundles
6. Add Lit to an existing project
7. Open WC project generator

```
lit
```

```
npm i lit
```

```
npm i lit
```

```
npm i lit
```

```
import {LitElement, html} from 'lit';import {customElement, property} from 'lit/decorators.js';
```

```
import {LitElement, html} from 'lit';import {customElement, property} from 'lit/decorators.js';
```

```
import {LitElement, html} from 'lit';
```

```
import {customElement, property} from 'lit/decorators.js';
```

```
import {LitElement, html} from 'lit';
```

```
import {LitElement, html} from 'lit';
```

```
import {LitElement, html} from 'lit';
```

```
<script type="module">
```

```
import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
```

```
import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
```

```
import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
```

```
lit
```

```
core
```

```
lit
```

```
all
```

```
core
```

```
lit
```

```
html
```

```
svg
```

```
lit/static-html.js
```

```
staticHtml
```

```
staticSvg
```

