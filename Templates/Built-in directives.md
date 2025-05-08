# Built-in directives

Directives are functions that can extend Lit by customizing the way an expression renders. Lit includes a number of built-in directives to help with a variety of rendering needs:





Styling

classMap

Assigns a list of classes to an element based on an object.

styleMap

Sets a list of style properties to an element based on an object.

Loops and Conditionals

when

choose

map

repeat

join

range

ifDefined

Caching and change detection

cache

keyed

guard

live

Referencing rendered DOM

ref

Rendering special values

templateContent

Renders the content of a <template> element.

unsafeHTML

unsafeSVG

Asynchronous rendering

until

asyncAppend

Appends values from an AsyncIterable into the DOM as they are yielded.

asyncReplace

Renders the latest value from an AsyncIterable into the DOM as it is yielded.

Only bundle what you use. These are called "built-in" directives because they're part of the Lit package. But each directive is a separate module, so your app only bundles the directives you import.

You can also build your own directives. For more information, see Custom directives.

Sets a list of classes to an element based on an object.

class attribute expression (must be the only expression in the class attribute)

The classMap directive uses the element.classList API to efficiently add and remove classes to an element based on an object passed by the user. Each key in the object is treated as a class name, and if the value associated with the key is truthy, that class is added to the element. On subsequent renders, any previously set classes that are falsy or no longer in the object are removed.

The classMap must be the only expression in the class attribute, but it can be combined with static values:

Explore classMap more in the playground.

Sets a list of style properties to an element based on an object.

style attribute expression (must be the only expression in the style attribute)

The styleMap directive uses the element.style API to efficiently add and remove inline styles to an element based on an object passed by the user. Each key in the object is treated as a style property name, the value is treated as the value for that property. On subsequent renders, any previously set style properties that are undefined or null are removed (set to null).

For CSS properties that contain dashes, you can either use the camel-case equivalent, or put the property name in quotes. For example, you can write the CSS property font-family as either fontFamily or 'font-family':

Refer to CSS custom properties such as --custom-color, by placing the whole property name in quotes:

The styleMap must be the only expression in the style attribute, but it can be combined with static values:

Explore styleMap more in the playground.

Renders one of two templates based on a condition.

Any

When condition is true, returns the result of calling trueCase(), else returns the result of calling falseCase() if falseCase is defined.

This is a convenience wrapper around a ternary expression that makes it a little nicer to write an inline conditional without an else.

Chooses and evaluates a template function from a list of cases based on matching the given value to a case.

Any

Cases are structured as [caseValue, func]. value is matched to caseValue by strict equality. The first match is selected. Case values can be of any type including primitives, objects, and symbols.

This is similar to a switch statement, but as an expression and without fallthrough.

Returns an iterable containing the result of calling f(value) on each value in items.

Any

map() is a simple wrapper around a for/of loop that makes working with iterables in expressions a bit easier. map() always updates any DOM created in place - it does not do any diffing or DOM movement. If you need that see repeat. map() is smaller and faster than repeat(), so if you don't need diffing and DOM stability, prefer map().

Renders values from an iterable into the DOM, with optional keying to enable data diffing and DOM stability.

Child expression

Repeats a series of values (usually TemplateResults) generated from an iterable, and updates those items efficiently when the iterable changes. When the keyFn is provided, key-to-DOM association is maintained between updates by moving generated DOM when required, and is generally the most efficient way to use repeat since it performs minimum unnecessary work for insertions and removals.

If you're not using a key function, you should consider using map().

If no keyFn is provided, repeat will perform similar to a simple map of items to values, and DOM will be reused against potentially different items.

See When to use map or repeat for a discussion of when to use repeat and when to use standard JavaScript flow control.

Explore repeat more in the playground.

Returns an iterable containing the values in items interleaved with the joiner value.

Any

Returns an iterable of integers from start to end (exclusive) incrementing by step.

Any

Sets an attribute if the value is defined and removes the attribute if undefined.

Attribute expression

For AttributeParts, sets the attribute if the value is defined and removes the attribute if the value is undefined (undefined or null). For other part types, this directive is a no-op.

When more than one expression exists in a single attribute value, the attribute will be removed if any expression uses ifDefined and evaluates to undefined/null. This is especially useful for setting URL attributes, when the attribute should not be set if required parts of the URL are not defined, to prevent 404's.

Explore ifDefined more in the playground.

Caches rendered DOM when changing templates rather than discarding the DOM. You can use this directive to optimize rendering performance when frequently switching between large templates.

Child expression

When the value passed to cache changes between one or more TemplateResults, the rendered DOM nodes for a given template are cached when they're not in use. When the template changes, the directive caches the current DOM nodes before switching to the new value, and restores them from the cache when switching back to a previously-rendered value, rather than creating the DOM nodes anew.

When Lit re-renders a template, it only updates the modified portions: it doesn't create or remove any more DOM than needed. But when you switch from one template to another, Lit removes the old DOM and renders a new DOM tree.

The cache directive caches the generated DOM for a given expression and input template. In the example above, it caches the DOM for both the summaryView and detailView templates. When you switch from one view to another, Lit swaps in the cached version of the new view and updates it with the latest data. This can improve rendering performance when these views are frequently switched.

Explore cache more in the playground.

Associates a renderable value with a unique key. When the key changes, the previous DOM is removed and disposed before rendering the next value, even if the value—such as a template—is the same.

Any expression

keyed is useful when you're rendering stateful elements and you need to ensure that all state of the element is cleared when some critical data changes. It essentially opts-out of Lit's default DOM reuse strategy.

keyed is also useful in some animation scenarios if you need to force a new element for "enter" or "exit" animations.

Only re-evaluates the template when one of its dependencies changes, to optimize rendering performance by preventing unnecessary work.

Any expression

Renders the value returned by valueFn, and only re-evaluates valueFn when one of the dependencies changes identity.

Where:

guard is useful with immutable data patterns, by preventing expensive work until data updates.

In this case, the expensive calculateSHA function is only run when the value property changes.

Explore guard more in the playground.

Sets an attribute or property if it differs from the live DOM value rather than the last-rendered value.

Attribute or property expression

When determining whether to update the value, checks the expression value against the live DOM value, instead of Lit's default behavior of checking against the last set value.

This is useful for cases where the DOM value may change from outside of Lit. For example, when using an expression to set an <input> element's value property, a content editable element's text, or to a custom element that changes its own properties or attributes.

