# Directives

A directive that renders the items of an async iterable[1], appending new values after previous values, similar to the built-in support for iterables. This directive is usable only in child expressions.

asyncAppend(value, _mapper?): DirectiveResult<AsyncAppendDirective>

An async iterable

Async iterables are objects with a [Symbol.asyncIterator] method, which returns an iterator who's next() method returns a Promise. When a new value is available, the Promise resolves and the value is appended to the Part controlled by the directive. If another value other than this directive has been set on the Part, the iterable will no longer be listened to and new values won't be written to the Part. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false) on a part that was previously rendered containing the directive (as happens when e.g. a LitElement disconnects from the DOM).

If part.setConnected(true) is subsequently called on a containing part, the directive's reconnected method will be called prior to its next update/render callbacks. When implementing disconnected, reconnected should also be implemented to be compatible with reconnection. Note that updates may occur while the directive is disconnected. As such, directives should generally check the this.isConnected flag during render/update to determine whether it is safe to subscribe to resources that may prevent garbage collection.

The connection state for this Directive.

User callbacks for implementing logic to release any resources/subscriptions that may have been retained by this directive. Since directives may also be re-connected, reconnected should also be implemented to restore the working state of the directive prior to the next render.

Sets the value of the directive's Part outside the normal update/render lifecycle of a directive.

The value to set

This method should not be called synchronously from a directive's update or render.

A directive that renders the items of an async iterable[1], replacing previous values with new values, so that only one value is ever rendered at a time. This directive may be used in any expression type.

asyncReplace(value, _mapper?): DirectiveResult<AsyncReplaceDirective>

An async iterable

Async iterables are objects with a [Symbol.asyncIterator] method, which returns an iterator who's next() method returns a Promise. When a new value is available, the Promise resolves and the value is rendered to the Part controlled by the directive. If another value other than this directive has been set on the Part, the iterable will no longer be listened to and new values won't be written to the Part. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false) on a part that was previously rendered containing the directive (as happens when e.g. a LitElement disconnects from the DOM).

If part.setConnected(true) is subsequently called on a containing part, the directive's reconnected method will be called prior to its next update/render callbacks. When implementing disconnected, reconnected should also be implemented to be compatible with reconnection. Note that updates may occur while the directive is disconnected. As such, directives should generally check the this.isConnected flag during render/update to determine whether it is safe to subscribe to resources that may prevent garbage collection.

The connection state for this Directive.

User callbacks for implementing logic to release any resources/subscriptions that may have been retained by this directive. Since directives may also be re-connected, reconnected should also be implemented to restore the working state of the directive prior to the next render.

Sets the value of the directive's Part outside the normal update/render lifecycle of a directive.

The value to set

This method should not be called synchronously from a directive's update or render.

Enables fast switching between multiple templates by caching the DOM nodes and TemplateInstances produced by the templates.

cache(v): DirectiveResult<CacheDirective>

Example:

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Chooses and evaluates a template function from a list based on matching the given value to a case.

choose(value, cases, defaultCase?): undefined | V

Cases are structured as [caseValue, func]. value is matched to caseValue by strict equality. The first match is selected. Case values can be of any type including primitives, objects, and symbols. This is similar to a switch statement, but as an expression and without fallthrough.

A directive that applies dynamic CSS classes.

classMap(classInfo): DirectiveResult<ClassMapDirective>

This must be used in the class attribute and must be the only part used in the attribute. It takes each property in the classInfo argument and adds the property name to the element's classList if the property value is truthy; if the property value is falsey, the property name is removed from the element's class. For example {foo: bar} applies the class foo if the value of bar is truthy.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

A key-value set of class names to truthy values.

Prevents re-render of a template function until a single value or an array of values changes.

guard(_value, f): DirectiveResult<GuardDirective>

the template function

Values are checked against previous values with strict equality (===), and so the check won't detect nested property changes inside objects or arrays. Arrays values have each item checked against the previous value at the same index with strict equality. Nested arrays are also checked only by strict equality. Example:

In this case, the template only rerenders if either user.id or company.id changes. guard() is useful with immutable data patterns, by preventing expensive work until data updates. Example:

