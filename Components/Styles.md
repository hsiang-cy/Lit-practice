# Styles

Your component's template is rendered to its shadow root. The styles you add to your component are automatically scoped to the shadow root and only affect elements in the component's shadow root.

Shadow DOM provides strong encapsulation for styling. If Lit did not use Shadow DOM, you would have to be extremely careful not to accidentally style elements outside of your component, either ancestors or children of your component. This might involve writing long, cumbersome to use class names. By using Shadow DOM, Lit ensures whatever selector you write only apply to elements in your Lit component's shadow root.

You define scoped styles in the static styles class field using the tagged template literal css function. Defining styles this way results in the most optimal performance:



The styles you add to your component are scoped using shadow DOM. For a quick overview, see Shadow DOM.

The value of the static styles class field can be:

A single tagged template literal.

An array of tagged template literals.

The static styles class field is almost always the best way to add styles to your component, but there are some use cases you can't handle this way—for example, customizing styles per instance. For alternate ways to add styles, see Defining scoped styles in the template.

Static styles apply to all instances of a component. Any expressions in CSS are evaluated once, then reused for all instances.

For tree-based or per-instance style customization, use CSS custom properties to allow elements to be themed.

To prevent Lit components from evaluating potentially malicious code, the css tag only allows nested expressions that are themselves css tagged strings or numbers.

This restriction exists to protect applications from security vulnerabilities whereby malicious styles, or even malicious code, can be injected from untrusted sources such as URL parameters or database values.

If you must use an expression in a css literal that is not itself a css literal, and you are confident that the expression is from a fully trusted source such as a constant defined in your own code, then you can wrap the expression with the unsafeCSS function:

Only use the unsafeCSS tag with trusted input. Injecting unsanitized CSS is a security risk. For example, malicious CSS can "phone home" by adding an image URL that points to a third-party server.

Using an array of tagged template literals, a component can inherit the styles from a superclass, and add its own styles:



You can also use super.styles to reference the superclass's styles property in JavaScript. If you're using TypeScript, we recommend avoiding super.styles since the compiler doesn't always convert it correctly. Explicitly referencing the superclass, as shown in the example, avoids this issue.

When writing components intended to be subclassed in TypeScript, the static styles field should be explicitly typed as CSSResultGroup to allow flexibility for users to override styles with an array:

You can share styles between components by creating a module that exports tagged styles:

Your element can then import the styles and add them to its static styles class field:

CSS's unicode escape sequence is a backslash followed by four or six hex digits: for example, \2022 for a bullet character. This similar to the format of JavaScript's deprecated octal escape sequences, so using these sequences in a css tagged template literal causes an error.

There are two work-arounds for adding a unicode escape to your styles:

This section gives a brief overview of shadow DOM styling.

Styles you add to a component can affect:

Lit templates are rendered into a shadow tree by default. Styles scoped to an element's shadow tree don't affect the main document or other shadow trees. Similarly, with the exception of inherited CSS properties, document-level styles don't affect the contents of a shadow tree.

When you use standard CSS selectors, they only match elements in your component's shadow tree. This means you can often use very simple selectors since you don't have to worry about them accidentally styling other parts of the page; for example: input, *, or #my-element.

You can style the component itself using special :host selectors. (The element that owns, or "hosts" a shadow tree is called the host element.)

To create default styles for the host element, use the :host CSS pseudo-class and :host() CSS pseudo-class function.



Note that the host element can be affected by styles from outside the shadow tree, as well, so you should consider the styles you set in :host and :host() rules as default styles that can be overridden by the user. For example:

Your component may accept children (like a <ul> element can have <li> children). To render children, your template needs to include one or more <slot> elements, as described in Render children with the slot element.

The <slot> element acts as a placeholder in a shadow tree where the host element's children are displayed.

Use the ::slotted() CSS pseudo-element to select children that are included in your template via <slot>s.



Note that only direct slotted children can be styled with ::slotted().

Also, children can be styled from outside the shadow tree, so you should regard your ::slotted() styles as default styles that can be overridden.

Limitations in the ShadyCSS polyfill around slotted content. See the ShadyCSS limitations for details on how to use the ::slotted() syntax in a polyfill-friendly way.

We recommend using the static styles class field for optimal performance. However, sometimes you may want to define styles in the Lit template. There are two ways to add scoped styles in the template:

Each of these techniques has its own set of advantages and drawbacks.

Typically, styles are placed in the static styles class field; however, the element's static styles are evaluated once per class. Sometimes, you might need to customize styles per instance. For this, we recommend using CSS properties to create themable elements. Alternatively, you can also include <style> elements in a Lit template. These are updated per instance.

Limitations in the ShadyCSS polyfill around per instance styling. Per instance styling is not supported using the ShadyCSS polyfill. See the ShadyCSS limitations for details.

