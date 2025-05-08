# Expressions

Lit templates can include dynamic values called expressions. An expression can be any JavaScript expression. The expression is evaluated when the template is evaluated, and the result of the expression is included when the template renders. In a Lit component, this means whenever the render method is called.

Expressions can only be placed in specific locations in the template, and how an expression is interpreted depends on where it appears. Expressions inside the element tag itself affect the element. Expressions inside the element's content, where child nodes go, render child nodes or text.

Valid values for expressions differ based on where the expression occurs. Generally all expressions accept primitive values like strings and numbers, and some expressions support additional value types. In addition, all expressions can accept directives, which are special functions that customize the way an expression is processed and rendered. See Custom directives for more information.

Here's a quick reference followed by more detailed information about each expression type.

Child nodes

Attributes

Boolean Attributes

Properties

Event listeners

Element directives

This basic example shows a variety of different kinds of expressions.



The following sections describe each kind of expression in more detail. For more information about the structure of templates, see Well-formed HTML and Valid expression locations.

An expression that occurs between the start and end tags of an element can add child nodes to the element. For example:

Or:

Expressions in the child position can take many kinds of values:

Lit can render almost all primitive values and converts them to strings when interpolated into text content.

Numbers values like 5 will render the string '5'. Bigints are treated similarly.

A boolean value true will render 'true', and false will render 'false', but rendering a boolean like this is uncommon. Instead booleans are typically used in conditionals to render other appropriate values. For more on conditionals, see Conditionals.

The empty string '', null, and undefined are specially treated and render nothing. See Removing child content for more information.

Symbol values cannot be converted to strings and throw when placed in child expressions.

Lit supplies a couple of special sentinel values that can be used in child expressions.

The noChange sentinel value does not change the expression's existing value. It is typically used in custom directives. See Signaling no change for more information.

The nothing sentinel renders nothing. See Removing child content for more information.

Since an expression in the child position can return a TemplateResult, you can nest and compose templates:

This means you can use plain JavaScript to create conditional templates, repeating templates, and more.

For more on conditionals, see Conditionals.

For more on using JavaScript to create repeating templates, see Lists.

Any DOM node can be passed to a child expression. Typically DOM nodes should be rendered by specifying a template using html, but a DOM node can be directly rendered like this when needed. The node is attached to the DOM tree at that point, and so removed from any current parent:

An expression can also return an array or iterable of any of the supported types, in any combination. You can use this feature along with standard JavaScript like the Array map method to create repeating templates and lists. For examples, see Lists.

The values null, undefined, the empty string '', and Lit's nothing sentinel value remove any previously rendered content and render no node.

Setting or removing child content is often done based on a condition. See Conditionally rendering nothing for more information.

Rendering no node can be important when an expression is a child of an element with Shadow DOM that includes a slot with fallback content. Rendering no node ensures the fallback content is rendered. See fallback content for more information.

In addition to using expressions to add child nodes, you can use them to set an elements's attributes and properties, too.

By default, an expression in the value of an attribute sets the attribute:

Since attribute values are always strings, the expression should return a value that can be converted into a string.

If the expression makes up the entire attribute value, you can leave off the quotes. If the expression makes up only part of the attribute value, you need to quote the entire value:

Note, some primitive values are handled specially in attributes. Boolean values are converted to strings so, for example, false renders 'false'. Both undefined and null render to an attribute as an empty string.

To set a boolean attribute, use the ? prefix with the attribute name. The attribute is added if the expression evaluates to a truthy value, removed if it evaluates to a falsy value:

Sometimes you want to set an attribute only under certain conditions, and otherwise remove the attribute. For common "boolean attributes" like disabled and hidden where you want to set the attribute to an empty string for a truthy value and remove it otherwise, use a boolean attribute. Sometimes, however, you might require a different condition for adding or removing an attribute.

For example, consider:

If this.imagePath or this.imageFile is not defined, the src attribute should not be set or an invalid network request will occur.

