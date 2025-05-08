# Overview

If time permits, add new page on working with inputs, per outline.

Lit templates are written using JavaScript template literals tagged with the html tag. The contents of the literal are mostly plain, declarative, HTML:

The template syntax might look like you're just doing string interpolation. But with tagged template literals, the browser passes the tag function an array of strings (the static portions of the template) and an array of expressions (the dynamic portions). Lit uses this to build an efficient representation of your template, so it can re-render only the parts of template that have changed.

Lit templates are extremely expressive and allow you to render dynamic content in a variety of ways:

You can also use Lit's templating library for standalone templating, outside of a Lit component. For details, see Standalone lit-html templates.


1. Standalone templating


* Expressions: Templates can include dynamic values called expressions that can be used to render attributes, text, properties, event handlers, and even other templates.
* Conditionals: Expressions can render conditional content using standard JavaScript flow control.
* Lists: Render lists by transforming data into arrays of templates using standard JavaScript looping and array techniques.
* Built-in directives: Directives are functions that can extend Lit's templating functionality. The library includes a set of built-in directives to help with a variety of rendering needs.
* Custom directives: You can also write your own directives to customize Lit's rendering as needed.

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

