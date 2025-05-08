# Rendering

Add a template to your component to define what it should render. Templates can include expressions, which are placeholders for dynamic content.

To define a template for a Lit component, add a render() method:



Write your template in HTML inside a JavaScript tagged template literal using Lit's html tag function.

Lit templates can include JavaScript expressions. You can use expressions to set text content, attributes, properties, and event listeners. The render() method can also include any JavaScript—for example, you can create local variables for use in expressions.

Typically, the component's render() method returns a single TemplateResult object (the same type returned by the html tag function). However, it can return anything that Lit can render as the child of an HTML element:

This is almost identical to the set of values that can be rendered to a Lit child expression. The one difference is that a child expression can render an SVGTemplateResult, returned by the svg function. This kind of template result can only be rendered as the descendant of an <svg> element.

To take best advantage of Lit's functional rendering model, your render() method should follow these guidelines:

Following these guidelines keeps the template deterministic, and makes it easier to reason about the code.

In most cases you should avoid making DOM updates outside of render(). Instead, express the component's template as a function of its state, and capture its state in properties.

For example, if your component needs to update its UI when it receives an event, have the event listener set a reactive property that is used in render(), rather than manipulate the DOM directly.

For more information, see Reactive properties.

You can compose Lit templates from other templates. The following example composes a template for a component called <my-page> from smaller templates for the page's header, footer, and main content:



In this example, the individual templates are defined as instance methods, so a subclass could extend this component and override one or more templates.

Move example to composition section, add xref.

You can also compose templates by importing other elements and using them in your template:



A Lit component renders its template initially when it's added to the DOM on a page. After the initial render, any change to the component's reactive properties triggers an update cycle, re-rendering the component.

Lit batches updates to maximize performance and efficiency. Setting multiple properties at once triggers only one update, performed asynchronously at microtask timing.

During an update, only the parts of the DOM that change are re-rendered. Although Lit templates look like string interpolation, Lit parses and creates static HTML once, and then only updates changed values in expressions after that, making updates very efficient.

For more information about the update cycle, see What happens when properties change.

Lit uses shadow DOM to encapsulate the DOM a component renders. Shadow DOM lets an element create its own, isolated DOM tree that's separate from the main document tree. It's a core feature of the web components specifications that enables interoperability, style encapsulation, and other benefits.

For more information about shadow DOM, see Shadow DOM v1: Self-Contained Web Components on Web Fundamentals.

For more information about working with shadow DOM in your component, see Working with shadow DOM.


1. Renderable values
2. Writing a good render() method
3. Composing templates
4. When templates render
5. DOM encapsulation
6. See also


* Primitive values like string, number, or boolean.
* TemplateResult objects created by the html function.
* DOM Nodes.
* The sentinel values nothing and noChange.
* Arrays or iterables of any of the supported types.


* Avoid changing the component's state.
* Avoid producing any side effects.
* Use only the component's properties as input.
* Return the same result when given the same property values.


* Shadow DOM
* Templates overview
* Template expressions

```
render()
```

```
html
```

```
render()
```

```
render()
```

```
TemplateResult
```

```
html
```

```
TemplateResult
```

```
html
```

```
nothing
```

```
noChange
```

```
SVGTemplateResult
```

```
svg
```

```
<svg>
```

```
render()
```

```
render()
```

```
render()
```

```
<my-page>
```

```
代碼示例 (項目: v3-docs/templates/define, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/templates/compose, 文件: my-page.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/templates/composeimports, 文件: )
請參考原始頁面查看完整示例
```

