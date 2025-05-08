# LitElement

Base element class that manages element properties and attributes, and renders a lit-html template.

To define a component, subclass LitElement and implement a render method to provide the component's template. Define properties using the properties property or the property decorator.

Synchronizes property values when attributes change.

Specifically, when an attribute is set, the corresponding property is set. You should rarely need to implement this callback. If this method is overridden, super.attributeChangedCallback(name, _old, value) must be called. See using the lifecycle callbacks on MDN for more information about the attributeChangedCallback.

Returns a list of attributes corresponding to the registered properties.

Registers a ReactiveController to participate in the element's reactive update cycle. The element automatically calls into any registered controllers during its lifecycle callbacks.

If the element is connected when addController() is called, the controller's hostConnected() callback will be immediately called.

Removes a ReactiveController from the element.

Disable the given warning category for this class.

This method only exists in development builds, so it should be accessed with a guard like:

Read or set all the enabled warning categories for this class.

This property is only used in development builds.

Enable the given warning category for this class.

This method only exists in development builds, so it should be accessed with a guard like:

Invoked when the component is added to the document's DOM.

In connectedCallback() you should setup tasks that should only occur when the element is connected to the document. The most common of these is adding event listeners to nodes external to the element, like a keydown event handler added to the window.

Typically, anything done in connectedCallback() should be undone when the element is disconnected, in disconnectedCallback().

Invoked when the component is removed from the document's DOM.

This callback is the main signal to the element that it may no longer be used. disconnectedCallback() should ensure that nothing is holding a reference to the element (such as event listeners added to nodes external to the element), so that it is free to be garbage collected.

An element may be re-connected after being disconnected.

Adds an initializer function to the class that is called during instance construction.

This is useful for code that runs against a ReactiveElement subclass, such as a decorator, that needs to do work for each instance, such as setting up a ReactiveController.

Decorating a field will then cause each instance to run an initializer that adds a controller:

Initializers are stored per-constructor. Adding an initializer to a subclass does not add it to a superclass. Since initializers are run in constructors, initializers will run in order of the class hierarchy, starting with superclasses and progressing to the instance's class.

Creates property accessors for registered properties, sets up element styling, and ensures any superclasses are also finalized. Returns true if the element was finalized.

Ensure this class is marked as finalized as an optimization ensuring it will not needlessly try to finalize.

Note this property name is a string to prevent breaking Closure JS Compiler optimizations. See @lit/reactive-element for more information.

Creates a property accessor on the element prototype if one does not exist and stores a PropertyDeclaration for the property with the given options. The property setter calls the property's hasChanged property option or uses a strict identity check to determine whether or not to request an update.

This method may be overridden to customize properties; however, when doing so, it's important to call super.createProperty to ensure the property is setup correctly. This method calls getPropertyDescriptor internally to get a descriptor to install. To customize what properties do when they are get or set, override getPropertyDescriptor. To customize the options for a property, implement createProperty like this:

Memoized list of all element properties, including any superclass properties. Created lazily on user subclasses when finalizing the class.

Returns a property descriptor to be defined on the given named property. If no descriptor is returned, the property will not become an accessor. For example,

Returns the property options associated with the given property. These options are defined with a PropertyDeclaration via the properties object or the @property decorator and are registered in createProperty(...).

Note, this method should be considered "final" and not overridden. To customize the options for a given property, override createProperty.

User-supplied object that maps property names to PropertyDeclaration objects containing options for configuring reactive properties. When a reactive property is set the element will update and render.

By default properties are public fields, and as such, they should be considered as primarily settable by element users, either via attribute or the property itself. Generally, properties that are changed by the element should be private or protected fields and should use the state: true option. Properties marked as state do not reflect from the corresponding attribute However, sometimes element code does need to set a public property. This should typically only be done in response to user interaction, and an event should be fired informing the user; for example, a checkbox sets its checked property when clicked and fires a changed event. Mutating public properties should typically not be done for non-primitive (object or array) properties. In other cases when an element needs to manage state, a private property set with the state: true option should be used. When needed, state properties can be initialized via public properties to facilitate complex interactions.

