# Shadow DOM

Lit components use shadow DOM to encapsulate their DOM. Shadow DOM provides a way to add a separate isolated and encapsulated DOM tree to an element. DOM encapsulation is the key to unlocking interoperability with any other code—including other web components or Lit components—functioning on the page.

Shadow DOM provides three benefits:

For more information on shadow DOM:

Older browsers. On older browsers where native shadow DOM isn't available, the web components polyfills may be used. Please note that Lit's polyfill-support module must be loaded along with the web components polyfills. See Requirements for legacy browsers for details.

Lit renders components to its renderRoot, which is a shadow root by default. To find internal elements, you can use DOM query APIs, such as this.renderRoot.querySelector().

The renderRoot should always be either a shadow root or an element, which share APIs like .querySelectorAll() and .children.

You can query internal DOM after component initial render (for example, in firstUpdated), or use a getter pattern:

LitElement supplies a set of decorators that provide a shorthand way of defining getters like this.

The @query, @queryAll, and @queryAsync decorators all provide a convenient way to access nodes in the internal component DOM.

Using decorators. Decorators are a proposed JavaScript feature, so you’ll need to use a compiler like Babel or TypeScript to use decorators. See Using decorators for details.

Modifies a class property, turning it into a getter that returns a node from the render root. The optional second argument when true performs the DOM query only once and caches the result. This can be used as a performance optimization in cases when the node being queried will not change.

This decorator is equivalent to:

Identical to query except that it returns all matching nodes, instead of a single node. It's the equivalent of calling querySelectorAll.

Here, _divs would return both <div> elements in the template. For TypeScript, the typing of a @queryAll property is NodeListOf<HTMLElement>. If you know exactly what kind of nodes you'll retrieve, the typing can be more specific:

The exclamation point (!) after buttons is TypeScript's non-null assertion operator. It tells the compiler to treat buttons as always being defined, never null or undefined.

Similar to @query, except that instead of returning a node directly, it returns a Promise that resolves to that node after any pending element render is completed. Code can use this instead of waiting for the updateComplete promise.

This is useful, for example, if the node returned by @queryAsync can change as a result of another property change.

Your component may accept children (like a <ul> element can have <li> children).

By default, if an element has a shadow tree, its children don't render at all.

To render children, your template needs to include one or more <slot> elements, which act as placeholders for child nodes.

To render an element's children, create a <slot> for them in the element's template. The children aren't moved in the DOM tree, but they're rendered as if they were children of the <slot>. For example:



To assign a child to a specific slot, ensure that the child's slot attribute matches the slot's name attribute:

Named slots only accept children with a matching slot attribute.

For example, <slot name="one"></slot> only accepts children with the attribute slot="one".

Children with a slot attribute will only be rendered in a slot with a matching name attribute.

For example, <p slot="one">...</p> will only be placed in <slot name="one"></slot>.



You can specify fallback content for a slot. The fallback content is shown when no child is assigned to the slot.

Rendering fallback content. If any child nodes are assigned to a slot, its fallback content doesn't render. A default slot with no name accepts any child nodes. It won't render fallback content even if the only assigned nodes are text nodes containing whitespace, for example <example-element> </example-element>. When using a Lit expression as a child of a custom element, make sure to use a non-rendering value when appropriate so that any slot fallback content is rendered. See removing child content for more information.

To access children assigned to slots in your shadow root, you can use the standard slot.assignedNodes or slot.assignedElements methods with the slotchange event.

For example, you can create a getter to access assigned elements for a particular slot:

The elements are assigned only after the slot is rendered.

If you need to access assigned elements at startup, you need to wait for firstUpdated or updated. If you want to access assigned elements when your render changes, you can use slotchange.

You can use the slotchange event to take action when nodes are first assigned or change. The following example extracts the text content of all of the slotted children.

For more information, see HTMLSlotElement on MDN.

@queryAssignedElements and @queryAssignedNodes convert a class property into a getter that returns the result of calling slot.assignedElements or slot.assignedNodes respectively on a given slot in the component's shadow tree. Use these to query the elements or nodes assigned to a given slot.

