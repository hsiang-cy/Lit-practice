# ReactiveElement

Base element class which manages element properties and attributes. When properties change, the update method is asynchronously called. This method should be supplied by subclassers to render updates as desired.

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

On first connection, creates the element's renderRoot, sets up element styling, and enables updating.

Allows for super.disconnectedCallback() in extensions while reserving the possibility of making non-breaking feature additions when disconnecting at some point in the future.

Adds an initializer function to the class that is called during instance construction.

This is useful for code that runs against a ReactiveElement subclass, such as a decorator, that needs to do work for each instance, such as setting up a ReactiveController.

Decorating a field will then cause each instance to run an initializer that adds a controller:

Initializers are stored per-constructor. Adding an initializer to a subclass does not add it to a superclass. Since initializers are run in constructors, initializers will run in order of the class hierarchy, starting with superclasses and progressing to the instance's class.

Creates property accessors for registered properties, sets up element styling, and ensures any superclasses are also finalized. Returns true if the element was finalized.

Marks class as having finished creating properties.

Creates a property accessor on the element prototype if one does not exist and stores a PropertyDeclaration for the property with the given options. The property setter calls the property's hasChanged property option or uses a strict identity check to determine whether or not to request an update.

This method may be overridden to customize properties; however, when doing so, it's important to call super.createProperty to ensure the property is setup correctly. This method calls getPropertyDescriptor internally to get a descriptor to install. To customize what properties do when they are get or set, override getPropertyDescriptor. To customize the options for a property, implement createProperty like this:

Memoized list of all element properties, including any superclass properties. Created lazily on user subclasses when finalizing the class.

Returns a property descriptor to be defined on the given named property. If no descriptor is returned, the property will not become an accessor. For example,

Returns the property options associated with the given property. These options are defined with a PropertyDeclaration via the properties object or the @property decorator and are registered in createProperty(...).

Note, this method should be considered "final" and not overridden. To customize the options for a given property, override createProperty.

User-supplied object that maps property names to PropertyDeclaration objects containing options for configuring reactive properties. When a reactive property is set the element will update and render.

By default properties are public fields, and as such, they should be considered as primarily settable by element users, either via attribute or the property itself. Generally, properties that are changed by the element should be private or protected fields and should use the state: true option. Properties marked as state do not reflect from the corresponding attribute However, sometimes element code does need to set a public property. This should typically only be done in response to user interaction, and an event should be fired informing the user; for example, a checkbox sets its checked property when clicked and fires a changed event. Mutating public properties should typically not be done for non-primitive (object or array) properties. In other cases when an element needs to manage state, a private property set with the state: true option should be used. When needed, state properties can be initialized via public properties to facilitate complex interactions.

Returns the node into which the element should render and by default creates and returns an open shadowRoot. Implement to customize where the element's DOM is rendered. For example, to render into the element's childNodes, return this.

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

Updates the element. This method reflects property values to attributes. It can be overridden to render and keep updated element DOM. Setting properties inside this method will not trigger another update.

Map of changed properties with old values

Returns a Promise that resolves when the element has completed updating. The Promise value is a boolean that is true if the element completed the update without triggering another update. The Promise result is false if a property was set inside updated(). If the Promise is rejected, an exception was thrown during the update.

To await additional asynchronous work, override the getUpdateComplete method. For example, it is sometimes useful to await a rendered element before fulfilling this Promise. To do this, first await super.getUpdateComplete(), then any subsequent state.

Invoked whenever the element is updated. Implement to perform post-updating tasks via DOM APIs, for example, focusing an element.

Map of changed properties with old values

Setting properties inside this method will trigger the element to update again after this update cycle completes.

Invoked before update() to compute values needed during the update.

Implement willUpdate to compute property values that depend on other properties and are used in the rest of the update process.

Converts property values to and from attribute values.

Called to convert an attribute value to a property value.

Called to convert a property value to an attribute value.

It returns unknown instead of string, to be compatible with https://github.com/WICG/trusted-types (and similar efforts).

Defines options for a property accessor.

Indicates how and whether the property becomes an observed attribute. If the value is false, the property is not added to observedAttributes. If true or absent, the lowercased property name is observed (e.g. fooBar becomes foobar). If a string, the string value is observed (e.g attribute: 'foo-bar').

Indicates how to convert the attribute to/from a property. If this value is a function, it is used to convert the attribute value a the property value. If it's an object, it can have keys for fromAttribute and toAttribute. If no toAttribute function is provided and reflect is set to true, the property value is set directly to the attribute. A default converter is used if none is provided; it supports Boolean, String, Number, Object, and Array. Note, when a property changes and the converter is used to update the attribute, the property is never updated again as a result of the attribute changing, and vice versa.

Indicates whether an accessor will be created for this property. By default, an accessor will be generated for this property that requests an update when set. If this flag is true, no accessor will be created, and it will be the user's responsibility to call this.requestUpdate(propertyName, oldValue) to request an update when the property changes.

Indicates if the property should reflect to an attribute. If true, when the property is set, the attribute is set using the attribute name determined according to the rules for the attribute property option and the value of the property converted using the rules from the converter property option.

When set to true, indicates the property is internal private state. The property should not be set by users. When using TypeScript, this property should be marked as private or protected, and it is also a common practice to use a leading _ in the name. The property is not added to observedAttributes.

Indicates the type of the property. This is used only as a hint for the converter to determine how to convert the attribute to/from a property.

A function that indicates if a property should be considered changed when it is set. The function should take the newValue and oldValue and return true if an update should be requested.

Map of properties to PropertyDeclaration options. For each property an accessor is made, and the property is processed according to the PropertyDeclaration options.

A Map of property keys to values.

Takes an optional type parameter T, which when specified as a non-any, non-unknown type, will make the Map more strongly-typed, associating the map keys with their corresponding value type on T. Use PropertyValues<this> when overriding ReactiveElement.update() and other lifecycle methods in order to get stronger type-checking on keys and values.


1. ReactiveElementAttributesControllersDev modeLifecycleOtherPropertiesRenderingStylesUpdates
2. Attributes
3. Controllers
4. Dev mode
5. Lifecycle
6. Other
7. Properties
8. Rendering
9. Styles
10. Updates
11. ComplexAttributeConverter
12. PropertyDeclaration
13. PropertyDeclarations
14. PropertyValues


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
update
```

```
import { ReactiveElement } from 'lit';
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
super.disconnectedCallback()
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
this
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
import { ComplexAttributeConverter } from 'lit';
```

```
null | string
```

```
TypeHint
```

```
Type
```

```
TypeHint
```

```
import { PropertyDeclaration } from 'lit';
```

```
false
```

```
observedAttributes
```

```
fooBar
```

```
foobar
```

```
attribute: 'foo-bar'
```

```
fromAttribute
```

```
toAttribute
```

```
toAttribute
```

```
reflect
```

```
true
```

```
converter
```

```
Boolean
```

```
String
```

```
Number
```

```
Object
```

```
Array
```

```
true
```

```
this.requestUpdate(propertyName, oldValue)
```

```
true
```

```
attribute
```

```
converter
```

```
true
```

```
private
```

```
protected
```

```
_
```

```
observedAttributes
```

```
converter
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
import { PropertyDeclarations } from 'lit';
```

```
import { PropertyValues } from 'lit';
```

```
T ? PropertyValueMap<T> : Map<PropertyKey, unknown>
```

```
PropertyValues<this>
```