Invoked on each update to perform rendering tasks. This method may return any value renderable by lit-html's ChildPart - typically a TemplateResult. Setting properties inside this method will not trigger the element to update.

Node or ShadowRoot into which element DOM should be rendered. Defaults to an open shadowRoot.

Options used when calling attachShadow. Set this property to customize the options for the shadowRoot; for example, to create a closed shadowRoot: {mode: 'closed'}.

Note, these options are used in createRenderRoot. If this method is customized, options should be respected if possible.

Memoized list of all element styles. Created lazily on user subclasses when finalizing the class.

Takes the styles the user supplied via the static styles property and returns the array of styles to apply to the element. Override this method to integrate into a style management system.

Styles are deduplicated preserving the last instance in the list. This is a performance optimization to avoid duplicated styles that can occur especially when composing via subclassing. The last item is kept to try to preserve the cascade order with the assumption that it's most important that last added styles override previous styles.

Array of styles to apply to the element. The styles should be defined using the css tag function, via constructible stylesheets, or imported from native CSS module scripts.

Note on Content Security Policy: Element styles are implemented with <style> tags when the browser doesn't support adopted StyleSheets. To use such <style> tags with the style-src CSP directive, the style-src value must either include 'unsafe-inline' or nonce-<base64-value> with <base64-value> replaced be a server-generated nonce. To provide a nonce to use on generated <style> elements, set window.litNonce to a server-generated nonce in your page's HTML, before loading application code:

Note, this method should be considered final and not overridden. It is overridden on the element instance with a function that triggers the first update.

Invoked when the element is first updated. Implement to perform one time work on the element after update.

Map of changed properties with old values

Setting properties inside this method will trigger the element to update again after this update cycle completes.

Override point for the updateComplete promise.