Lit's nothing sentinel value addresses this by removing the attribute when any expression in the attribute value evaluates to nothing.

In this example both the this.imagePath and this.imageFile properties must be defined for the src attribute to be set. The ?? nullish coalescing operator returns the right-hand value if the left-hand value is null or undefined.

Lit also provides an ifDefined directive which is sugar for value ?? nothing.

You might also want to remove the attribute if the value is not truthy so that values of false or empty string '' remove the attribute. For example, consider an element that has default value for this.ariaLabel of empty string '':

In this example the aria-label attribute is rendered only if this.ariaLabel is not an empty string.

Setting or removing an attribute is often done based on a condition. See Conditionally rendering nothing for more information.

You can set a JavaScript property on an element using the . prefix and the property name:

The behavior of the code above is the same as directly setting the value property on the input element, e.g.:

You can use the property expression syntax to pass complex data down the tree to subcomponents. For example, if you have a my-list component with a listItems property, you could pass it an array of objects:

Note that the property name in this example—listItems—is mixed case. Although HTML attributes are case-insensitive, Lit preserves the case for property names when it processes the template.

For more information about component properties, see Reactive properties.

Templates can also include declarative event listeners. Use the prefix @ followed by the event name. The expression should evaluate to an event listener.

This is similar to calling addEventListener('click', this.clickHandler) on the button element.

The event listener can be either a plain function, or an object with a handleEvent method — the same as the listener argument to the standard addEventListener method.

In a Lit component, the event listener is automatically bound to the component, so you can use the this value inside the handler to refer to the component instance.

For more information about component events, see Events.

You can also add an expression that accesses an element instance, instead of a single property or attribute on an element:

Element expressions only work with directives. Any other value type in an element expression is ignored.

One built-in directive that can be used in an element expression is the ref directive. It provides a reference to the rendered element.

See ref for more information.

Lit templates must be well-formed HTML. The templates are parsed by the browser's built-in HTML parser before any values are interpolated. Follow these rules for well-formed templates:

Templates must be well-formed HTML when all expressions are replaced by empty values.

Templates can have multiple top-level elements and text.

Templates should not contain unclosed elements—they will be closed by the HTML parser.

Because the browser's built-in parser is very lenient, most cases of malformed templates are not detectable at runtime, so you won't see warnings—just templates that don't behave as you expect. We recommend using linting tools and IDE plugins to find issues in your templates during development.

Expressions can only occur where you can place attribute values and child elements in HTML.

Element expressions can occur inside the opening tag after the tag name:

Expressions should generally not appear in the following locations:

Where tag or attribute names would appear. Lit does not support dynamically changing values in this position and will error in development mode.

Inside <template> element content (attribute expressions on the template element itself are allowed). Lit does not recurse into template content to dynamically update expressions and will error in development mode.

Inside <textarea> element content (attribute expressions on the textarea element itself are allowed). Note that Lit can render content into textarea, however editing the textarea will break references to the DOM that Lit uses to dynamically update, and Lit will warn in development mode. Instead, bind to the .value property of textarea.

Similarly, inside elements with the contenteditable attribute. Instead, bind to the .innerText property of the element.

Inside HTML comments. Lit will not update expressions in comments, and the expressions will instead be rendered with a Lit token string. However, this will not break subsequent expressions, so commenting out blocks of HTML during development that may contain expressions is safe.

Inside <style> elements when using the ShadyCSS polyfill. See Expressions and style elements for more details.

Note that expressions in all the invalid cases above are valid when using static expressions, although these should not be used for performance-sensitive updates due to the inefficiencies involved (see below).

Static expressions return special values that are interpolated into the template before the template is processed as HTML by Lit. Because they become part of the template's static HTML, they can be placed anywhere in the template - even where expressions would normally be disallowed, such as in attribute and tag names.

To use static expressions, you must import a special version of the html or svg template tags from Lit's static-html module:

The static-html module contains html and svg tag functions which support static expressions and should be used instead of the standard versions provided in the lit module. Use the literal tag function to create static expressions.

You can use static expressions for configuration options that are unlikely to change or for customizing parts of the template you cannot with normal expressions - see the section on Valid expression locations for details. For example, a my-button component might render a <button> tag, but a subclass might render an <a> tag, instead. This is a good place to use a static expression because the setting does not change frequently and customizing an HTML tag cannot be done with a normal expression.

Changing the value of static expressions is expensive. Expressions using literal values should not change frequently, as they cause a new template to be re-parsed and each variation is held in memory.

In the example above, if the template re-renders and this.caption or this.active change, Lit updates the template efficiently, only changing the affected expressions. However, if this.tag or this.activeAttribute change, since they are static values tagged with literal, an entirely new template is created; the update is inefficient since the DOM is completely re-rendered. In addition, changing literal values passed to expressions increases memory use since each unique template is cached in memory to improve re-render performance.

For these reasons, it's a good idea keep changes to expressions using literal to a minimum and avoid using reactive properties to change literal values, since reactive properties are intended to change.

After static values have been interpolated, the template must be well-formed like normal Lit templates, otherwise the dynamic expressions in the template might not function properly. See the Well-formed HTML section for more information.

In rare cases, you may need to interpolate static HTML into a template that is not defined in your script, and thus cannot be tagged with the literal function. For these cases, the unsafeStatic() function can be used to create static HTML based on strings from non-script sources.

Only for trusted content. Note the use of unsafe in unsafeStatic(). The string passed to unsafeStatic() must be developer-controlled and not include untrusted content, because it will be parsed directly as HTML with no sanitization. Examples of untrusted content include query string parameters and values from user inputs. Untrusted content rendered with this directive could lead to cross-site scripting (XSS) vulnerabilities.

Note that the behavior of using unsafeStatic carries the same caveats as literal: because changing values causes a new template to be parsed and cached in memory, they should not change frequently.


1. Child expressionsPrimitive valuesSentinel valuesTemplatesDOM nodesArrays or iterables of any of the supported typesRemoving child content
2. Primitive values
3. Sentinel values
4. Templates
5. DOM nodes
6. Arrays or iterables of any of the supported types
7. Removing child content
8. Attribute expressionsBoolean attributesRemoving an attribute
9. Boolean attributes
10. Removing an attribute
11. Property expressions
12. Event listener expressions
13. Element expressions
14. Well-formed HTML
15. Valid expression locationsInvalid locations
16. Invalid locations
17. Static expressionsTemplate structureNon-literal statics
18. Template structure
19. Non-literal statics


1. Primitive values
2. Sentinel values
3. Templates
4. DOM nodes
5. Arrays or iterables of any of the supported types
6. Removing child content


1. Boolean attributes
2. Removing an attribute


1. Invalid locations


1. Template structure
2. Non-literal statics


* Primitive values likes strings, numbers, and booleans.
* TemplateResult objects created with the html function (or the svg function, if the expression is inside an <svg> element).
* DOM nodes.
* The sentinel values nothing and noChange.
* Arrays or iterables of any of the supported types.


* Templates must be well-formed HTML when all expressions are replaced by empty values. 
* Templates can have multiple top-level elements and text. 
* Templates should not contain unclosed elements—they will be closed by the HTML parser. 


* Where tag or attribute names would appear. Lit does not support dynamically changing values in this position and will error in development mode. 
* Inside <template> element content (attribute expressions on the template element itself are allowed). Lit does not recurse into template content to dynamically update expressions and will error in development mode. 
* Inside <textarea> element content (attribute expressions on the textarea element itself are allowed). Note that Lit can render content into textarea, however editing the textarea will break references to the DOM that Lit uses to dynamically update, and Lit will warn in development mode. Instead, bind to the .value property of textarea. 
* Similarly, inside elements with the contenteditable attribute. Instead, bind to the .innerText property of the element. 
* Inside HTML comments. Lit will not update expressions in comments, and the expressions will instead be rendered with a Lit token string. However, this will not break subsequent expressions, so commenting out blocks of HTML during development that may contain expressions is safe. 
* Inside <style> elements when using the ShadyCSS polyfill. See Expressions and style elements for more details. 