Using expressions inside style elements has some important limitations and performance issues.

Limitations in the ShadyCSS polyfill around expressions. Expressions in <style> elements won't update per instance in ShadyCSS, due to limitations of the ShadyCSS polyfill. In addition, <style> nodes may not be passed as expression values when using the ShadyCSS polyfill. See the ShadyCSS limitations for more information.

Evaluating an expression inside a <style> element is extremely inefficient. When any text inside a <style> element changes, the browser must re-parse the whole <style> element, resulting in unnecessary work.

To mitigate this cost, separate styles that require per-instance evaluation from those that don't.

While you can include an external style sheet in your template with a <link>, we do not recommend this approach. Instead, styles should be placed in the static styles class field.

External stylesheet caveats.

One way to make styles dynamic is to add expressions to the class or style attributes in your template.

Lit offers two directives, classMap and styleMap, to conveniently apply classes and styles in HTML templates.

For more information on these and other directives, see the documentation on built-in directives.

To use styleMap and/or classMap:

Import classMap and/or styleMap:

Use classMap and/or styleMap in your element template:



See classMap and styleMap for more information.

By using CSS inheritance and CSS variables and custom properties together, it's easy to create themable elements. By applying css selectors to customize CSS custom properties, tree-based and per-instance theming is straightforward to apply. Here's an example:



CSS inheritance lets parent and host elements propagate certain CSS properties to their descendants.

Not all CSS properties inherit. Inherited CSS properties include:

See CSS Inheritance on MDN for more information.

You can use CSS inheritance to set styles on an ancestor element that are inherited by its descendants:

All CSS custom properties (--custom-property-name) inherit. You can use this to make your component's styles configurable from outside.

The following component sets its background color to a CSS variable. The CSS variable uses the value of --my-background if it's been set by a selector matching an ancestor in the DOM tree, and otherwise defaults to yellow:

Users of this component can set the value of --my-background, using the my-element tag as a CSS selector:

--my-background is configurable per instance of my-element:

See CSS Custom Properties on MDN for more information.


1. Adding styles to your componentUsing expressions in static stylesInheriting styles from a superclassSharing stylesUsing unicode escapes in styles
2. Using expressions in static styles
3. Inheriting styles from a superclass
4. Sharing styles
5. Using unicode escapes in styles
6. Shadow DOM styling overviewStyling the shadow treeStyling the component itselfStyling the component's children
7. Styling the shadow tree
8. Styling the component itself
9. Styling the component's children
10. Defining scoped styles in the templateIn a style elementImport an external stylesheet (not recommended)
11. In a style element
12. Import an external stylesheet (not recommended)
13. Dynamic classes and styles
14. ThemingCSS inheritanceCSS custom properties
15. CSS inheritance
16. CSS custom properties


1. Using expressions in static styles
2. Inheriting styles from a superclass
3. Sharing styles
4. Using unicode escapes in styles


1. Styling the shadow tree
2. Styling the component itself
3. Styling the component's children


1. In a style element
2. Import an external stylesheet (not recommended)


1. CSS inheritance
2. CSS custom properties


* A single tagged template literal. 
* An array of tagged template literals. 


* Add a second backslash (for example, \\2022).
* Use the JavaScript escape sequence, starting with \u (for example, \u2022).