Both accept an optional object with the following properties:

Deciding which decorator to use depends on whether you want to query for text nodes assigned to the slot, or only element nodes. This decision is specific to your use case.

Using decorators. Decorators are a proposed JavaScript feature, so you’ll need to use a compiler like Babel or TypeScript to use decorators. See Using decorators for details.

The examples above are equivalent to the following code:

Each Lit component has a render root—a DOM node that serves as a container for its internal DOM.

By default, LitElement creates an open shadowRoot and renders inside it, producing the following DOM structure:

There are two ways to customize the render root used by LitElement:

The simplest way to customize the render root is to set the shadowRootOptions static property. The default implementation of createRenderRoot passes shadowRootOptions as the options argument to attachShadow when creating the component's shadow root. It can be set to customize any options allowed in the ShadowRootInit dictionary, for example mode and delegatesFocus.

See Element.attachShadow() on MDN for more information.

The default implementation of createRenderRoot creates an open shadow root and adds to it any styles set in the static styles class field. For more information on styling see Styles.

To customize a component's render root, implement createRenderRoot and return the node you want the template to render into.

For example, to render the template into the main DOM tree as your element's children, implement createRenderRoot and return this.

Rendering into children. Rendering into children and not shadow DOM is generally not recommended. Your element will not have access to DOM or style scoping, and it will not be able to compose elements into its internal DOM.




1. Accessing nodes in the shadow DOM@query, @queryAll, and @queryAsync decorators
2. @query, @queryAll, and @queryAsync decorators
3. Rendering children with slotsUsing the slot elementUsing named slotsSpecifying slot fallback content
4. Using the slot element
5. Using named slots
6. Specifying slot fallback content
7. Accessing slotted children@queryAssignedElements and @queryAssignedNodes decorators
8. @queryAssignedElements and @queryAssignedNodes decorators
9. Customizing the render rootSetting shadowRootOptionsImplementing createRenderRoot
10. Setting shadowRootOptions
11. Implementing createRenderRoot


1. @query, @queryAll, and @queryAsync decorators


1. Using the slot element
2. Using named slots
3. Specifying slot fallback content


1. @queryAssignedElements and @queryAssignedNodes decorators


1. Setting shadowRootOptions
2. Implementing createRenderRoot


* DOM scoping. DOM APIs like document.querySelector won't find elements in the component's shadow DOM, so it's harder for global scripts to accidentally break your component.
* Style scoping. You can write encapsulated styles for your shadow DOM that don't affect the rest of the DOM tree.
* Composition. The component's shadow root, which contains its internal DOM, is separate from the component's children. You can choose how children are rendered in your component's internal DOM.


* Shadow DOM v1: Self-Contained Web Components on Web Fundamentals.
* Using shadow DOM on MDN.


* Named slots only accept children with a matching slot attribute. For example, <slot name="one"></slot> only accepts children with the attribute slot="one". 
* Children with a slot attribute will only be rendered in a slot with a matching name attribute. For example, <p slot="one">...</p> will only be placed in <slot name="one"></slot>. 


* Setting shadowRootOptions.
* Implementing the createRenderRoot method.

```
document.querySelector
```

```
polyfill-support
```

```
renderRoot
```

```
this.renderRoot.querySelector()
```

```
renderRoot
```

```
.querySelectorAll()
```

```
.children
```

```
firstUpdated
```

```
firstUpdated() {  this.staticNode = this.renderRoot.querySelector('#static-node');}
get _closeButton() {  return this.renderRoot.querySelector('#close-button');}
```

```
firstUpdated() {  this.staticNode = this.renderRoot.querySelector('#static-node');}
get _closeButton() {  return this.renderRoot.querySelector('#close-button');}
```

```
firstUpdated() {
```

```
this.staticNode = this.renderRoot.querySelector('#static-node');
```

```
}
```

```
get _closeButton() {
```

```
return this.renderRoot.querySelector('#close-button');
```

```
}
```

```
@query
```

```
@queryAll
```

```
@queryAsync
```