```
render
```

```
html`<h1>Hello ${name}</h1><ul>  ${listItems}</ul>`
```

```
html`<h1>Hello ${name}</h1><ul>  ${listItems}</ul>`
```

```
html`
```

```
<h1>Hello ${name}</h1>
```

```
<ul>
```

```
${listItems}
```

```
</ul>`
```

```
html`<div class=${highlightClass}></div>`
```

```
html`<div class=${highlightClass}></div>`
```

```
html`<div class=${highlightClass}></div>`
```

```
html`<div ?hidden=${!show}></div>`
```

```
html`<div ?hidden=${!show}></div>`
```

```
html`<div ?hidden=${!show}></div>`
```

```
html`<input .value=${value}>`
```

```
html`<input .value=${value}>`
```

```
html`<input .value=${value}>`
```

```
html`<button @click=${this._clickHandler}>Go</button>`
```

```
html`<button @click=${this._clickHandler}>Go</button>`
```

```
html`<button @click=${this._clickHandler}>Go</button>`
```

```
html`<input ${ref(inputRef)}>`
```

```
html`<input ${ref(inputRef)}>`
```

```
html`<input ${ref(inputRef)}>`
```

```
html`<p>Hello, ${name}</p>`
```

```
html`<p>Hello, ${name}</p>`
```

```
html`<p>Hello, ${name}</p>`
```

```
html`<main>${bodyText}</main>`
```

```
html`<main>${bodyText}</main>`
```

```
html`<main>${bodyText}</main>`
```

```
TemplateResult
```

```
html
```

```
svg
```

```
<svg>
```

```
nothing
```

```
noChange
```

```
5
```

```
'5'
```

```
true
```

```
'true'
```

```
false
```

```
'false'
```

```
''
```

```
null
```

```
undefined
```

```
noChange
```

```
nothing
```

```
TemplateResult
```

```
const nav = html`<nav>...</nav>`;const page = html`  ${nav}  <main>...</main>`;
```

```
const nav = html`<nav>...</nav>`;const page = html`  ${nav}  <main>...</main>`;
```

```
const nav = html`<nav>...</nav>`;
```

```
const page = html`
```

```
${nav}
```

```
<main>...</main>
```

```
`;
```

```
html`  ${this.user.isloggedIn      ? html`Welcome ${this.user.name}`      : html`Please log in`  }`;
```

```
html`  ${this.user.isloggedIn      ? html`Welcome ${this.user.name}`      : html`Please log in`  }`;
```

```
html`
```

```
${this.user.isloggedIn
```

```
? html`Welcome ${this.user.name}`
```

```
: html`Please log in`
```

```
}
```

```
`;
```

```
html
```

```
const div = document.createElement('div');const page = html`  ${div}  <p>This is some text</p>`;
```

```
const div = document.createElement('div');const page = html`  ${div}  <p>This is some text</p>`;
```

```
const div = document.createElement('div');
```

```
const page = html`
```

```
${div}
```

```
<p>This is some text</p>
```

```
`;
```

```
map
```

```
null
```

```
undefined
```

```
''
```

```
slot
```

```
html`<div class=${this.textClass}>Stylish text.</div>`;
```

```
html`<div class=${this.textClass}>Stylish text.</div>`;
```

```
html`<div class=${this.textClass}>Stylish text.</div>`;
```

```
html`<img src="/images/${this.image}">`;
```

```
html`<img src="/images/${this.image}">`;
```

```
html`<img src="/images/${this.image}">`;
```

```
false
```

```
'false'
```

