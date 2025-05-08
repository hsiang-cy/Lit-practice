# Overview

A Lit component is a reusable piece of UI. You can think of a Lit component as a container that has some state and that displays a UI based on its state. It can also react to user input, fire events—anything you'd expect a UI component to do. And a Lit component is an HTML element, so it has all of the standard element APIs.

Creating a Lit component involves a number of concepts:

Defining a component. A Lit component is implemented as a custom element, registered with the browser.

Rendering. A component has render method that's called to render the component's contents. In the render method, you define a template for the component.

Reactive properties. Properties hold the state of the component. Changing one or more of the components' reactive properties triggers an update cycle, re-rendering the component.

Styles. A component can define encapsulated styles to control its own appearance.

Lifecycle. Lit defines a set of callbacks that you can override to hook into the component's lifecycle—for example, to run code when the element's added to a page, or whenever the component updates.

Here's a sample component:



This example uses TypeScript decorators.

See the Decorators documentation for more information on configuring TypeScript for decorators.


* Defining a component. A Lit component is implemented as a custom element, registered with the browser. 
* Rendering. A component has render method that's called to render the component's contents. In the render method, you define a template for the component. 
* Reactive properties. Properties hold the state of the component. Changing one or more of the components' reactive properties triggers an update cycle, re-rendering the component. 
* Styles. A component can define encapsulated styles to control its own appearance. 
* Lifecycle. Lit defines a set of callbacks that you can override to hook into the component's lifecycle—for example, to run code when the element's added to a page, or whenever the component updates. 

```ts
:host{display:block;margin:1em 0}aside{display:flex;border-style:solid;border-width:1px;border-color:var(--sys-color-outline-variant);padding:1em 1em 1em 0}slot{display:block;flex-grow:1;overflow:auto}svg{width:1.5em;margin-inline:1em}:host(:not([no-header])) ::slotted(:first-child){font-weight:700}:host(:not([no-header])) ::slotted(:first-child),:host(:not([no-header])) ::slotted(:nth-child(2)){display:inline}::slotted(:first-child){margin-block-start:0}::slotted(:first-child),::slotted(:last-child){margin-block-end:0}A white letter i in a blue circle
This example uses TypeScript decorators.
See the Decorators documentation for more information on configuring TypeScript for decorators.
```

```
代碼示例 (項目: v3-docs/components/overview/simple-greeting, 文件: simple-greeting.ts)
請參考原始頁面查看完整示例
```