In this case, items are mapped over only when the array reference changes.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

For AttributeParts, sets the attribute if the value is defined and removes the attribute if the value is undefined.

ifDefined(value): nothing | NonNullable<T>

For other part types, this directive is a no-op.

Returns an iterable containing the values in items interleaved with the joiner value.

join(items, joiner): Iterable<I | J>

Associates a renderable value with a unique key. When the key changes, the previous DOM is removed and disposed before rendering the next value, even if the value - such as a template - is the same.

keyed(k, v): DirectiveResult<Keyed>

This is useful for forcing re-renders of stateful components, or working with code that expects new data to generate new HTML elements, such as some animation techniques.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Checks binding values against live DOM values, instead of previously bound values, when determining whether to update the value.

live(value): DirectiveResult<LiveDirective>

This is useful for cases where the DOM value may change from outside of lit-html, such as with a binding to an <input> element's value property, a content editable elements text, or to a custom element that changes it's own properties or attributes. In these cases if the DOM value changes, but the value set through lit-html bindings hasn't, lit-html won't know to update the DOM value and will leave it alone. If this is not what you want--if you want to overwrite the DOM value with the bound value no matter what--use the live() directive:

live() performs a strict equality check against the live DOM value, and if the new value is equal to the live value, does nothing. This means that live() should not be used when the binding will cause a type conversion. If you use live() with an attribute binding, make sure that only strings are passed in, or the binding will update every render.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Returns an iterable containing the result of calling f(value) on each value in items.

map(items, f): Generator<unknown, void, unknown>

Returns an iterable of integers from start to end (exclusive) incrementing by step.

range(end): Iterable<number>

If start is omitted, the range starts at 0. step defaults to 1.

Creates a new Ref object, which is container for a reference to an element.

createRef(): Ref<T>

Sets the value of a Ref object or calls a ref callback with the element it's bound to.

ref(_ref): DirectiveResult<RefDirective>

A Ref object acts as a container for a reference to an element. A ref callback is a function that takes an element as its only argument. The ref directive sets the value of the Ref object or calls the ref callback during rendering, if the referenced element changed. Note: If a ref callback is rendered to a different element position or is removed in a subsequent render, it will first be called with undefined, followed by another call with the new element it was rendered to (if any).

An object that holds a ref value.

The current Element value of the ref, or else undefined if the ref is no longer rendered.

An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false) on a part that was previously rendered containing the directive (as happens when e.g. a LitElement disconnects from the DOM).

If part.setConnected(true) is subsequently called on a containing part, the directive's reconnected method will be called prior to its next update/render callbacks. When implementing disconnected, reconnected should also be implemented to be compatible with reconnection. Note that updates may occur while the directive is disconnected. As such, directives should generally check the this.isConnected flag during render/update to determine whether it is safe to subscribe to resources that may prevent garbage collection.

The connection state for this Directive.

User callbacks for implementing logic to release any resources/subscriptions that may have been retained by this directive. Since directives may also be re-connected, reconnected should also be implemented to restore the working state of the directive prior to the next render.

Sets the value of the directive's Part outside the normal update/render lifecycle of a directive.

The value to set

This method should not be called synchronously from a directive's update or render.

A directive that repeats a series of values (usually TemplateResults) generated from an iterable, and updates those items efficiently when the iterable changes based on user-provided keys associated with each item.

repeat(items, keyFnOrTemplate, template?): unknown

Note that if a keyFn is provided, strict key-to-DOM mapping is maintained, meaning previous DOM for a given key is moved into the new position if needed, and DOM will never be reused with values for different keys (new DOM will always be created for new keys). This is generally the most efficient way to use repeat since it performs minimum unnecessary work for insertions and removals. The keyFn takes two parameters, the item and its index, and returns a unique key value.

Important: If providing a keyFn, keys must be unique for all items in a given call to repeat. The behavior when two or more items have the same key is undefined. If no keyFn is provided, this directive will perform similar to mapping items to values, and DOM will be reused against potentially different items.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

RepeatDirectiveFn(items, keyFnOrTemplate, template?): unknown

A directive that applies CSS properties to an element.