```
undefined
```

```
null
```

```
?
```

```
html`<div ?hidden=${!this.showAdditional}>This text may be hidden.</div>`;
```

```
html`<div ?hidden=${!this.showAdditional}>This text may be hidden.</div>`;
```

```
html`<div ?hidden=${!this.showAdditional}>This text may be hidden.</div>`;
```

```
disabled
```

```
hidden
```

```
html`<img src="/images/${this.imagePath}/${this.imageFile}">`;
```

```
html`<img src="/images/${this.imagePath}/${this.imageFile}">`;
```

```
html`<img src="/images/${this.imagePath}/${this.imageFile}">`;
```

```
this.imagePath
```

```
this.imageFile
```

```
src
```

```
nothing
```

```
html`<img src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}">`;
```

```
html`<img src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}">`;
```

```
html`<img src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}">`;
```

```
this.imagePath
```

```
this.imageFile
```

```
src
```

```
??
```

```
null
```

```
undefined
```

```
value ?? nothing
```

```
html`<img src="/images/${ifDefined(this.imagePath)}/${ifDefined(this.imageFile)}">`;
```

```
html`<img src="/images/${ifDefined(this.imagePath)}/${ifDefined(this.imageFile)}">`;
```

```
html`<img src="/images/${ifDefined(this.imagePath)}/${ifDefined(this.imageFile)}">`;
```

```
false
```

```
''
```

```
this.ariaLabel
```

```
''
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

```
aria-label
```

```
this.ariaLabel
```

```
.
```

```
html`<input .value=${this.itemCount}>`;
```

```
html`<input .value=${this.itemCount}>`;
```

```
html`<input .value=${this.itemCount}>`;
```

```
value
```

```
input
```

```
inputEl.value = this.itemCount;
```

```
inputEl.value = this.itemCount;
```

```
inputEl.value = this.itemCount;
```

```
my-list
```

```
listItems
```

```
html`<my-list .listItems=${this.items}></my-list>`;
```

```
html`<my-list .listItems=${this.items}></my-list>`;
```

```
html`<my-list .listItems=${this.items}></my-list>`;
```

```
listItems
```

```
@
```

```
html`<button @click=${this.clickHandler}>Click Me!</button>`;
```

```
html`<button @click=${this.clickHandler}>Click Me!</button>`;
```

```
html`<button @click=${this.clickHandler}>Click Me!</button>`;
```

```
addEventListener('click', this.clickHandler)
```

```
handleEvent
```

```
listener
```

```
addEventListener
```

```
this
```

```
clickHandler() {  this.clickCount++;}
```

```
clickHandler() {  this.clickCount++;}
```

```
clickHandler() {
```

```
this.clickCount++;
```

```
}
```

```
html`<div ${myDirective()}></div>`
```

```
html`<div ${myDirective()}></div>`
```

```
html`<div ${myDirective()}></div>`
```

```
ref
```

```
html`<button ${ref(this.myRef)}></button>`;
```

```
html`<button ${ref(this.myRef)}></button>`;
```

```
html`<button ${ref(this.myRef)}></button>`;
```

```
// HTML parser closes this div after "Some text"const template1 = html`<div class="broken-div">Some text`;// When joined, "more text" does not end up in .broken-divconst template2 = html`${template1} more text. </div>`;
```

```
// HTML parser closes this div after "Some text"const template1 = html`<div class="broken-div">Some text`;// When joined, "more text" does not end up in .broken-divconst template2 = html`${template1} more text. </div>`;
```

```
// HTML parser closes this div after "Some text"
```

```
const template1 = html`<div class="broken-div">Some text`;
```

```
// When joined, "more text" does not end up in .broken-div
```

```
const template2 = html`${template1} more text. </div>`;
```

```
<!-- attribute values --><div label=${label}></div><button ?disabled=${isDisabled}>Click me!</button><input .value=${currentValue}><button @click=${this.handleClick()}>
<!-- child content --><div>${textContent}</div>
```

