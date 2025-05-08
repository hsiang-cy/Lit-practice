# Standalone lit-html

Lit combines the component model of LitElement with JavaScript template literal-based rendering into an easy-to-use package. However, the templating portion of Lit is factored into a standalone library called lit-html, which can be used outside of the Lit component model anywhere you need to efficiently render and update HTML.

The lit-html package can be installed separately from lit:

The main imports are html and render:

The standalone lit-html package also includes modules for the following features described in the full Lit developer guide:

Lit templates are written using JavaScript template literals tagged with the html tag. The contents of the literal are mostly plain, declarative HTML, and may include expressions to insert and update the dynamic parts of a template (see Templates for a full reference on Lit's templating syntax).

A lit-html template expression does not cause any DOM to be created or updated. It's only a description of DOM, called a TemplateResult. To actually create or update DOM, you need to pass the TemplateResult to the render() function, along with a container to render to:

To make your template dynamic, you can create a template function. Call the template function any time your data changes.

When you call the template function, lit-html captures the current expression values. The template function doesn't create any DOM nodes, so it's fast and cheap.

The template function returns a TemplateResult that contains the template and the input data. This is one of the main principles behind using lit-html: creating UI as a function of state.

When you call render, lit-html only updates the parts of the template that have changed since the last render. This makes lit-html updates very fast.

The render method also takes an options argument that allows you to specify the following options:

host: The this value to use when invoking event listeners registered with the @eventName syntax. This option only applies when you specify an event listener as a plain function. If you specify the event listener using an event listener object, the listener object is used as the this value. See Event listener expressions for more on event listeners.

renderBefore: An optional reference node within the container before which lit-html will render. By default, lit-html will append to the end of the container. Setting renderBefore allows rendering to a specific spot within the container.

creationScope: The object lit-html will call importNode on when cloning templates (defaults to document). This is provided for advanced use cases.

For example, if you're using lit-html standalone, you might use render options like this:

The above example would render the template between the <header> and <footer> elements.

Render options must be constant. Render options should not change between subsequent render calls.

lit-html focuses on one thing: rendering HTML. How you apply styles to the HTML lit-html creates depends on how you're using it—for example, if you're using lit-html inside a component system like LitElement, you can follow the patterns used by that component system.

In general, how you style HTML will depend on whether you're using shadow DOM:

Styling shadow roots on legacy browsers requires polyfills. Using the ShadyCSS polyfill with standalone lit-html requires loading lit-html/polyfill-support.js and passing a scope option in RenderOptions with the host tag name for scoping the rendered content. Although this approach is possible, we recommend using LitElement if you want to support rendering lit-html templates to shadow DOM on legacy browsers.

To help with dynamic styling, lit-html provides two directives for manipulating an element's class and style attributes:


1. lit-html standalone package
2. Rendering lit-html templates
3. Render dynamic dataRender Options
4. Render Options
5. Styles and lit-html templates


1. Render Options


* lit-html/directives/* - Built-in directives
* lit-html/directive.js - Custom directives
* lit-html/async-directive.js - Custom async directives
* lit-html/directive-helpers.js - Directive helpers for imperative updates
* lit-html/static.js - Static html tag
* lit-html/polyfill-support.js - Support for interfacing with the web components polyfills (see Styles and lit-html templates)


* host: The this value to use when invoking event listeners registered with the @eventName syntax. This option only applies when you specify an event listener as a plain function. If you specify the event listener using an event listener object, the listener object is used as the this value. See Event listener expressions for more on event listeners. 
* renderBefore: An optional reference node within the container before which lit-html will render. By default, lit-html will append to the end of the container. Setting renderBefore allows rendering to a specific spot within the container. 
* creationScope: The object lit-html will call importNode on when cloning templates (defaults to document). This is provided for advanced use cases. 


* If you are not rendering into shadow DOM, you can style HTML using global style sheets.
* If are rendering into shadow DOM, then you can render <style> tags inside the shadow root.


* classMap sets classes on an element based on the properties of an object.
* styleMap sets the styles on an element based on a map of style properties and values.

```
lit-html
```

```
lit-html
```

```
lit
```

```
npm install lit-html
```

```
npm install lit-html
```

```
npm install lit-html
```

```
html
```

```
render
```

```
import {html, render} from 'lit-html';
```

```
import {html, render} from 'lit-html';
```

```
import {html, render} from 'lit-html';
```

```
lit-html
```

```
Lit
```

```
lit-html/directives/*
```

```
lit-html/directive.js
```

```
lit-html/async-directive.js
```

```
lit-html/directive-helpers.js
```

```
lit-html/static.js
```

```
lit-html/polyfill-support.js
```

```
html
```

```
html`<h1>Hello ${name}</h1>`
```

```
html`<h1>Hello ${name}</h1>`
```

```
html`<h1>Hello ${name}</h1>`
```

```
TemplateResult
```

```
TemplateResult
```

```
render()
```

```
import {html, render} from 'lit-html';
const name = 'world';const sayHi = html`<h1>Hello ${name}</h1>`;render(sayHi, document.body);
```

```
import {html, render} from 'lit-html';
const name = 'world';const sayHi = html`<h1>Hello ${name}</h1>`;render(sayHi, document.body);
```

```
import {html, render} from 'lit-html';
```

```
const name = 'world';
```

```
const sayHi = html`<h1>Hello ${name}</h1>`;
```

```
render(sayHi, document.body);
```

```
import {html, render} from 'lit-html';
// Define a template functionconst myTemplate = (name) => html`<div>Hello ${name}</div>`;
// Render the template with some datarender(myTemplate('earth'), document.body);
// ... Later on ...// Render the template with different datarender(myTemplate('mars'), document.body);
```

```
import {html, render} from 'lit-html';
// Define a template functionconst myTemplate = (name) => html`<div>Hello ${name}</div>`;
// Render the template with some datarender(myTemplate('earth'), document.body);
// ... Later on ...// Render the template with different datarender(myTemplate('mars'), document.body);
```

```
import {html, render} from 'lit-html';
```

```
// Define a template function
```

```
const myTemplate = (name) => html`<div>Hello ${name}</div>`;
```

```
// Render the template with some data
```

```
render(myTemplate('earth'), document.body);
```

```
// ... Later on ...
```

```
// Render the template with different data
```

```
render(myTemplate('mars'), document.body);
```

```
TemplateResult
```

```
render
```

```
render
```

```
options
```

```
host
```

```
this
```

```
@eventName
```

```
this
```

```
renderBefore
```

```
container
```

```
renderBefore
```

```
creationScope
```

```
importNode
```

```
document
```

```
lit-html
```

```
<div id="container">  <header>My Site</header>  <footer>Copyright 2021</footer></div>
```

```
<div id="container">  <header>My Site</header>  <footer>Copyright 2021</footer></div>
```

```
<div id="container">
```

```
<header>My Site</header>
```

```
<footer>Copyright 2021</footer>
```

```
</div>
```

```
const template = () => html`...`;const container = document.getElementById('container');const renderBefore = container.querySelector('footer');render(template(), container, {renderBefore});
```

```
const template = () => html`...`;const container = document.getElementById('container');const renderBefore = container.querySelector('footer');render(template(), container, {renderBefore});
```

```
const template = () => html`...`;
```

```
const container = document.getElementById('container');
```

```
const renderBefore = container.querySelector('footer');
```

```
render(template(), container, {renderBefore});
```

```
<header>
```

```
<footer>
```

```
render
```

```
<style>
```

```
lit-html
```

```
lit-html/polyfill-support.js
```

```
scope
```

```
RenderOptions
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