styleMap(styleInfo): DirectiveResult<StyleMapDirective>

styleMap can only be used in the style attribute and must be the only expression in the attribute. It takes the property names in the styleInfo object and adds the properties to the inline style of the element. Property names with dashes (-) are assumed to be valid CSS property names and set on the element's style object using setProperty(). Names without dashes are assumed to be camelCased JavaScript property names and set on the element's style object using property assignment, allowing the style object to translate JavaScript-style names to CSS property names. For example styleMap({backgroundColor: 'red', 'border-top': '5px', '--size': '0'}) sets the background-color, border-top and --size properties.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

A key-value set of CSS properties and values.

The key should be either a valid CSS property name string, like 'background-color', or a valid JavaScript camel case property name for CSSStyleDeclaration like backgroundColor.

Renders the content of a template element as HTML.

templateContent(template): DirectiveResult<TemplateContentDirective>

Note, the template should be developer controlled and not user controlled. Rendering a user-controlled template with this directive could lead to cross-site-scripting vulnerabilities.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Renders the result as HTML, rather than text.

unsafeHTML(value): DirectiveResult<UnsafeHTMLDirective>

The values undefined, null, and nothing, will all result in no content (empty string) being rendered. Note, this is unsafe to use with any user-provided input that hasn't been sanitized or escaped, as it may lead to cross-site-scripting vulnerabilities.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Renders the result as SVG, rather than text.

unsafeSVG(value): DirectiveResult<UnsafeSVGDirective>

The values undefined, null, and nothing, will all result in no content (empty string) being rendered. Note, this is unsafe to use with any user-provided input that hasn't been sanitized or escaped, as it may lead to cross-site-scripting vulnerabilities.

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

Renders one of a series of values, including Promises, to a Part.

until(values): DirectiveResult<UntilDirective>

Values are rendered in priority order, with the first argument having the highest priority and the last argument having the lowest priority. If a value is a Promise, low-priority values will be rendered until it resolves. The priority of values can be used to create placeholder content for async data. For example, a Promise with pending content can be the first, highest-priority, argument, and a non_promise loading indicator template can be used as the second, lower-priority, argument. The loading indicator will render immediately, and the primary content will render when the Promise resolves. Example:

An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false) on a part that was previously rendered containing the directive (as happens when e.g. a LitElement disconnects from the DOM).

If part.setConnected(true) is subsequently called on a containing part, the directive's reconnected method will be called prior to its next update/render callbacks. When implementing disconnected, reconnected should also be implemented to be compatible with reconnection. Note that updates may occur while the directive is disconnected. As such, directives should generally check the this.isConnected flag during render/update to determine whether it is safe to subscribe to resources that may prevent garbage collection.

The connection state for this Directive.

User callbacks for implementing logic to release any resources/subscriptions that may have been retained by this directive. Since directives may also be re-connected, reconnected should also be implemented to restore the working state of the directive prior to the next render.

Sets the value of the directive's Part outside the normal update/render lifecycle of a directive.

The value to set

This method should not be called synchronously from a directive's update or render.

When condition is true, returns the result of calling trueCase(), else returns the result of calling falseCase() if falseCase is defined.

when(condition, trueCase, falseCase?): T

This is a convenience wrapper around a ternary expression that makes it a little nicer to write an inline conditional without an else.


1. asyncAppend
2. asyncReplace
3. cache
4. choose
5. classMap
6. guard
7. ifDefined
8. join
9. keyed
10. live
11. map
12. range
13. createRef
14. ref
15. repeat
16. styleMap
17. templateContent
18. unsafeHTML
19. unsafeSVG
20. until
21. when

```
import { asyncAppend } from 'lit/directives/async-append.js';
```

```
asyncAppend(value, _mapper?): DirectiveResult<AsyncAppendDirective>
```

```
AsyncIterable<unknown>
```

```
(v: unknown, index?: number) => unknown
```

```
next()
```

```
Directive
```

```
disconnected
```

```
part.setConnected(false)
```

```
import { AsyncAppendDirective } from 'lit/directives/async-append.js';
```

```
part.setConnected(true)
```

```
reconnected
```

```
update
```

```
render
```

```
disconnected
```

