# Decorators

Class decorator factory that defines the decorated class as a custom element.

customElement(tagName): (classOrDescriptor: ClassDescriptor | CustomElementClass) => any

The tag name of the custom element to define.

Adds event listener options to a method used as an event listener in a lit-html template.

eventOptions(options): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any

An object that specifies event listener options as accepted by EventTarget#addEventListener and EventTarget#removeEventListener.

A property decorator which creates a reactive property that reflects a corresponding attribute value. When a decorated property is set the element will update and render. A PropertyDeclaration may optionally be supplied to configure property features.

property(options?): (protoOrDescriptor: Object | ClassElement, name?: PropertyKey) => any

This decorator should only be used for public fields. As public fields, properties should be considered as primarily settable by element users, either via attribute or the property itself. Generally, properties that are changed by the element should be private or protected fields and should use the state decorator. However, sometimes element code does need to set a public property. This should typically only be done in response to user interaction, and an event should be fired informing the user; for example, a checkbox sets its checked property when clicked and fires a changed event. Mutating public properties should typically not be done for non-primitive (object or array) properties. In other cases when an element needs to manage state, a private property decorated via the state decorator should be used. When needed, state properties can be initialized via public properties to facilitate complex interactions.

A property decorator that converts a class property into a getter that executes a querySelector on the element's renderRoot.

query(selector, cache?): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any

A DOMString containing one or more selectors to match.

An optional boolean which when true performs the DOM query only once and caches the result.

A property decorator that converts a class property into a getter that executes a querySelectorAll on the element's renderRoot.

queryAll(selector): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any

A DOMString containing one or more selectors to match.

A property decorator that converts a class property into a getter that returns the assignedElements of the given slot. Provides a declarative way to use HTMLSlotElement.assignedElements.

queryAssignedElements(options?): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any

Can be passed an optional QueryAssignedElementsOptions object. Example usage:

Note, the type of this property should be annotated as Array<HTMLElement>.

A property decorator that converts a class property into a getter that returns the assignedNodes of the given slot.

queryAssignedNodes(options?): TSDecoratorReturnType

Can be passed an optional QueryAssignedNodesOptions object. Example usage:

Note the type of this property should be annotated as Array<Node>. Use the queryAssignedElements decorator to list only elements, and optionally filter the element list using a CSS selector.

A property decorator that converts a class property into a getter that returns a promise that resolves to the result of a querySelector on the element's renderRoot done after the element's updateComplete promise resolves. When the queried property may change with element state, this decorator can be used instead of requiring users to await the updateComplete before accessing the property.

queryAsync(selector): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any

A DOMString containing one or more selectors to match.

Declares a private or protected reactive property that still triggers updates to the element when it changes. It does not reflect from the corresponding attribute.

state(options?): (protoOrDescriptor: Object | ClassElement, name?: PropertyKey) => any

Properties declared this way must not be used from HTML or HTML templating systems, they're solely for properties internal to the element. These properties may be renamed by optimization tools like closure compiler.

A function that indicates if a property should be considered changed when it is set. The function should take the newValue and oldValue and return true if an update should be requested.

Options for the queryAssignedElements decorator. Extends the options that can be passed into HTMLSlotElement.assignedElements.

CSS selector used to filter the elements returned. For example, a selector of ".item" will only include elements with the item class.

Name of the slot to query. Leave empty for the default slot.

Options for the queryAssignedNodes decorator. Extends the options that can be passed into HTMLSlotElement.assignedNodes.

Name of the slot to query. Leave empty for the default slot.


1. customElement
2. eventOptions
3. property
4. query
5. queryAll
6. queryAssignedElements
7. queryAssignedNodes
8. queryAsync
9. state
10. InternalPropertyDeclaration
11. QueryAssignedElementsOptions
12. QueryAssignedNodesOptions

```
import { customElement } from 'lit/decorators.js';
```

```
customElement(tagName): (classOrDescriptor: ClassDescriptor | CustomElementClass) => any
```

```
string
```

```
@customElement('my-element')class MyElement extends LitElement {  render() {    return html``;  }}
```

```
@customElement('my-element')class MyElement extends LitElement {  render() {    return html``;  }}
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
return html``;
```