In these cases if the DOM value changes, but the value set through Lit expression hasn't, Lit won't know to update the DOM value and will leave it alone. If this is not what you want—if you want to overwrite the DOM value with the bound value no matter what—use the live() directive.

live() performs a strict equality check against the live DOM value, and if the new value is equal to the live value, does nothing. This means that live() should not be used when the expression will cause a type conversion. If you use live() with an attribute expression, make sure that only strings are passed in, or the expression will update every render.

Explore live more in the playground.

Renders the content of a <template> element.

Child expression

Lit templates are encoded in Javascript, so that they can embed Javascript expressions that make them dynamic. If you have a static HTML <template> that you need to include in your Lit template, you can use the templateContent directive to clone the template content and include it in your Lit template. As long as the template element reference does not change between renders, subsequent renders will no-op.

Note, the template content should be developer-controlled and must not be created using an untrusted string. Examples of untrusted content include query string parameters and values from user inputs. Untrusted templates rendered with this directive could lead to cross-site scripting (XSS) vulnerabilities.

Explore templateContent more in the playground.

Renders a string as HTML rather than text.

Child expression

A key feature of Lit's templating syntax is that only strings originating in template literals are parsed as HTML. Because template literals can only be authored in trusted script files, this acts as a natural safeguard against XSS attacks injecting untrusted HTML. However, there may be cases when HTML not originating in script files needs to be rendered in a Lit template, for example trusted HTML content fetched from a database. The unsafeHTML directive will parse such a string as HTML and render it in a Lit template.

Note, the string passed to unsafeHTML must be developer-controlled and not include untrusted content. Examples of untrusted content include query string parameters and values from user inputs.

Untrusted content rendered with this directive could lead to cross-site scripting (XSS), CSS injection, data exfiltration, etc. vulnerabilities. unsafeHTML uses innerHTML to parse the HTML string, so the security implications are the same as innerHTML, as documented on MDN.

Explore unsafeHTML more in the playground.

Renders a string as SVG rather than text.

Child expression

Similar to with unsafeHTML, there may be cases when SVG content not originating in script files needs to be rendered in a Lit template, for example trusted SVG content fetched from a database. The unsafeSVG directive will parse such a string as SVG and render it in a Lit template.

Note, the string passed to unsafeSVG must be developer-controlled and not include untrusted content. Examples of untrusted content include query string parameters and values from user inputs. Untrusted content rendered with this directive could lead to cross-site scripting (XSS) vulnerabilities.

Explore unsafeSVG more in the playground.

Retrieves a reference to an element rendered into the DOM.

Element expression

Although most DOM manipulation in Lit can be achieved declaratively using templates, advanced situations may required getting a reference to an element rendered in the template and manipulating it imperatively. Common examples of when this may be useful include focusing a form control or calling an imperative DOM manipulation library on a container element.

When placed on an element in the template, the ref directive will retrieve a reference to that element once rendered. The element reference may be retrieved in one of two ways: either by passing a Ref object or by passing a callback.

A Ref object acts as a container for a reference to the element, and can be created using the createRef helper method found in the ref module. After rendering, the Ref's value property will be set to the element, where it can be accessed in post-render lifecycle like updated.

A ref callback can also be passed to the ref directive. The callback will be called each time the referenced element changes. If a ref callback is rendered to a different element position or is removed in a subsequent render, it will first be called with undefined, followed by another call with the new element it was rendered to (if any). Note that in a LitElement, the callback will be called bound to the host element automatically.

Explore ref more in the playground.

Renders placeholder content until one or more promises resolve.

Any expression

Takes a series of values, including Promises. Values are rendered in priority order, with the first argument having the highest priority and the last argument having the lowest priority. If a value is a Promise, a lower-priority value will be rendered until it resolves.

The priority of values can be used to create placeholder content for async data. For example, a Promise with pending content can be the first (highest-priority) argument, and a non-promise loading indicator template can be used as the second (lower-priority) argument. The loading indicator renders immediately, and the primary content will render when the Promise resolves.

Explore until more in the playground.

Appends values from an AsyncIterable into the DOM as they are yielded.

Child expression

asyncAppend renders the values of an async iterable, appending each new value after the previous. Note that async generators also implement the async iterable protocol, and thus can be consumed by asyncAppend.

Explore asyncAppend more in the playground.

Renders the latest value from an AsyncIterable into the DOM as it is yielded.

Any expression

Similar to asyncAppend, asyncReplace renders the values of an async iterable, replacing the previous value with each new value.

Explore asyncReplace more in the playground.


1. StylingclassMapstyleMap
2. classMap
3. styleMap
4. Loops and conditionalswhenchoosemaprepeatjoinrangeifDefined
5. when
6. choose
7. map
8. repeat
9. join
10. range
11. ifDefined
12. Caching and change detectioncachekeyedguardlive
13. cache
14. keyed
15. guard
16. live
17. Rendering special valuestemplateContentunsafeHTMLunsafeSVG
18. templateContent
19. unsafeHTML
20. unsafeSVG
21. Referencing rendered DOMref
22. ref
23. Asynchronous renderinguntilasyncAppendasyncReplace
24. until
25. asyncAppend
26. asyncReplace


1. classMap
2. styleMap


1. when
2. choose
3. map
4. repeat
5. join
6. range
7. ifDefined


1. cache
2. keyed
3. guard
4. live


1. templateContent
2. unsafeHTML
3. unsafeSVG


1. ref


1. until
2. asyncAppend
3. asyncReplace


* dependencies is an array of values to monitor for changes.
* valueFn is a function that returns a renderable value.

```
classMap
```

```
styleMap
```

```
when
```

```
choose
```

```
map
```

```
repeat
```

```
join
```

```
range
```

```
ifDefined
```

```
cache
```

```
keyed
```

```
guard
```

```
live
```

```
ref
```

```
templateContent
```

```
<template>
```

```
unsafeHTML
```

```
unsafeSVG
```

```
until
```

```
asyncAppend
```

```
AsyncIterable
```

```
asyncReplace
```

```
AsyncIterable
```

```
import {classMap} from 'lit/directives/class-map.js';
```

```
import {classMap} from 'lit/directives/class-map.js';
```

```
import {classMap} from 'lit/directives/class-map.js';
```

```
classMap(classInfo: {[name: string]: string | boolean | number})
```

```
classMap(classInfo: {[name: string]: string | boolean | number})
```

```
classMap(classInfo: {[name: string]: string | boolean | number})
```