```
<!-- attribute values --><div label=${label}></div><button ?disabled=${isDisabled}>Click me!</button><input .value=${currentValue}><button @click=${this.handleClick()}>
<!-- child content --><div>${textContent}</div>
```

```
<!-- attribute values -->
```

```
<div label=${label}></div>
```

```
<button ?disabled=${isDisabled}>Click me!</button>
```

```
<input .value=${currentValue}>
```

```
<button @click=${this.handleClick()}>
```

```
<!-- child content -->
```

```
<div>${textContent}</div>
```

```
<div ${ref(elementReference)}></div>
```

```
<div ${ref(elementReference)}></div>
```

```
<div ${ref(elementReference)}></div>
```

```
<!-- ERROR --><${tagName}></${tagName}>
<!-- ERROR --><div ${attrName}=true></div>
```

```
<!-- ERROR --><${tagName}></${tagName}>
<!-- ERROR --><div ${attrName}=true></div>
```

```
<!-- ERROR -->
```

```
<${tagName}></${tagName}>
```

```
<!-- ERROR -->
```

```
<div ${attrName}=true></div>
```

```
<template>
```

```
<!-- ERROR --><template>${content}</template>
<!-- OK --><template id="${attrValue}">static content ok</template>
```

```
<!-- ERROR --><template>${content}</template>
<!-- OK --><template id="${attrValue}">static content ok</template>
```

```
<!-- ERROR -->
```

```
<template>${content}</template>
```

```
<!-- OK -->
```

```
<template id="${attrValue}">static content ok</template>
```

```
<textarea>
```

```
.value
```

```
<!-- BEWARE --><textarea>${content}</textarea>
<!-- OK --><textarea .value=${content}></textarea>
<!-- OK --><textarea id="${attrValue}">static content ok</textarea>
```

```
<!-- BEWARE --><textarea>${content}</textarea>
<!-- OK --><textarea .value=${content}></textarea>
<!-- OK --><textarea id="${attrValue}">static content ok</textarea>
```

```
<!-- BEWARE -->
```

```
<textarea>${content}</textarea>
```

```
<!-- OK -->
```

```
<textarea .value=${content}></textarea>
```

```
<!-- OK -->
```

```
<textarea id="${attrValue}">static content ok</textarea>
```

```
contenteditable
```

```
.innerText
```

```
<!-- BEWARE --><div contenteditable>${content}</div>
<!-- OK --><div contenteditable .innerText=${content}></div>
<!-- OK --><div contenteditable id="${attrValue}">static content ok</div>
```

```
<!-- BEWARE --><div contenteditable>${content}</div>
<!-- OK --><div contenteditable .innerText=${content}></div>
<!-- OK --><div contenteditable id="${attrValue}">static content ok</div>
```

```
<!-- BEWARE -->
```

```
<div contenteditable>${content}</div>
```

```
<!-- OK -->
```

```
<div contenteditable .innerText=${content}></div>
```

```
<!-- OK -->
```

```
<div contenteditable id="${attrValue}">static content ok</div>
```

```
<!-- will not update: ${value} -->
```

```
<!-- will not update: ${value} -->
```

```
<!-- will not update: ${value} -->
```

```
<style>
```

```
html
```

```
svg
```

```
static-html
```

```
import {html, literal} from 'lit/static-html.js';
```

```
import {html, literal} from 'lit/static-html.js';
```

```
import {html, literal} from 'lit/static-html.js';
```

```
static-html
```

```
html
```

```
svg
```

```
lit
```

```
literal
```

```
my-button
```

```
<button>
```

```
<a>
```

```
import {LitElement} from 'lit';import {customElement, property} from 'lit/decorators.js';import {html, literal} from 'lit/static-html.js';
@customElement('my-button')class MyButton extends LitElement {  tag = literal`button`;  activeAttribute = literal`active`;  @property() caption = 'Hello static';  @property({type: Boolean}) active = false;
  render() {    return html`      <${this.tag} ${this.activeAttribute}=${this.active}>        <p>${this.caption}</p>      </${this.tag}>`;  }}
```