```
import {LitElement, html} from 'lit';import {query} from 'lit/decorators/query.js';
class MyElement extends LitElement {  @query('#first')  _first;
  render() {    return html`      <div id="first"></div>      <div id="second"></div>    `;  }}
```

```
import {LitElement, html} from 'lit';import {query} from 'lit/decorators/query.js';
class MyElement extends LitElement {  @query('#first')  _first;
  render() {    return html`      <div id="first"></div>      <div id="second"></div>    `;  }}
```

```
import {LitElement, html} from 'lit';
```

```
import {query} from 'lit/decorators/query.js';
```

```
class MyElement extends LitElement {
```

```
@query('#first')
```

```
_first;
```

```
render() {
```

```
return html`
```

```
<div id="first"></div>
```

```
<div id="second"></div>
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
get _first() {  return this.renderRoot?.querySelector('#first') ?? null;}
```

```
get _first() {  return this.renderRoot?.querySelector('#first') ?? null;}
```

```
get _first() {
```

```
return this.renderRoot?.querySelector('#first') ?? null;
```

```
}
```

```
query
```

```
querySelectorAll
```

```
import {LitElement, html} from 'lit';import {queryAll} from 'lit/decorators/queryAll.js';
class MyElement extends LitElement {  @queryAll('div')  _divs;
  render() {    return html`      <div id="first"></div>      <div id="second"></div>    `;  }}
```

```
import {LitElement, html} from 'lit';import {queryAll} from 'lit/decorators/queryAll.js';
class MyElement extends LitElement {  @queryAll('div')  _divs;
  render() {    return html`      <div id="first"></div>      <div id="second"></div>    `;  }}