```
class
```

```
class
```

```
classMap
```

```
element.classList
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property({type: Boolean})  enabled = false;
  render() {    const classes = { enabled: this.enabled, hidden: false };    return html`<div class=${classMap(classes)}>Classy text</div>`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property({type: Boolean})  enabled = false;
  render() {    const classes = { enabled: this.enabled, hidden: false };    return html`<div class=${classMap(classes)}>Classy text</div>`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property({type: Boolean})
```

```
enabled = false;
```

```
render() {
```

```
const classes = { enabled: this.enabled, hidden: false };
```

```
return html`<div class=${classMap(classes)}>Classy text</div>`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    enabled: {type: Boolean},  };
  constructor() {    super();    this.enabled = false;  }
  render() {    const classes = { enabled: this.enabled, hidden: false };    return html`<div class=${classMap(classes)}>Classy text</div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    enabled: {type: Boolean},  };
  constructor() {    super();    this.enabled = false;  }
  render() {    const classes = { enabled: this.enabled, hidden: false };    return html`<div class=${classMap(classes)}>Classy text</div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
enabled: {type: Boolean},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.enabled = false;
```

```
}
```

```
render() {
```

```
const classes = { enabled: this.enabled, hidden: false };
```

```
return html`<div class=${classMap(classes)}>Classy text</div>`;
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
classMap
```

```
class
```

```
html`<div class="my-widget ${classMap(dynamicClasses)}">Static and dynamic</div>`;
```

```
html`<div class="my-widget ${classMap(dynamicClasses)}">Static and dynamic</div>`;
```

```
html`<div class="my-widget ${classMap(dynamicClasses)}">Static and dynamic</div>`;
```

```
classMap
```

```
import {styleMap} from 'lit/directives/style-map.js';
```

```
import {styleMap} from 'lit/directives/style-map.js';
```

```
import {styleMap} from 'lit/directives/style-map.js';
```

```
styleMap(styleInfo: {[name: string]: string | undefined | null})
```

```
styleMap(styleInfo: {[name: string]: string | undefined | null})
```

```
styleMap(styleInfo: {[name: string]: string | undefined | null})
```

```
style
```

```
style
```

```
styleMap
```

```
element.style
```

```
null
```

```
null
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property({type: Boolean})  enabled = false;
  render() {    const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };    return html`<p style=${styleMap(styles)}>Hello style!</p>`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property({type: Boolean})  enabled = false;
  render() {    const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };    return html`<p style=${styleMap(styles)}>Hello style!</p>`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property({type: Boolean})
```

```
enabled = false;
```

```
render() {
```

```
const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };
```

```
return html`<p style=${styleMap(styles)}>Hello style!</p>`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    enabled: {type: Boolean},  };
  constructor() {    super();    this.enabled = false;  }
  render() {    const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };    return html`<p style=${styleMap(styles)}>Hello style!</p>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    enabled: {type: Boolean},  };
  constructor() {    super();    this.enabled = false;  }
  render() {    const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };    return html`<p style=${styleMap(styles)}>Hello style!</p>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
enabled: {type: Boolean},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.enabled = false;
```

```
}
```

```
render() {
```

```
const styles = { backgroundColor: this.enabled ? 'blue' : 'gray', color: 'white' };
```

```
return html`<p style=${styleMap(styles)}>Hello style!</p>`;
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
font-family
```

```
fontFamily
```

```
'font-family'
```

```
{ fontFamily: 'roboto' }{ 'font-family': 'roboto' }
```

```
{ fontFamily: 'roboto' }{ 'font-family': 'roboto' }
```

```
{ fontFamily: 'roboto' }
```

```
{ 'font-family': 'roboto' }
```

```
--custom-color
```

```
{ '--custom-color': 'steelblue' }
```

```
{ '--custom-color': 'steelblue' }
```

```
{ '--custom-color': 'steelblue' }
```

```
styleMap
```

```
style
```

```
html`<p style="color: white; ${styleMap(moreStyles)}">More styles!</p>`;
```

```
html`<p style="color: white; ${styleMap(moreStyles)}">More styles!</p>`;
```

```
html`<p style="color: white; ${styleMap(moreStyles)}">More styles!</p>`;
```

```
styleMap
```

```
import {when} from 'lit/directives/when.js';
```

```
import {when} from 'lit/directives/when.js';
```

```
import {when} from 'lit/directives/when.js';
```

```
when<T, F>(  condition: boolean,  trueCase: () => T,  falseCase?: () => F)
```

```
when<T, F>(  condition: boolean,  trueCase: () => T,  falseCase?: () => F)
```

```
when<T, F>(
```

```
condition: boolean,
```

```
trueCase: () => T,
```

```
falseCase?: () => F
```

```
)
```

```
condition
```

```
trueCase()
```

```
falseCase()
```

```
falseCase
```

```
class MyElement extends LitElement {  render() {    return html`      ${when(this.user, () => html`User: ${this.user.username}`, () => html`Sign In...`)}    `;  }}
```

```
class MyElement extends LitElement {  render() {    return html`      ${when(this.user, () => html`User: ${this.user.username}`, () => html`Sign In...`)}    `;  }}
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
${when(this.user, () => html`User: ${this.user.username}`, () => html`Sign In...`)}
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
value
```

```
import {choose} from 'lit/directives/choose.js';
```

```
import {choose} from 'lit/directives/choose.js';
```

```
import {choose} from 'lit/directives/choose.js';
```

```
choose<T, V>(  value: T,  cases: Array<[T, () => V]>,  defaultCase?: () => V)
```

```
choose<T, V>(  value: T,  cases: Array<[T, () => V]>,  defaultCase?: () => V)
```

```
choose<T, V>(
```

```
value: T,
```

```
cases: Array<[T, () => V]>,
```

```
defaultCase?: () => V
```

```
)
```

```
[caseValue, func]
```

```
value
```

```
caseValue
```

```
class MyElement extends LitElement {  render() {    return html`      ${choose(this.section, [        ['home', () => html`<h1>Home</h1>`],        ['about', () => html`<h1>About</h1>`]      ],      () => html`<h1>Error</h1>`)}    `;  }}
```

```
class MyElement extends LitElement {  render() {    return html`      ${choose(this.section, [        ['home', () => html`<h1>Home</h1>`],        ['about', () => html`<h1>About</h1>`]      ],      () => html`<h1>Error</h1>`)}    `;  }}
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
${choose(this.section, [
```

