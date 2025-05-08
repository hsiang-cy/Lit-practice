# Defining

Define a Lit component by creating a class extending LitElement and registering your class with the browser:

The @customElement decorator is shorthand for calling customElements.define, which registers a custom element class with the browser and associates it with an element name (in this case, simple-greeting).

If you're using JavaScript, or if you're not using decorators, you can call define() directly:

When you define a Lit component, you're defining a custom HTML element. So you can use the new element like you'd use any built-in element:

The LitElement base class is a subclass of HTMLElement, so a Lit component inherits all of the standard HTMLElement properties and methods.

Specifically, LitElement inherits from ReactiveElement, which implements reactive properties, and in turn inherits from HTMLElement.

TypeScript will infer the class of an HTML element returned from certain DOM APIs based on the tag name. For example, document.createElement('img') returns an HTMLImageElement instance with a src: string property.

Custom elements can get this same treatment by adding to the HTMLElementTagNameMap as follows:

By doing this, the following code properly type-checks:

We recommend adding an HTMLElementTagNameMap entry for all elements authored in TypeScript, and ensuring you publish your .d.ts typings in your npm package.


1. A Lit component is an HTML element
2. Providing good TypeScript typings

```
LitElement
```

```
@customElement('simple-greeting')export class SimpleGreeting extends LitElement { /* ... */ }
```

```
@customElement('simple-greeting')export class SimpleGreeting extends LitElement { /* ... */ }
```

```
@customElement('simple-greeting')
```

```
export class SimpleGreeting extends LitElement { /* ... */ }
```

```
@customElement
```

```
customElements.define
```

```
simple-greeting
```

```
define()
```

```
export class SimpleGreeting extends LitElement { /* ... */  }customElements.define('simple-greeting', SimpleGreeting);
```

```
export class SimpleGreeting extends LitElement { /* ... */  }customElements.define('simple-greeting', SimpleGreeting);
```

```
export class SimpleGreeting extends LitElement { /* ... */  }
```

```
customElements.define('simple-greeting', SimpleGreeting);
```

```
<simple-greeting name="Markup"></simple-greeting>
```

```
<simple-greeting name="Markup"></simple-greeting>
```

```
<simple-greeting name="Markup"></simple-greeting>
```

```
const greeting = document.createElement('simple-greeting');
```

```
const greeting = document.createElement('simple-greeting');
```

```
const greeting = document.createElement('simple-greeting');
```

```
LitElement
```

```
HTMLElement
```

```
HTMLElement
```

```
LitElement
```

```
ReactiveElement
```

```
HTMLElement
```

```
document.createElement('img')
```

```
HTMLImageElement
```

```
src: string
```

```
HTMLElementTagNameMap
```

```
@customElement('my-element')export class MyElement extends LitElement {  @property({type: Number})  aNumber: number = 5;  /* ... */}
declare global {  interface HTMLElementTagNameMap {    "my-element": MyElement;  }}
```

```
@customElement('my-element')export class MyElement extends LitElement {  @property({type: Number})  aNumber: number = 5;  /* ... */}
declare global {  interface HTMLElementTagNameMap {    "my-element": MyElement;  }}
```

```
@customElement('my-element')
```

```
export class MyElement extends LitElement {
```

```
@property({type: Number})
```

```
aNumber: number = 5;
```

```
/* ... */
```

```
}
```

```
declare global {
```

```
interface HTMLElementTagNameMap {
```

```
"my-element": MyElement;
```

```
}
```

```
}
```

```
const myElement = document.createElement('my-element');myElement.aNumber = 10;
```

```
const myElement = document.createElement('my-element');myElement.aNumber = 10;
```

```
const myElement = document.createElement('my-element');
```

```
myElement.aNumber = 10;
```

```
HTMLElementTagNameMap
```

```
.d.ts
```