```

```
import {LitElement, html} from 'lit';
```

```
import {queryAll} from 'lit/decorators/queryAll.js';
```

```
class MyElement extends LitElement {
```

```
@queryAll('div')
```

```
_divs;
```

```
render() {
```

```
return html`
```

```
<div id="first"></div>
```

```
<div id="second"></div>
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
_divs
```

```
<div>
```

```
@queryAll
```

```
NodeListOf<HTMLElement>
```

```
@queryAll('button')_buttons!: NodeListOf<HTMLButtonElement>
```

```
@queryAll('button')_buttons!: NodeListOf<HTMLButtonElement>
```

```
@queryAll('button')
```

```
_buttons!: NodeListOf<HTMLButtonElement>
```

```
!
```

```
buttons
```

```
buttons
```

```
null
```

```
undefined
```

```
@query
```

```
Promise
```

```
updateComplete
```

```
@queryAsync
```

```
<ul>
```

```
<li>
```

```
<my-element>  <p>A child</p></my-element>
```

```
<my-element>  <p>A child</p></my-element>
```

```
<my-element>
```

```
<p>A child</p>
```

```
</my-element>
```

```
<slot>
```

```
<slot>
```

```
<slot>
```

```
slot
```

```
name
```

```
slot
```

```
<slot name="one"></slot>
```

```
slot="one"
```

```
slot
```

```
name
```

```
<p slot="one">...</p>
```

```
<slot name="one"></slot>
```

```
<slot>I am fallback content</slot>
```

```
<slot>I am fallback content</slot>
```

```
<slot>I am fallback content</slot>
```

```
<example-element> </example-element>
```

```
slot.assignedNodes
```

```
slot.assignedElements
```

```
slotchange
```

```
get _slottedChildren() {  const slot = this.shadowRoot.querySelector('slot');  return slot.assignedElements({flatten: true});}
```

```
get _slottedChildren() {  const slot = this.shadowRoot.querySelector('slot');  return slot.assignedElements({flatten: true});}
```

```
get _slottedChildren() {
```

```
const slot = this.shadowRoot.querySelector('slot');
```

```
return slot.assignedElements({flatten: true});
```

```
}
```

```
firstUpdated
```

```
updated
```

```
slotchange
```

```
slotchange
```

```
handleSlotchange(e) {  const childNodes = e.target.assignedNodes({flatten: true});  // ... do something with childNodes ...  this.allText = childNodes.map((node) => {    return node.textContent ? node.textContent : ''  }).join('');}
render() {  return html`<slot @slotchange=${this.handleSlotchange}></slot>`;}
```

```
handleSlotchange(e) {  const childNodes = e.target.assignedNodes({flatten: true});  // ... do something with childNodes ...  this.allText = childNodes.map((node) => {    return node.textContent ? node.textContent : ''  }).join('');}
render() {  return html`<slot @slotchange=${this.handleSlotchange}></slot>`;}
```

```
handleSlotchange(e) {
```

```
const childNodes = e.target.assignedNodes({flatten: true});
```

```
// ... do something with childNodes ...
```

```
this.allText = childNodes.map((node) => {
```

```
return node.textContent ? node.textContent : ''
```

```
}).join('');
```

```
}
```

```
render() {
```

```
return html`<slot @slotchange=${this.handleSlotchange}></slot>`;
```

```
}
```

```
@queryAssignedElements
```

```
@queryAssignedNodes
```

```
slot.assignedElements
```

```
slot.assignedNodes
```

```
flatten
```

```
<slot>
```

```
slot
```

```
selector
```

```
queryAssignedElements
```

```
@queryAssignedElements({slot: 'list', selector: '.item'})_listItems!: Array<HTMLElement>;
@queryAssignedNodes({slot: 'header', flatten: true})_headerNodes!: Array<Node>;
```

```
@queryAssignedElements({slot: 'list', selector: '.item'})_listItems!: Array<HTMLElement>;
@queryAssignedNodes({slot: 'header', flatten: true})_headerNodes!: Array<Node>;
```

```
@queryAssignedElements({slot: 'list', selector: '.item'})
```

```
_listItems!: Array<HTMLElement>;
```

```
@queryAssignedNodes({slot: 'header', flatten: true})
```

```
_headerNodes!: Array<Node>;
```

```
get _listItems() {  const slot = this.shadowRoot.querySelector('slot[name=list]');  return slot.assignedElements().filter((node) => node.matches('.item'));}
get _headerNodes() {  const slot = this.shadowRoot.querySelector('slot[name=header]');  return slot.assignedNodes({flatten: true});}
```

```
get _listItems() {  const slot = this.shadowRoot.querySelector('slot[name=list]');  return slot.assignedElements().filter((node) => node.matches('.item'));}
get _headerNodes() {  const slot = this.shadowRoot.querySelector('slot[name=header]');  return slot.assignedNodes({flatten: true});}
```

```
get _listItems() {
```

```
const slot = this.shadowRoot.querySelector('slot[name=list]');
```

```
return slot.assignedElements().filter((node) => node.matches('.item'));
```

```
}
```

```
get _headerNodes() {
```

```
const slot = this.shadowRoot.querySelector('slot[name=header]');
```

```
return slot.assignedNodes({flatten: true});
```

```
}
```

```
shadowRoot
```

```
<my-element>  #shadow-root    <p>child 1</p>    <p>child 2</p>
```

```
<my-element>  #shadow-root    <p>child 1</p>    <p>child 2</p>
```

```
<my-element>
```

```
#shadow-root
```

```
<p>child 1</p>
```

```
<p>child 2</p>
```

```
shadowRootOptions
```

```
createRenderRoot
```

```
shadowRootOptions
```

```
shadowRootOptions
```

```
createRenderRoot
```

```
shadowRootOptions
```

```
attachShadow
```

```
mode
```

```
delegatesFocus
```

```
class DelegatesFocus extends LitElement {  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};}
```

```
class DelegatesFocus extends LitElement {  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};}
```

```
class DelegatesFocus extends LitElement {
```

```
static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
```

```
}
```

```
createRenderRoot
```

```
createRenderRoot
```

```
static styles
```

```
createRenderRoot
```

```
createRenderRoot
```

```
this
```

```
代碼示例 (項目: v3-docs/components/shadowdom/slots, 文件: )
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/shadowdom/namedslots, 文件: )
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/components/shadowdom/renderroot, 文件: )
請參考原始頁面查看完整示例
```