```
}
```

```
}
```

```
import { eventOptions } from 'lit/decorators.js';
```

```
eventOptions(options): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any
```

```
AddEventListenerOptions
```

```
EventTarget#addEventListener
```

```
EventTarget#removeEventListener
```

```
PropertyDeclaration
```

```
import { property } from 'lit/decorators.js';
```

```
property(options?): (protoOrDescriptor: Object | ClassElement, name?: PropertyKey) => any
```

```
PropertyDeclaration<unknown, unknown>
```

```
state
```

```
checked
```

```
changed
```

```
state
```

```
class MyElement {  @property({ type: Boolean })  clicked = false;}
```

```
class MyElement {  @property({ type: Boolean })  clicked = false;}
```

```
class MyElement {
```

```
@property({ type: Boolean })
```

```
clicked = false;
```

```
}
```

```
import { query } from 'lit/decorators.js';
```

```
query(selector, cache?): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any
```

```
string
```

```
boolean
```

```
import { queryAll } from 'lit/decorators.js';
```

```
queryAll(selector): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any
```

```
string
```

```
assignedElements
```

```
slot
```

```
HTMLSlotElement.assignedElements
```

```
import { queryAssignedElements } from 'lit/decorators.js';
```

```
queryAssignedElements(options?): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any
```

```
QueryAssignedElementsOptions
```

```
QueryAssignedElementsOptions
```

```
class MyElement {  @queryAssignedElements({ slot: 'list' })  listItems!: Array<HTMLElement>;  @queryAssignedElements()  unnamedSlotEls!: Array<HTMLElement>;  render() {    return html`      <slot name="list"></slot>      <slot></slot>    `;  }}
```

```
class MyElement {  @queryAssignedElements({ slot: 'list' })  listItems!: Array<HTMLElement>;  @queryAssignedElements()  unnamedSlotEls!: Array<HTMLElement>;  render() {    return html`      <slot name="list"></slot>      <slot></slot>    `;  }}
```

```
class MyElement {
```

```
@queryAssignedElements({ slot: 'list' })
```

```
listItems!: Array<HTMLElement>;
```

```
@queryAssignedElements()
```

```
unnamedSlotEls!: Array<HTMLElement>;
```

```
render() {
```

```
return html`
```

```
<slot name="list"></slot>
```

```
<slot></slot>
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
Array<HTMLElement>
```

```
assignedNodes
```

```
slot
```

```
import { queryAssignedNodes } from 'lit/decorators.js';
```

```
queryAssignedNodes(options?): TSDecoratorReturnType
```

```
QueryAssignedNodesOptions
```

```
QueryAssignedNodesOptions
```

```
class MyElement {  @queryAssignedNodes({slot: 'list', flatten: true})  listItems!: Array<Node>;  render() {    return html`      <slot name="list"></slot>    `;  }}
```

```
class MyElement {  @queryAssignedNodes({slot: 'list', flatten: true})  listItems!: Array<Node>;  render() {    return html`      <slot name="list"></slot>    `;  }}
```

```
class MyElement {
```

```
@queryAssignedNodes({slot: 'list', flatten: true})
```

```
listItems!: Array<Node>;
```

```
render() {
```

```
return html`
```

```
<slot name="list"></slot>
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
Array<Node>
```

```
updateComplete
```

```
updateComplete
```

```
import { queryAsync } from 'lit/decorators.js';
```

```
queryAsync(selector): (protoOrDescriptor: ReactiveElement | ClassElement, name?: PropertyKey) => any
```

```
string
```

```
import { state } from 'lit/decorators.js';
```

```
state(options?): (protoOrDescriptor: Object | ClassElement, name?: PropertyKey) => any
```

```
InternalPropertyDeclaration<unknown>
```

```
import { InternalPropertyDeclaration } from 'lit/decorators.js';
```

```
newValue
```

```
oldValue
```

```
true
```

```
Type
```

```
Type
```

```
queryAssignedElements
```

```
import { QueryAssignedElementsOptions } from 'lit/decorators.js';
```

```
".item"
```

```
item
```

```
queryAssignedNodes
```

```
import { QueryAssignedNodesOptions } from 'lit/decorators.js';
```