It is not safe to override the updateComplete getter directly due to a limitation in TypeScript which means it is not possible to call a superclass getter (e.g. super.updateComplete.then(...)) when the target language is ES5 (https://github.com/microsoft/TypeScript/issues/338). This method should be overridden instead. For example:

Is set to true after the first update. The element code cannot assume that renderRoot exists before the element hasUpdated.

True if there is a pending update as a result of calling requestUpdate(). Should only be read.

Performs an element update. Note, if an exception is thrown during the update, firstUpdated and updated will not be called.

Call performUpdate() to immediately process a pending update. This should generally not be needed, but it can be done in rare cases when you need to update synchronously. Note: To ensure performUpdate() synchronously completes a pending update, it should not be overridden. In LitElement 2.x it was suggested to override performUpdate() to also customizing update scheduling. Instead, you should now override scheduleUpdate(). For backwards compatibility with LitElement 2.x, scheduling updates via performUpdate() continues to work, but will make also calling performUpdate() to synchronously process updates difficult.

Requests an update which is processed asynchronously. This should be called when an element should update based on some state not triggered by setting a reactive property. In this case, pass no arguments. It should also be called when manually implementing a property setter. In this case, pass the property name and oldValue to ensure that any configured property options are honored.

name of requesting property

old value of requesting property

property options to use instead of the previously configured options

Schedules an element update. You can override this method to change the timing of updates by returning a Promise. The update will await the returned Promise, and you should resolve the Promise to allow the update to proceed. If this method is overridden, super.scheduleUpdate() must be called.

For instance, to schedule updates to occur just before the next frame:

Controls whether or not update() should be called when the element requests an update. By default, this method always returns true, but this can be customized to control when to update.

Map of changed properties with old values

Updates the element. This method reflects property values to attributes and calls render to render DOM via lit-html. Setting properties inside this method will not trigger another update.

Map of changed properties with old values

Returns a Promise that resolves when the element has completed updating. The Promise value is a boolean that is true if the element completed the update without triggering another update. The Promise result is false if a property was set inside updated(). If the Promise is rejected, an exception was thrown during the update.

To await additional asynchronous work, override the getUpdateComplete method. For example, it is sometimes useful to await a rendered element before fulfilling this Promise. To do this, first await super.getUpdateComplete(), then any subsequent state.

Invoked whenever the element is updated. Implement to perform post-updating tasks via DOM APIs, for example, focusing an element.

Map of changed properties with old values

Setting properties inside this method will trigger the element to update again after this update cycle completes.

Invoked before update() to compute values needed during the update.

Implement willUpdate to compute property values that depend on other properties and are used in the rest of the update process.

Object specifying options for controlling lit-html rendering. Note that while render may be called multiple times on the same container (and renderBefore reference node) to efficiently update the rendered content, only the options passed in during the first render are respected during the lifetime of renders to that unique container + renderBefore combination.

Node used for cloning the template (importNode will be called on this node). This controls the ownerDocument of the rendered DOM, along with any inherited context. Defaults to the global document.

An object to use as the this value for event listeners. It's often useful to set this to the host component rendering a template.

The initial connected state for the top-level part being rendered. If no isConnected option is set, AsyncDirectives will be connected by default. Set to false if the initial render occurs in a disconnected tree and AsyncDirectives should see isConnected === false for their initial render. The part.setConnected() method must be used subsequent to initial render to change the connected state of the part.

A DOM node before which to render content in the container.


1. LitElementAttributesControllersDev modeLifecycleOtherPropertiesRenderingStylesUpdates
2. Attributes
3. Controllers
4. Dev mode
5. Lifecycle
6. Other
7. Properties
8. Rendering
9. Styles
10. Updates
11. RenderOptions


1. Attributes
2. Controllers
3. Dev mode
4. Lifecycle
5. Other
6. Properties
7. Rendering
8. Styles
9. Updates

```
import { LitElement } from 'lit';
```

```
LitElement
```

```
render
```

```
properties
```

```
property
```

```
string
```

```
null | string
```

```
null | string
```

```
super.attributeChangedCallback(name, _old, value)
```

```
attributeChangedCallback
```

```
ReactiveController
```

```
ReactiveController
```

```
addController()
```

```
hostConnected()
```

```
ReactiveController
```

```
ReactiveController
```

```
// Disable for all ReactiveElement subclassesReactiveElement.disableWarning?.('migration');// Disable for only MyElement and subclassesMyElement.disableWarning?.('migration');
```

```
// Disable for all ReactiveElement subclassesReactiveElement.disableWarning?.('migration');// Disable for only MyElement and subclassesMyElement.disableWarning?.('migration');
```

```
// Disable for all ReactiveElement subclasses
```

```
ReactiveElement.disableWarning?.('migration');
```

```
// Disable for only MyElement and subclasses
```

```
MyElement.disableWarning?.('migration');
```

```
// Enable for all ReactiveElement subclassesReactiveElement.enableWarning?.('migration');// Enable for only MyElement and subclassesMyElement.enableWarning?.('migration');
```

```
// Enable for all ReactiveElement subclassesReactiveElement.enableWarning?.('migration');// Enable for only MyElement and subclassesMyElement.enableWarning?.('migration');
```

```
// Enable for all ReactiveElement subclasses
```

```
ReactiveElement.enableWarning?.('migration');
```

```
// Enable for only MyElement and subclasses
```

```
MyElement.enableWarning?.('migration');
```

```
connectedCallback()
```

```
connectedCallback() {  super.connectedCallback();  addEventListener('keydown', this._handleKeydown);}
```

```
connectedCallback() {  super.connectedCallback();  addEventListener('keydown', this._handleKeydown);}
```

```
connectedCallback() {
```

```
super.connectedCallback();
```

```
addEventListener('keydown', this._handleKeydown);
```

```
}
```

```
connectedCallback()
```

```
disconnectedCallback()
```

```
disconnectedCallback()
```

```
disconnectedCallback() {  super.disconnectedCallback();  window.removeEventListener('keydown', this._handleKeydown);}
```

```
disconnectedCallback() {  super.disconnectedCallback();  window.removeEventListener('keydown', this._handleKeydown);}
```

```
disconnectedCallback() {
```

```
super.disconnectedCallback();
```

```
window.removeEventListener('keydown', this._handleKeydown);
```

```
}
```

```
Initializer
```

```
ReactiveElement
```

```
ReactiveController
```

```
const myDecorator = (target: typeof ReactiveElement, key: string) => {  target.addInitializer((instance: ReactiveElement) => {    // This is run during construction of the element    new MyController(instance);  });}
```

```
const myDecorator = (target: typeof ReactiveElement, key: string) => {  target.addInitializer((instance: ReactiveElement) => {    // This is run during construction of the element    new MyController(instance);  });}
```

```
const myDecorator = (target: typeof ReactiveElement, key: string) => {
```

```
target.addInitializer((instance: ReactiveElement) => {
```

```
// This is run during construction of the element
```

```
new MyController(instance);
```

```
});
```

```
}
```

```
class MyElement extends LitElement {  @myDecorator foo;}
```

```
class MyElement extends LitElement {  @myDecorator foo;}
```

```
class MyElement extends LitElement {
```

```
@myDecorator foo;
```

```
}
```

```
finalized
```

```
finalize
```

```
PropertyDeclaration
```

```
hasChanged
```

```
PropertyKey
```

```
PropertyDeclaration<unknown, unknown>
```

```
super.createProperty
```

```
getPropertyDescriptor
```

```
getPropertyDescriptor
```

```
createProperty
```

```
static createProperty(name, options) {  options = Object.assign(options, {myOption: true});  super.createProperty(name, options);}
```

```
static createProperty(name, options) {  options = Object.assign(options, {myOption: true});  super.createProperty(name, options);}
```

```
static createProperty(name, options) {
```

```
options = Object.assign(options, {myOption: true});
```

```
super.createProperty(name, options);
```

```
}
```

```
PropertyKey
```

```
string | symbol
```

```
PropertyDeclaration<unknown, unknown>
```

```
class MyElement extends LitElement {  static getPropertyDescriptor(name, key, options) {    const defaultDescriptor =        super.getPropertyDescriptor(name, key, options);    const setter = defaultDescriptor.set;    return {      get: defaultDescriptor.get,      set(value) {        setter.call(this, value);        // custom action.      },      configurable: true,      enumerable: true    }  }}
```

```
class MyElement extends LitElement {  static getPropertyDescriptor(name, key, options) {    const defaultDescriptor =        super.getPropertyDescriptor(name, key, options);    const setter = defaultDescriptor.set;    return {      get: defaultDescriptor.get,      set(value) {        setter.call(this, value);        // custom action.      },      configurable: true,      enumerable: true    }  }}
```

```
class MyElement extends LitElement {
```

```
static getPropertyDescriptor(name, key, options) {
```

```
const defaultDescriptor =
```

```
super.getPropertyDescriptor(name, key, options);
```

```
const setter = defaultDescriptor.set;
```

```
return {
```

```
get: defaultDescriptor.get,
```

```
set(value) {
```

```
setter.call(this, value);
```

```
// custom action.
```

```
},
```

```
configurable: true,
```

```
enumerable: true
```

```
}
```

```
}
```

```
}
```

```
PropertyDeclaration
```

```
properties
```

```
@property
```

```
createProperty(...)
```

```
PropertyKey
```

```
createProperty
```

```
PropertyDeclaration
```

```
state: true
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
state: true
```

```
ChildPart
```

```
TemplateResult
```

```
attachShadow
```

```
{mode: 'closed'}
```

```
createRenderRoot
```

```
static styles
```

```
CSSResultGroup
```

```
css
```

```
<style>
```

```
<style>
```

```
nonce-<base64-value>
```

```
<base64-value>
```

```
<style>
```

```
window.litNonce
```

```
<script>  // Generated and unique per request:  window.litNonce = 'a1b2c3d4';</script>
```

```
<script>  // Generated and unique per request:  window.litNonce = 'a1b2c3d4';</script>
```

```
<script>
```

```
// Generated and unique per request:
```

```
window.litNonce = 'a1b2c3d4';
```

```
</script>
```

```
boolean
```

```
Map<PropertyKey, unknown> | PropertyValueMap<any>
```

```
firstUpdated() {  this.renderRoot.getElementById('my-text-area').focus();}
```

```
firstUpdated() {  this.renderRoot.getElementById('my-text-area').focus();}
```

```
firstUpdated() {
```

```
this.renderRoot.getElementById('my-text-area').focus();
```

```
}
```

```
updateComplete
```

```
updateComplete
```

```
super.updateComplete.then(...)
```

```
class MyElement extends LitElement {  override async getUpdateComplete() {    const result = await super.getUpdateComplete();    await this._myChild.updateComplete;    return result;  }}
```

```
class MyElement extends LitElement {  override async getUpdateComplete() {    const result = await super.getUpdateComplete();    await this._myChild.updateComplete;    return result;  }}
```

```
class MyElement extends LitElement {
```

```
override async getUpdateComplete() {
```

```
const result = await super.getUpdateComplete();
```

```
await this._myChild.updateComplete;
```

```
return result;
```

```
}
```

```
}
```

```
true
```

```
renderRoot
```

```
hasUpdated
```

```
requestUpdate()
```

```
firstUpdated
```

```
updated
```

```
performUpdate()
```

```
performUpdate()
```

```
performUpdate()
```

```
scheduleUpdate()
```

```
performUpdate()
```

```
performUpdate()
```

```
name
```

```
oldValue
```

```
PropertyKey
```

```
unknown
```

```
PropertyDeclaration<unknown, unknown>
```

```
super.scheduleUpdate()
```

```
override protected async scheduleUpdate(): Promise<unknown> {  await new Promise((resolve) => requestAnimationFrame(() => resolve()));  super.scheduleUpdate();}
```

```
override protected async scheduleUpdate(): Promise<unknown> {  await new Promise((resolve) => requestAnimationFrame(() => resolve()));  super.scheduleUpdate();}
```

```
override protected async scheduleUpdate(): Promise<unknown> {
```

```
await new Promise((resolve) => requestAnimationFrame(() => resolve()));
```

```
super.scheduleUpdate();
```

```
}
```

```
update()
```

```
true
```

```
Map<PropertyKey, unknown> | PropertyValueMap<any>
```

```
render
```

```
Map<PropertyKey, unknown> | PropertyValueMap<any>
```

```
true
```

```
false
```

```
updated()
```

```
getUpdateComplete
```

```
super.getUpdateComplete()
```

```
Map<PropertyKey, unknown> | PropertyValueMap<any>
```

```
update()
```

```
Map<PropertyKey, unknown> | PropertyValueMap<any>
```

```
willUpdate
```

```
willUpdate(changedProperties) {  // only need to check changed properties for an expensive computation.  if (changedProperties.has('firstName') || changedProperties.has('lastName')) {    this.sha = computeSHA(`${this.firstName} ${this.lastName}`);  }}render() {  return html`SHA: ${this.sha}`;}
```

```
willUpdate(changedProperties) {  // only need to check changed properties for an expensive computation.  if (changedProperties.has('firstName') || changedProperties.has('lastName')) {    this.sha = computeSHA(`${this.firstName} ${this.lastName}`);  }}render() {  return html`SHA: ${this.sha}`;}
```

```
willUpdate(changedProperties) {
```

```
// only need to check changed properties for an expensive computation.
```

```
if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
```

```
this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
```

```
}
```

```
}
```

```
render() {
```

```
return html`SHA: ${this.sha}`;
```

```
}
```

```
render
```

```
container
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
import { RenderOptions } from 'lit';
```

```
importNode
```

```
ownerDocument
```

```
document
```

```
this
```

```
isConnected
```

```
AsyncDirective
```

```
false
```

```
AsyncDirective
```

```
isConnected === false
```

```
part.setConnected()
```