```
import {LitElement} from 'lit';import {customElement, property} from 'lit/decorators.js';import {html, literal} from 'lit/static-html.js';
@customElement('my-button')class MyButton extends LitElement {  tag = literal`button`;  activeAttribute = literal`active`;  @property() caption = 'Hello static';  @property({type: Boolean}) active = false;
  render() {    return html`      <${this.tag} ${this.activeAttribute}=${this.active}>        <p>${this.caption}</p>      </${this.tag}>`;  }}
```

```
import {LitElement} from 'lit';
```

```
import {customElement, property} from 'lit/decorators.js';
```

```
import {html, literal} from 'lit/static-html.js';
```

```
@customElement('my-button')
```

```
class MyButton extends LitElement {
```

```
tag = literal`button`;
```

```
activeAttribute = literal`active`;
```

```
@property() caption = 'Hello static';
```

```
@property({type: Boolean}) active = false;
```

```
render() {
```

```
return html`
```

```
<${this.tag} ${this.activeAttribute}=${this.active}>
```

```
<p>${this.caption}</p>
```

```
</${this.tag}>`;
```

```
}
```

```
}
```

```
import {LitElement} from 'lit';import {html, literal} from 'lit/static-html.js';
class MyButton extends LitElement {  static properties = {    caption: {},    active: {type: Boolean},  };
  tag = literal`button`;  activeAttribute = literal`active`;
  constructor() {    super();    this.caption = 'Hello static';    this.active = false;  }
  render() {    return html`      <${this.tag} ${this.activeAttribute}=${this.active}>        <p>${this.caption}</p>      </${this.tag}>`;  }}customElements.define('my-button', MyButton);
```

```
import {LitElement} from 'lit';import {html, literal} from 'lit/static-html.js';
class MyButton extends LitElement {  static properties = {    caption: {},    active: {type: Boolean},  };
  tag = literal`button`;  activeAttribute = literal`active`;
  constructor() {    super();    this.caption = 'Hello static';    this.active = false;  }
  render() {    return html`      <${this.tag} ${this.activeAttribute}=${this.active}>        <p>${this.caption}</p>      </${this.tag}>`;  }}customElements.define('my-button', MyButton);
```

```
import {LitElement} from 'lit';
```

```
import {html, literal} from 'lit/static-html.js';
```

```
class MyButton extends LitElement {
```

```
static properties = {
```

```
caption: {},
```

```
active: {type: Boolean},
```

```
};
```

```
tag = literal`button`;
```

```
activeAttribute = literal`active`;
```

```
constructor() {
```

```
super();
```

```
this.caption = 'Hello static';
```

```
this.active = false;
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
<${this.tag} ${this.activeAttribute}=${this.active}>
```

```
<p>${this.caption}</p>
```