```
['home', () => html`<h1>Home</h1>`],
```

```
['about', () => html`<h1>About</h1>`]
```

```
],
```

```
() => html`<h1>Error</h1>`)}
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
f(value)
```

```
items
```

```
import {map} from 'lit/directives/map.js';
```

```
import {map} from 'lit/directives/map.js';
```

```
import {map} from 'lit/directives/map.js';
```

```
map<T>(  items: Iterable<T> | undefined,  f: (value: T, index: number) => unknown)
```

```
map<T>(  items: Iterable<T> | undefined,  f: (value: T, index: number) => unknown)
```

```
map<T>(
```

```
items: Iterable<T> | undefined,
```

```
f: (value: T, index: number) => unknown
```

```
)
```

```
map()
```

```
map()
```

```
map()
```

```
repeat()
```

```
map()
```

```
class MyElement extends LitElement {  render() {    return html`      <ul>        ${map(items, (i) => html`<li>${i}</li>`)}      </ul>    `;  }}
```

```
class MyElement extends LitElement {  render() {    return html`      <ul>        ${map(items, (i) => html`<li>${i}</li>`)}      </ul>    `;  }}
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
<ul>
```

```
${map(items, (i) => html`<li>${i}</li>`)}
```

```
</ul>
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
import {repeat} from 'lit/directives/repeat.js';
```

```
import {repeat} from 'lit/directives/repeat.js';
```

```
import {repeat} from 'lit/directives/repeat.js';
```

```
repeat(items: Iterable<T>, keyfn: KeyFn<T>, template: ItemTemplate<T>)repeat(items: Iterable<T>, template: ItemTemplate<T>)type KeyFn<T> = (item: T, index: number) => unknown;type ItemTemplate<T> = (item: T, index: number) => unknown;
```

```
repeat(items: Iterable<T>, keyfn: KeyFn<T>, template: ItemTemplate<T>)repeat(items: Iterable<T>, template: ItemTemplate<T>)type KeyFn<T> = (item: T, index: number) => unknown;type ItemTemplate<T> = (item: T, index: number) => unknown;
```

```
repeat(items: Iterable<T>, keyfn: KeyFn<T>, template: ItemTemplate<T>)
```

```
repeat(items: Iterable<T>, template: ItemTemplate<T>)
```

```
type KeyFn<T> = (item: T, index: number) => unknown;
```

```
type ItemTemplate<T> = (item: T, index: number) => unknown;
```

```
TemplateResults
```

```
keyFn
```

```
repeat
```

```
map()
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  items: Array<{id: number, name: string}> = [];
  render() {    return html`      <ul>        ${repeat(this.items, (item) => item.id, (item, index) => html`          <li>${index}: ${item.name}</li>`)}      </ul>    `;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  items: Array<{id: number, name: string}> = [];
  render() {    return html`      <ul>        ${repeat(this.items, (item) => item.id, (item, index) => html`          <li>${index}: ${item.name}</li>`)}      </ul>    `;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
items: Array<{id: number, name: string}> = [];
```

```
render() {
```

```
return html`
```

```
<ul>
```

```
${repeat(this.items, (item) => item.id, (item, index) => html`
```

```
<li>${index}: ${item.name}</li>`)}
```

```
</ul>
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
class MyElement extends LitElement {  static properties = {    items: {},  };
  constructor() {    super();    this.items = [];  }
  render() {    return html`      <ul>        ${repeat(this.items, (item) => item.id, (item, index) => html`          <li>${index}: ${item.name}</li>`)}      </ul>    `;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    items: {},  };
  constructor() {    super();    this.items = [];  }
  render() {    return html`      <ul>        ${repeat(this.items, (item) => item.id, (item, index) => html`          <li>${index}: ${item.name}</li>`)}      </ul>    `;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
items: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.items = [];
```

```
}
```

```
render() {
```

```
return html`
```

```
<ul>
```

```
${repeat(this.items, (item) => item.id, (item, index) => html`
```

```
<li>${index}: ${item.name}</li>`)}
```

```
</ul>
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
keyFn
```

```
repeat
```

```
repeat
```

```
repeat
```

```
items
```

```
joiner
```

```
import {join} from 'lit/directives/join.js';
```

```
import {join} from 'lit/directives/join.js';
```

```
import {join} from 'lit/directives/join.js';
```

```
join<I, J>(  items: Iterable<I> | undefined,  joiner: J): Iterable<I | J>;
join<I, J>(  items: Iterable<I> | undefined,  joiner: (index: number) => J): Iterable<I | J>;
```

```
join<I, J>(  items: Iterable<I> | undefined,  joiner: J): Iterable<I | J>;
join<I, J>(  items: Iterable<I> | undefined,  joiner: (index: number) => J): Iterable<I | J>;
```

```
join<I, J>(
```

```
items: Iterable<I> | undefined,
```

```
joiner: J
```

```
): Iterable<I | J>;
```

```
join<I, J>(
```

```
items: Iterable<I> | undefined,
```

```
joiner: (index: number) => J
```

```
): Iterable<I | J>;
```

```
class MyElement extends LitElement {
  render() {    return html`      ${join(        map(menuItems, (i) => html`<a href=${i.href}>${i.label}</a>`),        html`<span class="separator">|</span>`      )}    `;  }}
```

```
class MyElement extends LitElement {
  render() {    return html`      ${join(        map(menuItems, (i) => html`<a href=${i.href}>${i.label}</a>`),        html`<span class="separator">|</span>`      )}    `;  }}
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
${join(
```

```
map(menuItems, (i) => html`<a href=${i.href}>${i.label}</a>`),
```

```
html`<span class="separator">|</span>`
```

```
)}
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
start
```

```
end
```

```
step
```

```
import {range} from 'lit/directives/range.js';
```

```
import {range} from 'lit/directives/range.js';
```

```
import {range} from 'lit/directives/range.js';
```

```
range(end: number): Iterable<number>;
range(  start: number,  end: number,  step?: number): Iterable<number>;
```

```
range(end: number): Iterable<number>;
range(  start: number,  end: number,  step?: number): Iterable<number>;
```

```
range(end: number): Iterable<number>;
```

```
range(
```

```
start: number,
```

```
end: number,
```

```
step?: number
```

```
): Iterable<number>;
```

```
class MyElement extends LitElement {
  render() {    return html`      ${map(range(8), (i) => html`${i + 1}`)}    `;  }}
```

```
class MyElement extends LitElement {
  render() {    return html`      ${map(range(8), (i) => html`${i + 1}`)}    `;  }}
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
${map(range(8), (i) => html`${i + 1}`)}
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
import {ifDefined} from 'lit/directives/if-defined.js';
```

```
import {ifDefined} from 'lit/directives/if-defined.js';
```

```
import {ifDefined} from 'lit/directives/if-defined.js';
```

```
ifDefined(value: unknown)
```

```
ifDefined(value: unknown)
```

```
ifDefined(value: unknown)
```

```
undefined
```

```
null
```

```
ifDefined
```

```
undefined
```

```
null
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  filename: string | undefined = undefined;
  @property()  size: string | undefined = undefined;
  render() {    // src attribute not rendered if either size or filename are undefined    return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  filename: string | undefined = undefined;
  @property()  size: string | undefined = undefined;
  render() {    // src attribute not rendered if either size or filename are undefined    return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
filename: string | undefined = undefined;
```

```
@property()
```

```
size: string | undefined = undefined;
```

```
render() {
```

```
// src attribute not rendered if either size or filename are undefined
```

```
return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    filename: {},    size: {},  };
  constructor() {    super();    this.filename = undefined;    this.size = undefined;  }
  render() {    // src attribute not rendered if either size or filename are undefined    return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;  }}customElements.define('my-element', MyEleent);
```

```
class MyElement extends LitElement {  static properties = {    filename: {},    size: {},  };
  constructor() {    super();    this.filename = undefined;    this.size = undefined;  }
  render() {    // src attribute not rendered if either size or filename are undefined    return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;  }}customElements.define('my-element', MyEleent);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
filename: {},
```

```
size: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.filename = undefined;
```

```
this.size = undefined;
```

```
}
```

```
render() {
```

```
// src attribute not rendered if either size or filename are undefined
```

```
return html`<img src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}">`;
```

```
}
```

```
}
```

```
customElements.define('my-element', MyEleent);
```

```
ifDefined
```

```
import {cache} from 'lit/directives/cache.js';
```

```
import {cache} from 'lit/directives/cache.js';
```

```
import {cache} from 'lit/directives/cache.js';
```

```
cache(value: TemplateResult|unknown)
```

```
cache(value: TemplateResult|unknown)
```

```
cache(value: TemplateResult|unknown)
```

```
cache
```

```
TemplateResult
```

```
const detailView = (data) => html`<div>...</div>`;const summaryView = (data) => html`<div>...</div>`;
@customElement('my-element')class MyElement extends LitElement {
  @property()  data = {showDetails: true, /*...*/ };
  render() {    return html`${cache(this.data.showDetails      ? detailView(this.data)      : summaryView(this.data)    )}`;  }}