```
reconnected
```

```
this.isConnected
```

```
PartInfo
```

```
unknown
```

```
number
```

```
reconnected
```

```
AsyncIterable<T>
```

```
Mapper<T>
```

```
update
```

```
render
```

```
unknown
```

```
update
```

```
render
```

```
ChildPart
```

```
[value, _mapper]
```

```
import { asyncReplace } from 'lit/directives/async-replace.js';
```

```
asyncReplace(value, _mapper?): DirectiveResult<AsyncReplaceDirective>
```

```
AsyncIterable<unknown>
```

```
Mapper<unknown>
```

```
[Symbol.asyncIterator]
```

```
next()
```

```
Directive
```

```
disconnected
```

```
part.setConnected(false)
```

```
import { AsyncReplaceDirective } from 'lit/directives/async-replace.js';
```

```
part.setConnected(true)
```

```
reconnected
```

```
update
```

```
render
```

```
disconnected
```

```
reconnected
```

```
this.isConnected
```

```
PartInfo
```

```
unknown
```

```
number
```

```
reconnected
```

```
AsyncIterable<T>
```

```
Mapper<T>
```

```
update
```

```
render
```

```
unknown
```

```
update
```

```
render
```

```
ChildPart
```

```
[value, _mapper]
```

```
import { cache } from 'lit/directives/cache.js';
```

```
cache(v): DirectiveResult<CacheDirective>
```

```
unknown
```

```
let checked = false;html`  ${cache(checked ? html`input is checked` : html`input is not checked`)}`
```

```
let checked = false;html`  ${cache(checked ? html`input is checked` : html`input is not checked`)}`
```

```
let checked = false;
```

```
html`
```

```
${cache(checked ? html`input is checked` : html`input is not checked`)}
```

```
`
```

```
render
```

```
update
```

```
directive
```

```
import { CacheDirective } from 'lit/directives/cache.js';
```

```
PartInfo
```

```
unknown
```

```
ChildPart
```

```
[v]
```

```
value
```

```
import { choose } from 'lit/directives/choose.js';
```

```
choose(value, cases, defaultCase?): undefined | V
```

```
T
```

```
Array<[T, () => V]>
```

```
() => V
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
import { classMap } from 'lit/directives/class-map.js';
```

```
classMap(classInfo): DirectiveResult<ClassMapDirective>
```

```
ClassInfo
```

```
class
```

```
classInfo
```

```
classList
```

```
class
```

```
{foo: bar}
```

```
foo
```

```
bar
```

```
render
```

```
update
```

```
directive
```

```
import { ClassMapDirective } from 'lit/directives/class-map.js';
```

```
PartInfo
```

```
ClassInfo
```

```
AttributePart
```

```
[classInfo]
```

```
import { ClassInfo } from 'lit/directives/class-map.js';
```

```
import { guard } from 'lit/directives/guard.js';
```

```
guard(_value, f): DirectiveResult<GuardDirective>
```

```
unknown
```

```
() => unknown
```

```
===
```

```
html`  <div>    ${guard([user.id, company.id], () => html`...`)}  </div>`
```

```
html`  <div>    ${guard([user.id, company.id], () => html`...`)}  </div>`
```

```
html`
```

```
<div>
```

```
${guard([user.id, company.id], () => html`...`)}
```

```
</div>
```

```
`
```

```
user.id
```

```
company.id
```

```
html`  <div>    ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}  </div>`
```

```
html`  <div>    ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}  </div>`
```

```
html`
```

```
<div>
```

```
${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}
```

```
</div>
```

```
`
```

```
render
```

```
update
```

```
directive
```

```
import { GuardDirective } from 'lit/directives/guard.js';
```

```
PartInfo
```

```
unknown
```

```
() => unknown
```

```
Part
```

```
[_value, f]
```

```
import { ifDefined } from 'lit/directives/if-defined.js';
```

```
ifDefined(value): nothing | NonNullable<T>
```

```
T
```

```
items
```

```
joiner
```

```
import { join } from 'lit/directives/join.js';
```

```
join(items, joiner): Iterable<I | J>
```

```
undefined | Iterable<I>
```

```
(index: number) => J
```