* The shadow tree (your component's rendered template).
* The component itself.
* The component's children.


* :host selects the host element.
* :host(selector) selects the host element, but only if the host element matches selector.


* ::slotted(*) matches all slotted elements.
* ::slotted(p) matches slotted paragraphs.
* p ::slotted(*) matches slotted elements where the <slot> is a descendant of a paragraph element.


* Add styles using a <style> element.
* Add styles using an external style sheet (not recommended).


* The ShadyCSS polyfill doesn't support external style sheets.
* External styles can cause a flash-of-unstyled-content (FOUC) while they load.
* The URL in the href attribute is relative to the main document. This is okay if you're building an app and your asset URLs are well-known, but avoid using external style sheets when building a reusable element.


1. Import classMap and/or styleMap: 
2. Use classMap and/or styleMap in your element template: 


* color
* font-family and other font-* properties
* All CSS custom properties (--*)

```
styles
```

```
css
```

```
styles
```

```
static styles = css`...`;
```

```
static styles = css`...`;
```

```
static styles = css`...`;
```

```
static styles = [ css`...`, css`...`];
```

```
static styles = [ css`...`, css`...`];
```

```
static styles = [ css`...`, css`...`];
```

```
styles
```

```
css
```

```
css
```

```
const mainColor = css`red`;...static styles = css`  div { color: ${mainColor} }`;
```

```
const mainColor = css`red`;...static styles = css`  div { color: ${mainColor} }`;
```

```
const mainColor = css`red`;
```

```
...
```

```
static styles = css`
```

```
div { color: ${mainColor} }
```

```
`;
```

```
css
```

```
css
```

```
unsafeCSS
```

```
const mainColor = 'red';...static styles = css`  div { color: ${unsafeCSS(mainColor)} }`;
```

```
const mainColor = 'red';...static styles = css`  div { color: ${unsafeCSS(mainColor)} }`;
```

```
const mainColor = 'red';
```

```
...
```

```
static styles = css`
```

```
div { color: ${unsafeCSS(mainColor)} }
```

```
`;
```

```
unsafeCSS
```

```
super.styles
```

```
super.styles
```

```
static styles
```

```
CSSResultGroup
```

```
styles
```

```
// Prevent typescript from narrowing the type of `styles` to `CSSResult`// so that subclassers can assign e.g. `[SuperElement.styles, css`...`]`;static styles: CSSResultGroup = css`...`;
```

```
// Prevent typescript from narrowing the type of `styles` to `CSSResult`// so that subclassers can assign e.g. `[SuperElement.styles, css`...`]`;static styles: CSSResultGroup = css`...`;
```

```
// Prevent typescript from narrowing the type of `styles` to `CSSResult`
```

```
// so that subclassers can assign e.g. `[SuperElement.styles, css`...`]`;
```

```
static styles: CSSResultGroup = css`...`;
```

```
export const buttonStyles = css`  .blue-button {    color: white;    background-color: blue;  }  .blue-button:disabled {    background-color: grey;  }`;
```

```
export const buttonStyles = css`  .blue-button {    color: white;    background-color: blue;  }  .blue-button:disabled {    background-color: grey;  }`;
```

```
export const buttonStyles = css`
```

```
.blue-button {
```

```
color: white;
```

```
background-color: blue;
```

```
}
```

```
.blue-button:disabled {
```

```
background-color: grey;
```

```
}`;
```

```
styles
```

```
import { buttonStyles } from './button-styles.js';
class MyElement extends LitElement {  static styles = [    buttonStyles,    css`      :host { display: block;        border: 1px solid black;      }`  ];}
```

```
import { buttonStyles } from './button-styles.js';
class MyElement extends LitElement {  static styles = [    buttonStyles,    css`      :host { display: block;        border: 1px solid black;      }`  ];}
```

```
import { buttonStyles } from './button-styles.js';
```

```
class MyElement extends LitElement {
```

```
static styles = [
```

```
buttonStyles,
```

```
css`
```

```
:host { display: block;
```

```
border: 1px solid black;
```

```
}`
```

```
];
```

```
}
```

```
\2022
```

```
css
```

```
\\2022
```

```
\u
```

```
\u2022
```

```
static styles = css`  div::before {    content: '\u2022';  }
```

```
static styles = css`  div::before {    content: '\u2022';  }
```

```
static styles = css`
```

```
div::before {
```

```
content: '\u2022';
```

```
}
```

```
input
```

```
*
```

```
#my-element
```

```
:host
```

```
:host
```

```
:host()
```

```
:host
```

```
:host(selector)
```

```
:host
```

```
:host()
```

```
my-element {  display: inline-block;}
```

```
my-element {  display: inline-block;}
```

```
my-element {
```

```
display: inline-block;
```

```
}
```

```
<ul>
```

```
<li>
```

```
<slot>
```

```
<slot>
```

```
::slotted()
```

```
<slot>
```

```
::slotted(*)
```

```
::slotted(p)
```

```
p ::slotted(*)
```

```
<slot>
```

```
::slotted()
```

```
<my-element>  <div>Stylable with ::slotted()</div></my-element>
<my-element>  <div><p>Not stylable with ::slotted()</p></div></my-element>
```

```
<my-element>  <div>Stylable with ::slotted()</div></my-element>
<my-element>  <div><p>Not stylable with ::slotted()</p></div></my-element>
```

```
<my-element>
```

```
<div>Stylable with ::slotted()</div>
```

```
</my-element>
```

```
<my-element>
```

```
<div><p>Not stylable with ::slotted()</p></div>
```

```
</my-element>
```

```
::slotted()
```

```
my-element > div {  /* Outside style targetting a slotted child can override ::slotted() styles */}
```

```
my-element > div {  /* Outside style targetting a slotted child can override ::slotted() styles */}
```

```
my-element > div {
```

```
/* Outside style targetting a slotted child can override ::slotted() styles */
```

```
}
```

```
::slotted()
```

```
styles
```

```
<style>
```

```
styles
```

```
styles
```

```
<style>
```

```
render() {  return html`    <style>      /* updated per instance */    </style>    <div>template content</div>  `;}
```

```
render() {  return html`    <style>      /* updated per instance */    </style>    <div>template content</div>  `;}
```

```
render() {
```

```
return html`
```

```
<style>
```

```
/* updated per instance */
```

```
</style>
```

```
<div>template content</div>
```

```
`;
```

```
}
```

```
render() {  return html`    <style>      :host {        /* Warning: this approach has limitations & performance issues! */        color: ${myColor}      }    </style>    <div>template content</div>  `;}
```

```
render() {  return html`    <style>      :host {        /* Warning: this approach has limitations & performance issues! */        color: ${myColor}      }    </style>    <div>template content</div>  `;}
```

```
render() {
```

```
return html`
```

```
<style>
```

```
:host {
```

```
/* Warning: this approach has limitations & performance issues! */
```

```
color: ${myColor}
```

```
}
```

```
</style>
```

```
<div>template content</div>
```

```
`;
```

```
}
```

```
<style>
```

```
<style>
```

```
<style>
```

```
<style>
```

```
<style>
```

```
static styles = css`/* ... */`;  render() {    const redStyle = html`<style> :host { color: red; } </style>`;    return html`${this.red ? redStyle : ''}`
```

```
static styles = css`/* ... */`;  render() {    const redStyle = html`<style> :host { color: red; } </style>`;    return html`${this.red ? redStyle : ''}`
```

```
static styles = css`/* ... */`;
```

```
render() {
```

```
const redStyle = html`<style> :host { color: red; } </style>`;
```

```
return html`${this.red ? redStyle : ''}`
```

```
<link>
```

```
styles
```

```
href
```

```
class
```

```
style
```

```
classMap
```

```
styleMap
```

```
styleMap
```

```
classMap
```

```
classMap
```

```
styleMap
```

```
import { classMap } from 'lit/directives/class-map.js';import { styleMap } from 'lit/directives/style-map.js';
```

```
import { classMap } from 'lit/directives/class-map.js';import { styleMap } from 'lit/directives/style-map.js';
```

```
import { classMap } from 'lit/directives/class-map.js';
```

```
import { styleMap } from 'lit/directives/style-map.js';
```

```
classMap
```

```
styleMap
```

```
color
```

```
font-family
```

```
font-*
```

```
--*
```

```
<style>html {  color: green;}</style><my-element>  #shadow-root    Will be green</my-element>
```

```
<style>html {  color: green;}</style><my-element>  #shadow-root    Will be green</my-element>
```

```
<style>
```

```
html {
```

```
color: green;
```

```
}
```

```
</style>
```

```
<my-element>
```

```
#shadow-root
```

```
Will be green
```

```
</my-element>
```

```
--custom-property-name
```

```
--my-background
```

```
yellow
```

```
class MyElement extends LitElement {  static styles = css`    :host {      background-color: var(--my-background, yellow);    }  `;  render() {    return html`<p>Hello world</p>`;  }}
```

```
class MyElement extends LitElement {  static styles = css`    :host {      background-color: var(--my-background, yellow);    }  `;  render() {    return html`<p>Hello world</p>`;  }}
```

```
class MyElement extends LitElement {
```

```
static styles = css`
```

```
:host {
```

```
background-color: var(--my-background, yellow);
```

```
}
```

```
`;
```

```
render() {
```

```
return html`<p>Hello world</p>`;
```

```
}
```

```
}
```

```
--my-background
```

```
my-element
```

```
<style>  my-element {    --my-background: rgb(67, 156, 144);  }</style><my-element></my-element>
```

```
<style>  my-element {    --my-background: rgb(67, 156, 144);  }</style><my-element></my-element>
```

```
<style>
```

```
my-element {
```

```
--my-background: rgb(67, 156, 144);
```

```
}
```

```
</style>
```

```
<my-element></my-element>
```

```
--my-background
```

```
my-element
```

```
<style>  my-element {    --my-background: rgb(67, 156, 144);  }  my-element.stuff {    --my-background: #111111;  }</style><my-element></my-element><my-element class="stuff"></my-element>
```

```
<style>  my-element {    --my-background: rgb(67, 156, 144);  }  my-element.stuff {    --my-background: #111111;  }</style><my-element></my-element><my-element class="stuff"></my-element>
```

```
<style>
```

```
my-element {
```

```
--my-background: rgb(67, 156, 144);
```

```
}
```

```
my-element.stuff {
```

```
--my-background: #111111;
```

```
}
```

```
</style>
```

```
<my-element></my-element>
```

```
<my-element class="stuff"></my-element>
```

```
代碼示例 (項目: v3-docs/components/style/basic, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/style/superstyles, 文件: )
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/style/host, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/style/slottedselector, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/style/maps, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/style/theming, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