```

```
const detailView = (data) => html`<div>...</div>`;const summaryView = (data) => html`<div>...</div>`;
@customElement('my-element')class MyElement extends LitElement {
  @property()  data = {showDetails: true, /*...*/ };
  render() {    return html`${cache(this.data.showDetails      ? detailView(this.data)      : summaryView(this.data)    )}`;  }}
```

```
const detailView = (data) => html`<div>...</div>`;
```

```
const summaryView = (data) => html`<div>...</div>`;
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
data = {showDetails: true, /*...*/ };
```

```
render() {
```

```
return html`${cache(this.data.showDetails
```

```
? detailView(this.data)
```

```
: summaryView(this.data)
```

```
)}`;
```

```
}
```

```
}
```

```
const detailView = (data) => html`<div>...</div>`;const summaryView = (data) => html`<div>...</div>`;
class MyElement extends LitElement {  static properties = {    data: {},  };
  constructor() {    super();    this.data = {showDetails: true, /*...*/ };  }
  render() {    return html`${cache(this.data.showDetails      ? detailView(this.data)      : summaryView(this.data)    )}`;  }}customElements.define('my-element', MyElement);
```

```
const detailView = (data) => html`<div>...</div>`;const summaryView = (data) => html`<div>...</div>`;
class MyElement extends LitElement {  static properties = {    data: {},  };
  constructor() {    super();    this.data = {showDetails: true, /*...*/ };  }
  render() {    return html`${cache(this.data.showDetails      ? detailView(this.data)      : summaryView(this.data)    )}`;  }}customElements.define('my-element', MyElement);