```
import { keyed } from 'lit/directives/keyed.js';
```

```
keyed(k, v): DirectiveResult<Keyed>
```

```
unknown
```

```
unknown
```

```
render
```

```
update
```

```
directive
```

```
import { Keyed } from 'lit/directives/keyed.js';
```

```
PartInfo
```

```
unknown
```

```
unknown
```

```
ChildPart
```

```
[k, v]
```

```
import { live } from 'lit/directives/live.js';
```

```
live(value): DirectiveResult<LiveDirective>
```

```
unknown
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
html`<input .value=${live(x)}>`
```

```
html`<input .value=${live(x)}>`
```

```
html`<input .value=${live(x)}>`
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
render
```

```
update
```

```
directive
```

```
import { LiveDirective } from 'lit/directives/live.js';
```

```
PartInfo
```

```
unknown
```

```
AttributePart
```

```
[value]
```

```
f(value)
```

```
items
```

```
import { map } from 'lit/directives/map.js';
```

```
map(items, f): Generator<unknown, void, unknown>
```

```
undefined | Iterable<T>
```

```
(value: T, index: number) => unknown
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
import { range } from 'lit/directives/range.js';
```

```
range(end): Iterable<number>
```

```
number
```

```
start
```

```
0
```

```
step
```

```
1
```

```
import { createRef } from 'lit/directives/ref.js';
```

```
createRef(): Ref<T>
```

```
import { ref } from 'lit/directives/ref.js';
```

```
ref(_ref): DirectiveResult<RefDirective>
```

```
RefOrCallback
```

```
undefined
```

```
// Using Ref objectconst inputRef = createRef();render(html`<input ${ref(inputRef)}>`, container);inputRef.value.focus();// Using callbackconst callback = (inputElement) => inputElement.focus();render(html`<input ${ref(callback)}>`, container);
```

```
// Using Ref objectconst inputRef = createRef();render(html`<input ${ref(inputRef)}>`, container);inputRef.value.focus();// Using callbackconst callback = (inputElement) => inputElement.focus();render(html`<input ${ref(callback)}>`, container);
```

```
// Using Ref object
```

```
const inputRef = createRef();
```

```
render(html`<input ${ref(inputRef)}>`, container);
```

```
inputRef.value.focus();
```

```
// Using callback
```

```
const callback = (inputElement) => inputElement.focus();
```

```
render(html`<input ${ref(callback)}>`, container);
```

```
import { Ref } from 'lit/directives/ref.js';
```

```
undefined
```

```
Directive
```

```
disconnected
```

```
part.setConnected(false)
```

```
import { RefDirective } from 'lit/directives/ref.js';
```

```
part.setConnected(true)
```

```
reconnected
```

```
update
```

```
render
```

```
disconnected
```

```
reconnected
```

```
this.isConnected
```

```
PartInfo
```

```
reconnected
```

```
RefOrCallback
```

```
update
```

```
render
```

```
unknown
```

```
update
```

```
render
```

```
ElementPart
```

```
[_ref]
```

```
import { RefOrCallback } from 'lit/directives/ref.js';
```

```
Ref | (el: MDN Element | undefined) => void
```

```
TemplateResults
```

```
keys
```

```
import { repeat } from 'lit/directives/repeat.js';
```

```
repeat(items, keyFnOrTemplate, template?): unknown
```

```
Iterable<T>
```

```
KeyFn<T> | ItemTemplate<T>
```

```
ItemTemplate<T>
```

```
keyFn
```

```
repeat
```

```
keyFn
```

```
html`  <ol>    ${repeat(this.items, (item) => item.id, (item, index) => {      return html`<li>${index}: ${item.name}</li>`;    })}  </ol>`
```

```
html`  <ol>    ${repeat(this.items, (item) => item.id, (item, index) => {      return html`<li>${index}: ${item.name}</li>`;    })}  </ol>`
```

```
html`
```

```
<ol>
```

```
${repeat(this.items, (item) => item.id, (item, index) => {
```

```
return html`<li>${index}: ${item.name}</li>`;
```

```
})}
```

```
</ol>
```

```
`
```

```
keyFn
```