```
</${this.tag}>`;
```

```
}
```

```
}
```

```
customElements.define('my-button', MyButton);
```

```
@customElement('my-anchor')class MyAnchor extends MyButton {  tag = literal`a`;}
```

```
@customElement('my-anchor')class MyAnchor extends MyButton {  tag = literal`a`;}
```

```
@customElement('my-anchor')
```

```
class MyAnchor extends MyButton {
```

```
tag = literal`a`;
```

```
}
```

```
class MyAnchor extends MyButton {  tag = literal`a`;}customElements.define('my-anchor', MyAnchor);
```

```
class MyAnchor extends MyButton {  tag = literal`a`;}customElements.define('my-anchor', MyAnchor);
```

```
class MyAnchor extends MyButton {
```

```
tag = literal`a`;
```

```
}
```

```
customElements.define('my-anchor', MyAnchor);
```

```
literal
```

```
this.caption
```

```
this.active
```

```
this.tag
```

```
this.activeAttribute
```

```
literal
```

```
literal
```

```
literal
```

```
literal
```

```
literal
```

```
unsafeStatic()
```

```
import {html, unsafeStatic} from 'lit/static-html.js';
```

```
import {html, unsafeStatic} from 'lit/static-html.js';
```

```
import {html, unsafeStatic} from 'lit/static-html.js';
```

```
unsafeStatic()
```

```
unsafeStatic()
```

```
@customElement('my-button')class MyButton extends LitElement {  @property() caption = 'Hello static';  @property({type: Boolean}) active = false;
  render() {    // These strings MUST be trusted, otherwise this is an XSS vulnerability    const tag = getTagName();    const activeAttribute = getActiveAttribute();    // html should be imported from `lit/static-html.js`    return html`      <${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>        <p>${this.caption}</p>      </${unsafeStatic(tag)}>`;  }}
```

```
@customElement('my-button')class MyButton extends LitElement {  @property() caption = 'Hello static';  @property({type: Boolean}) active = false;
  render() {    // These strings MUST be trusted, otherwise this is an XSS vulnerability    const tag = getTagName();    const activeAttribute = getActiveAttribute();    // html should be imported from `lit/static-html.js`    return html`      <${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>        <p>${this.caption}</p>      </${unsafeStatic(tag)}>`;  }}
```

```
@customElement('my-button')
```

```
class MyButton extends LitElement {
```

```
@property() caption = 'Hello static';
```

```
@property({type: Boolean}) active = false;
```

```
render() {
```

```
// These strings MUST be trusted, otherwise this is an XSS vulnerability
```

```
const tag = getTagName();
```

```
const activeAttribute = getActiveAttribute();
```

```
// html should be imported from `lit/static-html.js`
```

```
return html`
```

```
<${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>
```

```
<p>${this.caption}</p>
```

```
</${unsafeStatic(tag)}>`;
```

```
}
```

```
}
```

```
class MyButton extends LitElement {  static properties = {    caption: {},    active: {type: Boolean},  };
  constructor() {    super();    this.caption = 'Hello static';    this.active = false;  }
  render() {    // These strings MUST be trusted, otherwise this is an XSS vulnerability    const tag = getTagName();    const activeAttribute = getActiveAttribute();    // html should be imported from `lit/static-html.js`    return html`      <${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>        <p>${this.caption}</p>      </${unsafeStatic(tag)}>`;  }}customElements.define('my-button', MyButton);
```

```
class MyButton extends LitElement {  static properties = {    caption: {},    active: {type: Boolean},  };
  constructor() {    super();    this.caption = 'Hello static';    this.active = false;  }
  render() {    // These strings MUST be trusted, otherwise this is an XSS vulnerability    const tag = getTagName();    const activeAttribute = getActiveAttribute();    // html should be imported from `lit/static-html.js`    return html`      <${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>        <p>${this.caption}</p>      </${unsafeStatic(tag)}>`;  }}customElements.define('my-button', MyButton);
```

```
class MyButton extends LitElement {
```

```
static properties = {
```

```
caption: {},
```

```
active: {type: Boolean},
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
this.caption = 'Hello static';
```

```
this.active = false;
```

```
}
```

```
render() {
```

```
// These strings MUST be trusted, otherwise this is an XSS vulnerability
```

```
const tag = getTagName();
```

```
const activeAttribute = getActiveAttribute();
```

```
// html should be imported from `lit/static-html.js`
```

```
return html`
```

```
<${unsafeStatic(tag)} ${unsafeStatic(activeAttribute)}=${this.active}>
```

```
<p>${this.caption}</p>
```

```
</${unsafeStatic(tag)}>`;
```

```
}
```

```
}
```

```
customElements.define('my-button', MyButton);
```

```
unsafeStatic
```

```
literal
```

```
代碼示例 (項目: v3-docs/templates/expressions, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