```

```
const detailView = (data) => html`<div>...</div>`;
```

```
const summaryView = (data) => html`<div>...</div>`;
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
data: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.data = {showDetails: true, /*...*/ };
```

```
}
```

```
render() {
```

```
return html`${cache(this.data.showDetails
```

```
? detailView(this.data)
```

```
: summaryView(this.data)
```

```
)}`;
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
cache
```

```
summaryView
```

```
detailView
```

```
cache
```

```
import {keyed} from 'lit/directives/keyed.js';
```

```
import {keyed} from 'lit/directives/keyed.js';
```

```
import {keyed} from 'lit/directives/keyed.js';
```

```
keyed(key: unknown, value: unknown)
```

```
keyed(key: unknown, value: unknown)
```

```
keyed(key: unknown, value: unknown)
```

```
keyed
```

```
keyed
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  userId: string = '';
  render() {    return html`      <div>        ${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}      </div>`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  userId: string = '';
  render() {    return html`      <div>        ${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}      </div>`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
userId: string = '';
```

```
render() {
```

```
return html`
```

```
<div>
```

```
${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}
```

```
</div>`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    userId: {},  };
  constructor() {    super();    this.userId = '';  }
  render() {    return html`      <div>        ${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}      </div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    userId: {},  };
  constructor() {    super();    this.userId = '';  }
  render() {    return html`      <div>        ${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}      </div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
userId: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.userId = '';
```

```
}
```

```
render() {
```

```
return html`
```

```
<div>
```

```
${keyed(this.userId, html`<user-card .userId=${this.userId}></user-card>`)}
```

```
</div>`;
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
import {guard} from 'lit/directives/guard.js';
```

```
import {guard} from 'lit/directives/guard.js';
```

```
import {guard} from 'lit/directives/guard.js';
```

```
guard(dependencies: unknown[], valueFn: () => unknown)
```

```
guard(dependencies: unknown[], valueFn: () => unknown)
```

```
guard(dependencies: unknown[], valueFn: () => unknown)
```

```
valueFn
```

```
valueFn
```

```
dependencies
```

```
valueFn
```

```
guard
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  value: string = '';
  render() {    return html`      <div>        ${guard([this.value], () => calculateSHA(this.value))}      </div>`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  value: string = '';
  render() {    return html`      <div>        ${guard([this.value], () => calculateSHA(this.value))}      </div>`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
value: string = '';
```

```
render() {
```

```
return html`
```

```
<div>
```

```
${guard([this.value], () => calculateSHA(this.value))}
```

```
</div>`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    value: {},  };
  constructor() {    super();    this.value = '';  }
  render() {    return html`      <div>        ${guard([this.value], () => calculateSHA(this.value))}      </div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    value: {},  };
  constructor() {    super();    this.value = '';  }
  render() {    return html`      <div>        ${guard([this.value], () => calculateSHA(this.value))}      </div>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
value: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.value = '';
```

```
}
```

```
render() {
```

```
return html`
```

```
<div>
```

```
${guard([this.value], () => calculateSHA(this.value))}
```

```
</div>`;
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
calculateSHA
```

```
value
```

```
guard
```

```
import {live} from 'lit/directives/live.js';
```

```
import {live} from 'lit/directives/live.js';
```

```
import {live} from 'lit/directives/live.js';
```

```
live(value: unknown)
```

```
live(value: unknown)
```

```
live(value: unknown)
```

```
<input>
```

```
value
```

```
live()
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  data = {value: 'test'};
  render() {    return html`<input .value=${live(this.data.value)}>`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @property()  data = {value: 'test'};
  render() {    return html`<input .value=${live(this.data.value)}>`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
data = {value: 'test'};
```

```
render() {
```

```
return html`<input .value=${live(this.data.value)}>`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    data: {},  };
  constructor() {    super();    this.data = {value: 'test'};  }
  render() {    return html`<input .value=${live(this.data.value)}>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    data: {},  };
  constructor() {    super();    this.data = {value: 'test'};  }
  render() {    return html`<input .value=${live(this.data.value)}>`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
data: {},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.data = {value: 'test'};
```

```
}
```

```
render() {
```

```
return html`<input .value=${live(this.data.value)}>`;
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
live()
```

```
live()
```

```
live()
```

```
live
```

```
<template>
```

```
import {templateContent} from 'lit/directives/template-content.js';
```

```
import {templateContent} from 'lit/directives/template-content.js';
```

```
import {templateContent} from 'lit/directives/template-content.js';
```

```
templateContent(templateElement: HTMLTemplateElement)
```

```
templateContent(templateElement: HTMLTemplateElement)
```

```
templateContent(templateElement: HTMLTemplateElement)
```

```
<template>
```

```
templateContent
```

```
const templateEl = document.querySelector('template#myContent') as HTMLTemplateElement;
@customElement('my-element')class MyElement extends LitElement {
  render() {    return  html`      Here's some content from a template element:      ${templateContent(templateEl)}`;  }}
```

```
const templateEl = document.querySelector('template#myContent') as HTMLTemplateElement;
@customElement('my-element')class MyElement extends LitElement {
  render() {    return  html`      Here's some content from a template element:      ${templateContent(templateEl)}`;  }}
```

```
const templateEl = document.querySelector('template#myContent') as HTMLTemplateElement;
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
return  html`
```

```
Here's some content from a template element:
```

```
${templateContent(templateEl)}`;
```

```
}
```

```
}
```

```
const templateEl = document.querySelector('template#myContent');
class MyElement extends LitElement {
  render() {    return  html`      Here's some content from a template element:      ${templateContent(templateEl)}`;  }}customElements.define('my-element', MyElement);
```

```
const templateEl = document.querySelector('template#myContent');
class MyElement extends LitElement {
  render() {    return  html`      Here's some content from a template element:      ${templateContent(templateEl)}`;  }}customElements.define('my-element', MyElement);
```

```
const templateEl = document.querySelector('template#myContent');
```

```
class MyElement extends LitElement {
```

```
render() {
```

```
return  html`
```

```
Here's some content from a template element:
```

```
${templateContent(templateEl)}`;
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
templateContent
```

```
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
```

```
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
```

```
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
```

```
unsafeHTML(value: string | typeof nothing | typeof noChange)
```

```
unsafeHTML(value: string | typeof nothing | typeof noChange)
```

```
unsafeHTML(value: string | typeof nothing | typeof noChange)
```

```
unsafeHTML
```

```
unsafeHTML
```

```
unsafeHTML
```

```
innerHTML
```

```
innerHTML
```

```
const markup = '<h3>Some HTML to render.</h3>';
@customElement('my-element')class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe HTML ahead:      ${unsafeHTML(markup)}    `;  }}
```

```
const markup = '<h3>Some HTML to render.</h3>';
@customElement('my-element')class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe HTML ahead:      ${unsafeHTML(markup)}    `;  }}
```

```
const markup = '<h3>Some HTML to render.</h3>';
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
Look out, potentially unsafe HTML ahead:
```

```
${unsafeHTML(markup)}
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
const markup = '<h3>Some HTML to render.</h3>';
class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe HTML ahead:      ${unsafeHTML(markup)}    `;  }}customElements.define('my-element', MyElement);
```

```
const markup = '<h3>Some HTML to render.</h3>';
class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe HTML ahead:      ${unsafeHTML(markup)}    `;  }}customElements.define('my-element', MyElement);
```

```
const markup = '<h3>Some HTML to render.</h3>';
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
Look out, potentially unsafe HTML ahead:
```

```
${unsafeHTML(markup)}
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
unsafeHTML
```

```
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
```

```
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
```

```
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
```

```
unsafeSVG(value: string | typeof nothing | typeof noChange)
```

```
unsafeSVG(value: string | typeof nothing | typeof noChange)
```

```
unsafeSVG(value: string | typeof nothing | typeof noChange)
```

```
unsafeHTML
```

```
unsafeSVG
```

```
unsafeSVG
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
@customElement('my-element')class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe SVG ahead:      <svg width="40" height="40" viewBox="0 0 100 100"        xmlns="http://www.w3.org/2000/svg" version="1.1">        ${unsafeSVG(svg)}      </svg> `;  }}
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
@customElement('my-element')class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe SVG ahead:      <svg width="40" height="40" viewBox="0 0 100 100"        xmlns="http://www.w3.org/2000/svg" version="1.1">        ${unsafeSVG(svg)}      </svg> `;  }}
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
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
Look out, potentially unsafe SVG ahead:
```

```
<svg width="40" height="40" viewBox="0 0 100 100"
```

```
xmlns="http://www.w3.org/2000/svg" version="1.1">
```

```
${unsafeSVG(svg)}
```

```
</svg> `;
```

```
}
```

```
}
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe SVG ahead:      <svg width="40" height="40" viewBox="0 0 100 100"        xmlns="http://www.w3.org/2000/svg" version="1.1">        ${unsafeSVG(svg)}      </svg> `;  }}customElements.define('my-element', MyElement);
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
class MyElement extends LitElement {
  render() {    return html`      Look out, potentially unsafe SVG ahead:      <svg width="40" height="40" viewBox="0 0 100 100"        xmlns="http://www.w3.org/2000/svg" version="1.1">        ${unsafeSVG(svg)}      </svg> `;  }}customElements.define('my-element', MyElement);
```

```
const svg = '<circle cx="50" cy="50" r="40" fill="red" />';
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
Look out, potentially unsafe SVG ahead:
```

```
<svg width="40" height="40" viewBox="0 0 100 100"
```

```
xmlns="http://www.w3.org/2000/svg" version="1.1">
```

```
${unsafeSVG(svg)}
```

```
</svg> `;
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
unsafeSVG
```

```
import {ref} from 'lit/directives/ref.js';
```

```
import {ref} from 'lit/directives/ref.js';
```

```
import {ref} from 'lit/directives/ref.js';
```

```
ref(refOrCallback: RefOrCallback)
```

```
ref(refOrCallback: RefOrCallback)
```

```
ref(refOrCallback: RefOrCallback)
```

```
ref
```

```
Ref
```

```
Ref
```

```
createRef
```

```
ref
```

```
Ref
```

```
value
```

```
updated
```

```
@customElement('my-element')class MyElement extends LitElement {
  inputRef: Ref<HTMLInputElement> = createRef();
  render() {    // Passing ref directive a Ref object that will hold the element in .value    return html`<input ${ref(this.inputRef)}>`;  }
  firstUpdated() {    const input = this.inputRef.value!;    input.focus();  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  inputRef: Ref<HTMLInputElement> = createRef();
  render() {    // Passing ref directive a Ref object that will hold the element in .value    return html`<input ${ref(this.inputRef)}>`;  }
  firstUpdated() {    const input = this.inputRef.value!;    input.focus();  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
inputRef: Ref<HTMLInputElement> = createRef();
```

```
render() {
```

```
// Passing ref directive a Ref object that will hold the element in .value
```

```
return html`<input ${ref(this.inputRef)}>`;
```

```
}
```

```
firstUpdated() {
```

```
const input = this.inputRef.value!;
```

```
input.focus();
```

```
}
```

```
}
```

```
class MyElement extends LitElement {
  inputRef = createRef();
  render() {    // Passing ref directive a Ref object that will hold the element in .value    return html`<input ${ref(this.inputRef)}>`;  }
  firstUpdated() {    const input = this.inputRef.value!;    input.focus();  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
  inputRef = createRef();
  render() {    // Passing ref directive a Ref object that will hold the element in .value    return html`<input ${ref(this.inputRef)}>`;  }
  firstUpdated() {    const input = this.inputRef.value!;    input.focus();  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
inputRef = createRef();
```

```
render() {
```

```
// Passing ref directive a Ref object that will hold the element in .value
```

```
return html`<input ${ref(this.inputRef)}>`;
```

```
}
```

```
firstUpdated() {
```

```
const input = this.inputRef.value!;
```

```
input.focus();
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
ref
```

```
undefined
```

```
LitElement
```

```
@customElement('my-element')class MyElement extends LitElement {
  render() {    // Passing ref directive a change callback    return html`<input ${ref(this.inputChanged)}>`;  }
  inputChanged(input?: HTMLInputElement) {    input?.focus();  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  render() {    // Passing ref directive a change callback    return html`<input ${ref(this.inputChanged)}>`;  }
  inputChanged(input?: HTMLInputElement) {    input?.focus();  }}
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
// Passing ref directive a change callback
```

```
return html`<input ${ref(this.inputChanged)}>`;
```

```
}
```

```
inputChanged(input?: HTMLInputElement) {
```

```
input?.focus();
```

```
}
```

```
}
```

```
class MyElement extends LitElement {
  render() {    // Passing ref directive a change callback    return html`<input ${ref(this.inputChanged)}>`;  }
  inputChanged(input) {    input?.focus();  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
  render() {    // Passing ref directive a change callback    return html`<input ${ref(this.inputChanged)}>`;  }
  inputChanged(input) {    input?.focus();  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
render() {
```

```
// Passing ref directive a change callback
```

```
return html`<input ${ref(this.inputChanged)}>`;
```

```
}
```

```
inputChanged(input) {
```

```
input?.focus();
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
ref
```

```
import {until} from 'lit/directives/until.js';
```

```
import {until} from 'lit/directives/until.js';
```

```
import {until} from 'lit/directives/until.js';
```

```
until(...values: unknown[])
```

```
until(...values: unknown[])
```

```
until(...values: unknown[])
```

```
@customElement('my-element')class MyElement extends LitElement {
  @state()  private content = fetch('./content.txt').then(r => r.text());
  render() {    return html`${until(this.content, html`<span>Loading...</span>`)}`;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {
  @state()  private content = fetch('./content.txt').then(r => r.text());
  render() {    return html`${until(this.content, html`<span>Loading...</span>`)}`;  }}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@state()
```

```
private content = fetch('./content.txt').then(r => r.text());
```

```
render() {
```

```
return html`${until(this.content, html`<span>Loading...</span>`)}`;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  static properties = {    content: {state: true},  };
  constructor() {    super();    this.content = fetch('./content.txt').then(r => r.text());  }
  render() {    return html`${until(this.content, html`<span>Loading...</span>`)}`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {  static properties = {    content: {state: true},  };
  constructor() {    super();    this.content = fetch('./content.txt').then(r => r.text());  }
  render() {    return html`${until(this.content, html`<span>Loading...</span>`)}`;  }}customElements.define('my-element', MyElement);
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
content: {state: true},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.content = fetch('./content.txt').then(r => r.text());
```

```
}
```

```
render() {
```

```
return html`${until(this.content, html`<span>Loading...</span>`)}`;
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
until
```

```
AsyncIterable
```

```
import {asyncAppend} from 'lit/directives/async-append.js';
```

```
import {asyncAppend} from 'lit/directives/async-append.js';
```

```
import {asyncAppend} from 'lit/directives/async-append.js';
```

```
asyncAppend(  iterable: AsyncIterable<I>,  mapper?: (item: I, index?: number) => unknown)
```

```
asyncAppend(  iterable: AsyncIterable<I>,  mapper?: (item: I, index?: number) => unknown)
```

```
asyncAppend(
```

```
iterable: AsyncIterable<I>,
```

```
mapper?: (item: I, index?: number) => unknown
```

```
)
```

```
asyncAppend
```

```
asyncAppend
```

```
async function *tossCoins(count: number) {  for (let i=0; i<count; i++) {    yield Math.random() > 0.5 ? 'Heads' : 'Tails';    await new Promise((r) => setTimeout(r, 1000));  }}
@customElement('my-element')class MyElement extends LitElement {
  @state()  private tosses = tossCoins(10);
  render() {    return html`      <ul>${asyncAppend(this.tosses, (v: string) => html`<li>${v}</li>`)}</ul>`;  }}
```

```
async function *tossCoins(count: number) {  for (let i=0; i<count; i++) {    yield Math.random() > 0.5 ? 'Heads' : 'Tails';    await new Promise((r) => setTimeout(r, 1000));  }}
@customElement('my-element')class MyElement extends LitElement {
  @state()  private tosses = tossCoins(10);
  render() {    return html`      <ul>${asyncAppend(this.tosses, (v: string) => html`<li>${v}</li>`)}</ul>`;  }}
```

```
async function *tossCoins(count: number) {
```

```
for (let i=0; i<count; i++) {
```

```
yield Math.random() > 0.5 ? 'Heads' : 'Tails';
```

```
await new Promise((r) => setTimeout(r, 1000));
```

```
}
```

```
}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@state()
```

```
private tosses = tossCoins(10);
```

```
render() {
```

```
return html`
```

```
<ul>${asyncAppend(this.tosses, (v: string) => html`<li>${v}</li>`)}</ul>`;
```

```
}
```

```
}
```

```
async function *tossCoins(count) {  for (let i=0; i<count; i++) {    yield Math.random() > 0.5 ? 'Heads' : 'Tails';    await new Promise((r) => setTimeout(r, 1000));  }}
class MyElement extends LitElement {  static properties = {    tosses: {state: true},  };
  constructor() {    super();    this.tosses = tossCoins(10);  }
  render() {    return html`      <ul>${asyncAppend(this.tosses, (v) => html`<li>${v}</li>`)}</ul>`;  }}customElements.define('my-element', MyElement);
```

```
async function *tossCoins(count) {  for (let i=0; i<count; i++) {    yield Math.random() > 0.5 ? 'Heads' : 'Tails';    await new Promise((r) => setTimeout(r, 1000));  }}
class MyElement extends LitElement {  static properties = {    tosses: {state: true},  };
  constructor() {    super();    this.tosses = tossCoins(10);  }
  render() {    return html`      <ul>${asyncAppend(this.tosses, (v) => html`<li>${v}</li>`)}</ul>`;  }}customElements.define('my-element', MyElement);
```

```
async function *tossCoins(count) {
```

```
for (let i=0; i<count; i++) {
```

```
yield Math.random() > 0.5 ? 'Heads' : 'Tails';
```

```
await new Promise((r) => setTimeout(r, 1000));
```

```
}
```

```
}
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
tosses: {state: true},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.tosses = tossCoins(10);
```

```
}
```

```
render() {
```

```
return html`
```

```
<ul>${asyncAppend(this.tosses, (v) => html`<li>${v}</li>`)}</ul>`;
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
asyncAppend
```

```
AsyncIterable
```

```
import {asyncReplace} from 'lit/directives/async-replace.js';
```

```
import {asyncReplace} from 'lit/directives/async-replace.js';
```

```
import {asyncReplace} from 'lit/directives/async-replace.js';
```

```
asyncReplace(  iterable: AsyncIterable<I>,  mapper?: (item: I, index?: number) => unknown)
```

```
asyncReplace(  iterable: AsyncIterable<I>,  mapper?: (item: I, index?: number) => unknown)
```

```
asyncReplace(
```

```
iterable: AsyncIterable<I>,
```

```
mapper?: (item: I, index?: number) => unknown
```

```
)
```

```
asyncAppend
```

```
asyncReplace
```

```
async function *countDown(count: number) {  while (count > 0) {    yield count--;    await new Promise((r) => setTimeout(r, 1000));  }}
@customElement('my-element')class MyElement extends LitElement {
  @state()  private timer = countDown(10);
  render() {    return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;  }}
```

```
async function *countDown(count: number) {  while (count > 0) {    yield count--;    await new Promise((r) => setTimeout(r, 1000));  }}
@customElement('my-element')class MyElement extends LitElement {
  @state()  private timer = countDown(10);
  render() {    return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;  }}
```

```
async function *countDown(count: number) {
```

```
while (count > 0) {
```

```
yield count--;
```

```
await new Promise((r) => setTimeout(r, 1000));
```

```
}
```

```
}
```

```
@customElement('my-element')
```

```
class MyElement extends LitElement {
```

```
@state()
```

```
private timer = countDown(10);
```

```
render() {
```

```
return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;
```

```
}
```

```
}
```

```
async function *countDown(count) {  while (count > 0) {    yield count--;    await new Promise((r) => setTimeout(r, 1000));  }}
class MyElement extends LitElement {  static properties = {    timer: {state: true},  };
  constructor() {    super();    this.timer = countDown(10);  }
  render() {    return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;  }}customElements.define('my-element', MyElement);
```

```
async function *countDown(count) {  while (count > 0) {    yield count--;    await new Promise((r) => setTimeout(r, 1000));  }}
class MyElement extends LitElement {  static properties = {    timer: {state: true},  };
  constructor() {    super();    this.timer = countDown(10);  }
  render() {    return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;  }}customElements.define('my-element', MyElement);
```

```
async function *countDown(count) {
```

```
while (count > 0) {
```

```
yield count--;
```

```
await new Promise((r) => setTimeout(r, 1000));
```

```
}
```

```
}
```

```
class MyElement extends LitElement {
```

```
static properties = {
```

```
timer: {state: true},
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.timer = countDown(10);
```

```
}
```

```
render() {
```

```
return html`Timer: <span>${asyncReplace(this.timer)}</span>.`;
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
asyncReplace
```

