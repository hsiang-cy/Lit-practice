# Templates

Interprets a template literal as an HTML template that can efficiently render to and update a container.

html(strings, values): TemplateResult<1>

The html tag returns a description of the DOM to render as a value. It is lazy, meaning no work is done until the template is rendered. When rendering, if a template comes from the same expression as a previously rendered result, it's efficiently updated instead of replaced.

A sentinel value that signals a ChildPart to fully clear its content.

Prefer using nothing over other falsy values as it provides a consistent behavior between various expression binding contexts. In child expressions, undefined, null, '', and nothing all behave the same and render no nodes. In attribute expressions, nothing removes the attribute, while undefined and null will render an empty string. In property expressions nothing becomes undefined.

Renders a value, usually a lit-html TemplateResult, to the container.

render(value, container, options?): RootPart

Any renderable value, typically a {@linkcode TemplateResult} created by evaluating a template tag like {@linkcode html} or {@linkcode svg}.

A DOM container to render to. The first render will append the rendered value to the container, and subsequent renders will efficiently update the rendered value if the same result type was previously rendered there.

See {@linkcode RenderOptions} for options documentation.

This example renders the text "Hello, Zoe!" inside a paragraph tag, appending it to the container document.body.

Interprets a template literal as an SVG fragment that can efficiently render to and update a container.

svg(strings, values): TemplateResult<2>

The svg tag function should only be used for SVG fragments, or elements that would be contained inside an <svg> HTML element. A common error is placing an <svg> element in a template tagged with the svg tag function. The <svg> element is an HTML element and should be used within a template tagged with the html tag function. In LitElement usage, it's invalid to return an SVG fragment from the render() method, as the SVG fragment will be contained within the element's shadow root and thus cannot be used within an <svg> HTML element.

Used to sanitize any value before it is written into the DOM. This can be used to implement a security policy of allowed and disallowed values in order to prevent XSS attacks.

One way of using this callback would be to check attributes and properties against a list of high risk fields, and require that values written to such fields be instances of a class which is safe by construction. Closure's Safe HTML Types is one implementation of this technique ( https://github.com/google/safe-html-types/blob/master/doc/safehtml-types.md). The TrustedTypes polyfill in API-only mode could also be used as a basis for this technique (https://github.com/WICG/trusted-types).

The return type of the template tag functions, html and svg.

A TemplateResult object holds all the information about a template expression required to render it: the template strings, expression values, and type of template (html or svg). TemplateResult objects do not create any DOM on their own. To create or update DOM you need to render the TemplateResult. See Rendering for more information.


1. html
2. nothing
3. render
4. svg
5. SanitizerFactory
6. SVGTemplateResult
7. TemplateResult

```
import { html } from 'lit';
```

```
html(strings, values): TemplateResult<1>
```

```
TemplateStringsArray
```

```
Array<unknown>
```

```
const header = (title: string) => html`<h1>${title}</h1>`;
```

```
const header = (title: string) => html`<h1>${title}</h1>`;
```

```
const header = (title: string) => html`<h1>${title}</h1>`;
```

```
html
```

```
import { nothing } from 'lit';
```

```
symbol
```

```
const button = html`${ user.isAdmin   ? html`<button>DELETE</button>`   : nothing}`;
```

```
const button = html`${ user.isAdmin   ? html`<button>DELETE</button>`   : nothing}`;
```

```
const button = html`${
```

```
user.isAdmin
```

```
? html`<button>DELETE</button>`
```

```
: nothing
```

```
}`;
```

```
nothing
```

```
undefined
```

```
null
```

```
''
```

```
nothing
```

```
nothing
```

```
undefined
```

```
null
```

```
nothing
```

```
undefined
```

```
import { render } from 'lit';
```

```
render(value, container, options?): RootPart
```

```
unknown
```

```
MDN HTMLElement | MDN DocumentFragment
```

```
RenderOptions
```

```
document.body
```

```
import {html, render} from 'lit';const name = "Zoe";render(html`<p>Hello, ${name}!</p>`, document.body);
```

```
import {html, render} from 'lit';const name = "Zoe";render(html`<p>Hello, ${name}!</p>`, document.body);
```

```
import {html, render} from 'lit';
```

```
const name = "Zoe";
```

```
render(html`<p>Hello, ${name}!</p>`, document.body);
```

```
import { svg } from 'lit';
```

```
svg(strings, values): TemplateResult<2>
```

```
TemplateStringsArray
```

```
Array<unknown>
```

```
const rect = svg`<rect width="10" height="10"></rect>`;const myImage = html`  <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">    ${rect}  </svg>`;
```

```
const rect = svg`<rect width="10" height="10"></rect>`;const myImage = html`  <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">    ${rect}  </svg>`;
```

```
const rect = svg`<rect width="10" height="10"></rect>`;
```

```
const myImage = html`
```

```
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
```

```
${rect}
```

```
</svg>`;
```

```
svg
```

```
<svg>
```

```
<svg>
```

```
svg
```

```
<svg>
```

```
html
```

```
render()
```

```
<svg>
```

```
import { SanitizerFactory } from 'lit';
```

```
(node: Node, name: string, type: "property" | "attribute") => ValueSanitizer
```

```
import { SVGTemplateResult } from 'lit';
```

```
TemplateResult<SVG_RESULT>
```

```
html
```

```
svg
```

```
import { TemplateResult } from 'lit';
```

```
{_$litType$: T, strings: TemplateStringsArray, values: Array<unknown>}
```

```
TemplateResult
```

```
TemplateResult
```

```
TemplateResult
```