```
repeat
```

```
keyFn
```

```
render
```

```
update
```

```
directive
```

```
import { RepeatDirective } from 'lit/directives/repeat.js';
```

```
PartInfo
```

```
Iterable<T>
```

```
ItemTemplate<T>
```

```
ChildPart
```

```
[Iterable<T>, KeyFn<T> | ItemTemplate<T>, ItemTemplate<T>]
```

```
import { ItemTemplate } from 'lit/directives/repeat.js';
```

```
(item: T, index: number) => unknown
```

```
import { KeyFn } from 'lit/directives/repeat.js';
```

```
(item: T, index: number) => unknown
```

```
import { RepeatDirectiveFn } from 'lit/directives/repeat.js';
```

```
RepeatDirectiveFn(items, keyFnOrTemplate, template?): unknown
```

```
Iterable<T>
```

```
KeyFn<T> | ItemTemplate<T>
```

```
ItemTemplate<T>
```

```
import { styleMap } from 'lit/directives/style-map.js';
```

```
styleMap(styleInfo): DirectiveResult<StyleMapDirective>
```

```
Readonly<StyleInfo>
```

```
styleMap
```

```
style
```

```
-
```

```
setProperty()
```

```
styleMap({backgroundColor: 'red', 'border-top': '5px', '--size': '0'})
```

```
background-color
```

```
border-top
```

```
--size
```

```
render
```

```
update
```

```
directive
```

```
import { StyleMapDirective } from 'lit/directives/style-map.js';
```

```
PartInfo
```

```
Readonly<StyleInfo>
```

```
AttributePart
```

```
[styleInfo]
```

```
import { StyleInfo } from 'lit/directives/style-map.js';
```

```
'background-color'
```

```
backgroundColor
```

```
import { templateContent } from 'lit/directives/template-content.js';
```

```
templateContent(template): DirectiveResult<TemplateContentDirective>
```

```
MDN HTMLTemplateElement
```

```
render
```

```
update
```

```
directive
```

```
import { TemplateContentDirective } from 'lit/directives/template-content.js';
```

```
PartInfo
```

```
MDN HTMLTemplateElement
```

```
Part
```

```
Array<unknown>
```

```
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
```

```
unsafeHTML(value): DirectiveResult<UnsafeHTMLDirective>
```

```
undefined | null | string | noChange | nothing
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
render
```

```
update
```

```
directive
```

```
import { UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';
```

```
PartInfo
```

```
undefined | null | string | noChange | nothing
```

```
Part
```

```
Array<unknown>
```

```
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
```

```
unsafeSVG(value): DirectiveResult<UnsafeSVGDirective>
```

```
undefined | null | string | noChange | nothing
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
render
```

```
update
```

```
directive
```

```
import { UnsafeSVGDirective } from 'lit/directives/unsafe-svg.js';
```

```
PartInfo
```

```
undefined | null | string | noChange | nothing
```

```
Part
```

```
Array<unknown>
```

```
import { until } from 'lit/directives/until.js';
```

```
until(values): DirectiveResult<UntilDirective>
```

```
Array<unknown>
```

```
const content = fetch('./content.txt').then(r => r.text());html`${until(content, html`<span>Loading...</span>`)}`
```

```
const content = fetch('./content.txt').then(r => r.text());html`${until(content, html`<span>Loading...</span>`)}`
```

```
const content = fetch('./content.txt').then(r => r.text());
```

```
html`${until(content, html`<span>Loading...</span>`)}`
```

```
Directive
```

```
disconnected
```

```
part.setConnected(false)
```

```
import { UntilDirective } from 'lit/directives/until.js';
```

```
part.setConnected(true)
```

```
reconnected
```

```
update
```

```
render
```

```
disconnected
```

```
reconnected
```

```
this.isConnected
```

```
PartInfo
```

```
reconnected
```

```
Array<unknown>
```

```
update
```

```
render
```

```
unknown
```

```
update
```

```
render
```

```
Part
```

```
Array<unknown>
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
import { when } from 'lit/directives/when.js';
```

```
when(condition, trueCase, falseCase?): T
```

```
true
```

```
() => T
```

```
() => F
```

