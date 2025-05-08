# Adding Lit

Lit doesn't require any specialized tools, and Lit components work in any JavaScript framework or with any server templating system or CMS, so Lit is ideal for adding to existing projects and applications.

First, install the lit package from npm:

If you are not already using npm to manage JavaScript dependencies, you will have to set up your project first. We recommend the npm CLI.

You can create a new element anywhere in your project's sources:

lib/components/my-element.ts

How you use a component depends on your project and the libraries or frameworks it uses. You can use your component in HTML, with DOM APIs, or in template languages:

JSX is a very common templating language. In JSX, lower-case element names create HTML elements, which is what Lit components are. Use the tag name you specified in the @customElement() decorator:

Most JavaScript frameworks have great support for web components and Lit. Just import your element definition and use the element tag names in your templates.

At this point, you should be able to build and run your project and see the "Hello from MyElement!" message.

If you're ready to add features to your component, head over to Components to learn about building your first Lit component, or Templates for details on writing templates.

For details on building projects, including some sample Rollup configurations, see Building for production.


1. Install from npm
2. Add a component
3. Use your componentPlain HTMLJSXFramework templates
4. Plain HTML
5. JSX
6. Framework templates
7. Next steps


1. Plain HTML
2. JSX
3. Framework templates

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
import {LitElement, html} from 'lit';import {customElement} from 'lit/decorators.js';
@customElement('my-element')class MyElement extends LitElement {  render() {    return html`      <div>Hello from MyElement!</div>    `;  }}
```

```
import {LitElement, html} from 'lit';import {customElement} from 'lit/decorators.js';
@customElement('my-element')class MyElement extends LitElement {  render() {    return html`      <div>Hello from MyElement!</div>    `;  }}
```

```
import {LitElement, html} from 'lit';
```

```
import {customElement} from 'lit/decorators.js';
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
render() {
```

```
return html`
```

```
<div>Hello from MyElement!</div>
```

```
`;
```

```
}
```

```
}
```

```
import {LitElement, html} from 'lit';
class MyElement extends LitElement {  render() {    return html`      <div>Hello from MyElement!</div>    `;  }}customElements.define('my-element', MyElement);
```

```
import {LitElement, html} from 'lit';
class MyElement extends LitElement {  render() {    return html`      <div>Hello from MyElement!</div>    `;  }}customElements.define('my-element', MyElement);
```

```
import {LitElement, html} from 'lit';
```

```
class MyElement extends LitElement {
```

```
render() {
```

```
return html`
```

```
<div>Hello from MyElement!</div>
```

```
`;
```

```
}
```

```
}
```

```
customElements.define('my-element', MyElement);
```

```
<script type="module" src="/lib/components/my-element.js"><my-element></my-element>
```

```
<script type="module" src="/lib/components/my-element.js"><my-element></my-element>
```

```
<script type="module" src="/lib/components/my-element.js">
```

```
<my-element></my-element>
```

```
@customElement()
```

```
import './components/my-element.js';
export const App = () => (  <h1>My App</h1>  <my-element></my-element>)
```

```
import './components/my-element.js';
export const App = () => (  <h1>My App</h1>  <my-element></my-element>)
```

```
import './components/my-element.js';
```

```
export const App = () => (
```

```
<h1>My App</h1>
```

```
<my-element></my-element>
```

```
)
```

