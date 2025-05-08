# Context

Context is a way of making data available to entire component subtrees without having to manually bind properties to every component. The data is "contextually" available, such that ancestor elements in between a provider of data and consumer of data aren't even aware of it.

Lit's context implementation is available in the @lit/context package:

Context is useful for data that needs to be consumed by a wide variety and large number of components - things like an app's data store, the current user, a UI theme - or when data-binding isn't an option, such as when an element needs to provide data to its light DOM children.

Context is very similar to React's Context, or to dependency injection systems like Angular's, with some important differences that make Context work with the dynamic nature of the DOM, and enable interoperability across different web components libraries, frameworks and plain JavaScript.

Using context involves a context object (sometimes called a key), a provider and a consumer, which communicate using the context object.

Context definition (logger-context.ts):

Provider:

Consumer:

Lit's context is based on the Context Community Protocol by the W3C's Web Components Community Group.

This protocol enables interoperability between elements (or even non-element code) regardless of how they were built. Via the context protocol, a Lit-based element can provide data to a consumer not built with Lit, or vice versa.

The Context Protocol is based on DOM events. A consumer fires a context-request event that carries the context key that it wants, and any element above it can listen for the context-request event and provide data for that context key.

@lit/context implements this event-based protocol and makes it available via a few reactive controllers and decorators.

Contexts are identified by context objects or context keys. They are objects that represent some potential data to be shared by the context object identity. You can think of them as similar to Map keys.

Providers are usually elements (but can be any event handler code) that provide data for specific context keys.

Consumers request data for specific context keys.

When a consumer requests data for a context, it can tell the provider that it wants to subscribe to changes in the context. If the provider has new data, the consumer will be notified and can automatically update.

Every usage of context must have a context object to coordinate the data request. This context object represents the identity and type of data that is provided.

Context objects are created with the createContext() function:

It is recommended to put context objects in their own module so that they're importable independent of specific providers and consumers.

createContext() takes any value and returns it directly. In TypeScript, the value is cast to a typed Context object, which carries the type of the context value with it.

In case of a mistake like this:

TypeScript will warn that the type string is not assignable to the type Logger. Note that this check is currently only for public fields.

Context objects are used by providers to match a context request event to a value. Contexts are compared with strict equality (===), so a provider will only handle a context request if its context key equals the context key of the request.

This means that there are two main ways to create a context object:

If you want two separate createContext() calls to refer to the same context, then use a key that will be equal under strict equality like a string:

Beware though that two modules in your app could use the same context key to refer to different objects. To avoid unintended collisions you may want to use a relatively unique string, e.g. like 'console-logger' instead of 'logger'.

Usually it's best to use a globally unique context object. Symbols are one of the easiest ways to do this.

There are two ways in @lit/context to provide a context value: the ContextProvider controller and the @provide() decorator.

The @provide() decorator is the easiest way to provide a value if you're using decorators. It creates a ContextProvider controller for you.

Decorate a property with @provide() and give it the context key:

You can make the property also a reactive property with @property() or @state() so that setting it will update the provider element as well as context consumers.

Context properties are often intended to be private. You can make private properties reactive with @state():

Making a context property public lets an element provide a public field to its child tree:

ContextProvider is a reactive controller that manages context-request event handlers for you.

ContextProvider can take an initial value as an option in the constructor:

Or you can call setValue():

The @consume() decorator is the easiest way to consume a value if you're using decorators. It creates a ContextConsumer controller for you.

Decorate a property with @consume() and give it the context key:

When this element is connected to the document, it will automatically fire a context-request event, get a provided value, assign it to the property, and trigger an update of the element.

ContextConsumer is a reactive controller that manages dispatching the context-request event for you. The controller will cause the host element to update when new values are provided. The provided value is then available at the .value property of the controller.

Consumers can subscribe to context values so that if a provider has a new value, it can give it to all subscribed consumers, causing them to update.

You can subscribe with the @consume() decorator:

and the ContextConsumer controller:

The most common context use cases involve data that is global to a page and possibly only sparsely needed in components throughout the page. Without context it's possible that most or all components would need to accept and propagate reactive properties for the data.

App-global services, like loggers, analytics, data stores, can be provided by context. An advantage of context over importing from a common module are the late coupling and tree-scoping that context provides. Tests can easily provide mock services, or different parts of the page can be given different service instances.

Themes are sets of styles that apply to the entire page or entire subtrees within the page - exactly the kind of scope of data that context provides.

One way of building a theme system would be to define a Theme type that containers can provide that holds named styles. Elements that want to apply a theme can consume the theme object and look up styles by name. Custom theme reactive controllers can wrap ContextProvider and ContextConsumer to reduce boilerplate.

Context can be used to pass data from a parent to its light DOM children. Since the parent does usually not create the light DOM children, it cannot leverage template-based data-binding to pass data to them, but it can listen to and respond to context-request events.

For example, consider a code editor element with plugins for different language modes. You can make a plain HTML system for adding features using context:

In this case <code-editor> would provide an API for adding language modes via context, and plugin elements would consume that API and add themselves to the editor.

Sometimes reusable components will need to format data or URLs in an application-specific way. For example, a documentation viewer that renders a link to another item. The component will not know the URL space of the application.

In these cases the component can depend on a context-provided function that will apply the application-specific formatting to the data or link.

These API docs are a summary until generated API docs are available

Creates a typed Context object

Import:

Signature:

Contexts are compared with with strict equality.

If you want two separate createContext() calls to referrer to the same context, then use a key that will by equal under strict equality like a string for Symbol.for():

If you want a context to be unique so that it's guaranteed to not collide with other contexts, use a key that's unique under strict equality, like a Symbol() or object.:

The ValueType type parameter is the type of value that can be provided by this context. It's uses to provide accurate types in the other context APIs.

A property decorator that adds a ContextProvider controller to the component making it respond to any context-request events from its children consumer.

Import:

Signature:

A property decorator that adds a ContextConsumer controller to the component which will retrieve a value for the property via the Context protocol.

Import:

Signature:

subscribe is false by default. Set it to true to subscribe to updates to the context provided value.

A ReactiveController which adds context provider behavior to a custom element by listening to context-request events.

Import:

Constructor:

Members

setValue(v: T, force = false): void

Sets the value provided, and notifies any subscribed consumers of the new value if the value changed. force causes a notification even if the value didn't change, which can be useful if an object had a deep property change.

A ReactiveController which adds context consuming behavior to a custom element by dispatching context-request events.

Import:

Constructor:

Members

value: ContextType<C>

The current value for the context.

When the host element is connected to the document it will emit a context-request event with its context key. When the context request is satisfied the controller will invoke the callback, if present, and trigger a host update so it can respond to the new value.

It will also call the dispose method given by the provider when the host element is disconnected.

A ContextRoot can be used to gather unsatisfied context requests and re-dispatch them when new providers which satisfy matching context keys are available. This allows providers to be added to a DOM tree, or upgraded, after the consumers.

Import:

Constructor:

Members

attach(element: HTMLElement): void

Attaches the ContextRoot to this element and starts listening to context-request events.

detach(element: HTMLElement): void

Detaches the ContextRoot from this element, stops listening to context-request events.

The event fired by consumers to request a context value. The API and behavior of this event is specified by the Context Protocol.

Import:

The context-request bubbles and is composed.

Members

readonly context: C

The context object this event is requesting a value for

readonly contextTarget: Element

The DOM element that initiated the context request

readonly callback: ContextCallback<ContextType<C>>

The function to call to provide a context value

readonly subscribe?: boolean

Whether the consumers wants to subscribe to new context values

A callback which is provided by a context requester and is called with the value satisfying the request.

This callback can be called multiple times by context providers as the requested value is changed.

Import:

Signature:


1. Example
2. Key ConceptsContext ProtocolContext ObjectsProvidersConsumersSubscriptions
3. Context Protocol
4. Context Objects
5. Providers
6. Consumers
7. Subscriptions
8. UsageDefining a contextProviding a contextConsuming a context
9. Defining a context
10. Providing a context
11. Consuming a context
12. Example Use CasesCurrent user, locale, etc.ServicesThemesHTML-based pluginsData formatters, link generators, etc.
13. Current user, locale, etc.
14. Services
15. Themes
16. HTML-based plugins
17. Data formatters, link generators, etc.
18. APIcreateContext()@provide()@consume()ContextProviderContextConsumerContextRootContextRequestEventContextCallback
19. createContext()
20. @provide()
21. @consume()
22. ContextProvider
23. ContextConsumer
24. ContextRoot
25. ContextRequestEvent
26. ContextCallback


1. Context Protocol
2. Context Objects
3. Providers
4. Consumers
5. Subscriptions


1. Defining a context
2. Providing a context
3. Consuming a context


1. Current user, locale, etc.
2. Services
3. Themes
4. HTML-based plugins
5. Data formatters, link generators, etc.


1. createContext()
2. @provide()
3. @consume()
4. ContextProvider
5. ContextConsumer
6. ContextRoot
7. ContextRequestEvent
8. ContextCallback


1. With a value that is globally unique, like an object ({}) or symbol (Symbol())
2. With a value that is not globally unique, so that it can be equal under strict equality, like a string ('logger') or global symbol (Symbol.for('logger')).


* setValue(v: T, force = false): void Sets the value provided, and notifies any subscribed consumers of the new value if the value changed. force causes a notification even if the value didn't change, which can be useful if an object had a deep property change. 


* value: ContextType<C> The current value for the context. 


* attach(element: HTMLElement): void Attaches the ContextRoot to this element and starts listening to context-request events. 
* detach(element: HTMLElement): void Detaches the ContextRoot from this element, stops listening to context-request events. 


* readonly context: C The context object this event is requesting a value for 
* readonly contextTarget: Element The DOM element that initiated the context request 
* readonly callback: ContextCallback<ContextType<C>> The function to call to provide a context value 
* readonly subscribe?: boolean Whether the consumers wants to subscribe to new context values 

```
@lit/context
```

```
npm i @lit/context
```

```
npm i @lit/context
```

```
npm i @lit/context
```

```
logger-context.ts
```

```
import {createContext} from '@lit/context';import type {Logger} from 'my-logging-library';export type {Logger} from 'my-logging-library';export const loggerContext = createContext<Logger>('logger');
```

```
import {createContext} from '@lit/context';import type {Logger} from 'my-logging-library';export type {Logger} from 'my-logging-library';export const loggerContext = createContext<Logger>('logger');
```

```
import {createContext} from '@lit/context';
```

```
import type {Logger} from 'my-logging-library';
```

```
export type {Logger} from 'my-logging-library';
```

```
export const loggerContext = createContext<Logger>('logger');
```

```
import {LitElement, property, html} from 'lit';import {provide} from '@lit/context';
import {Logger} from 'my-logging-library';import {loggerContext} from './logger-context.js';
@customElement('my-app')class MyApp extends LitElement {
  @provide({context: loggerContext})  logger = new Logger();
  render() {    return html`...`;  }}
```

```
import {LitElement, property, html} from 'lit';import {provide} from '@lit/context';
import {Logger} from 'my-logging-library';import {loggerContext} from './logger-context.js';
@customElement('my-app')class MyApp extends LitElement {
  @provide({context: loggerContext})  logger = new Logger();
  render() {    return html`...`;  }}
```

```
import {LitElement, property, html} from 'lit';
```

```
import {provide} from '@lit/context';
```

```
import {Logger} from 'my-logging-library';
```

```
import {loggerContext} from './logger-context.js';
```

```
@customElement('my-app')
```

```
class MyApp extends LitElement {
```

```
@provide({context: loggerContext})
```

```
logger = new Logger();
```

```
render() {
```

```
return html`...`;
```

```
}
```

```
}
```

```
import {LitElement, property} from 'lit';import {consume} from '@lit/context';
import {type Logger, loggerContext} from './logger-context.js';
export class MyElement extends LitElement {
  @consume({context: loggerContext})  @property({attribute: false})  public logger?: Logger;
  private doThing() {    this.logger?.log('A thing was done');  }}
```

```
import {LitElement, property} from 'lit';import {consume} from '@lit/context';
import {type Logger, loggerContext} from './logger-context.js';
export class MyElement extends LitElement {
  @consume({context: loggerContext})  @property({attribute: false})  public logger?: Logger;
  private doThing() {    this.logger?.log('A thing was done');  }}
```

```
import {LitElement, property} from 'lit';
```

```
import {consume} from '@lit/context';
```

```
import {type Logger, loggerContext} from './logger-context.js';
```

```
export class MyElement extends LitElement {
```

```
@consume({context: loggerContext})
```

```
@property({attribute: false})
```

```
public logger?: Logger;
```

```
private doThing() {
```

```
this.logger?.log('A thing was done');
```

```
}
```

```
}
```

```
context-request
```

```
context-request
```

```
@lit/context
```

```
createContext()
```

```
export const myContext = createContext(Symbol('my-context'));
```

```
export const myContext = createContext(Symbol('my-context'));
```

```
export const myContext = createContext(Symbol('my-context'));
```

```
createContext()
```

```
Context
```

```
const myContext = createContext<Logger>(Symbol('logger'));
class MyElement extends LitElement {  @provide({context: myContext})  name: string}
```

```
const myContext = createContext<Logger>(Symbol('logger'));
class MyElement extends LitElement {  @provide({context: myContext})  name: string}
```

```
const myContext = createContext<Logger>(Symbol('logger'));
```

```
class MyElement extends LitElement {
```

```
@provide({context: myContext})
```

```
name: string
```

```
}
```

```
string
```

```
Logger
```

```
===
```

```
{}
```

```
Symbol()
```

```
'logger'
```

```
Symbol.for('logger')
```

```
createContext()
```

```
// truecreateContext('my-context') === createContext('my-context')
```

```
// truecreateContext('my-context') === createContext('my-context')
```

```
// true
```

```
createContext('my-context') === createContext('my-context')
```

```
'console-logger'
```

```
'logger'
```

```
@lit/context
```

```
@provide()
```

```
@provide()
```

```
@provide()
```

```
@provide()
```

```
import {LitElement, html} from 'lit';import {property} from 'lit/decorators.js';import {provide} from '@lit/context';import {myContext, MyData} from './my-context.js';
class MyApp extends LitElement {  @provide({context: myContext})  myData: MyData;}
```

```
import {LitElement, html} from 'lit';import {property} from 'lit/decorators.js';import {provide} from '@lit/context';import {myContext, MyData} from './my-context.js';
class MyApp extends LitElement {  @provide({context: myContext})  myData: MyData;}
```

```
import {LitElement, html} from 'lit';
```

```
import {property} from 'lit/decorators.js';
```

```
import {provide} from '@lit/context';
```

```
import {myContext, MyData} from './my-context.js';
```

```
class MyApp extends LitElement {
```

```
@provide({context: myContext})
```

```
myData: MyData;
```

```
}
```

```
@property()
```

```
@state()
```

```
@provide({context: myContext})  @property({attribute: false})  myData: MyData;
```

```
@provide({context: myContext})  @property({attribute: false})  myData: MyData;
```

```
@provide({context: myContext})
```

```
@property({attribute: false})
```

```
myData: MyData;
```

```
@state()
```

```
@provide({context: myContext})  @state()  private _myData: MyData;
```

```
@provide({context: myContext})  @state()  private _myData: MyData;
```

```
@provide({context: myContext})
```

```
@state()
```

```
private _myData: MyData;
```

```
html`<my-provider-element .myData=${someData}>`
```

```
html`<my-provider-element .myData=${someData}>`
```

```
html`<my-provider-element .myData=${someData}>`
```

```
ContextProvider
```

```
context-request
```

```
import {LitElement, html} from 'lit';import {ContextProvider} from '@lit/context';import {myContext} from './my-context.js';
export class MyApp extends LitElement {  private _provider = new ContextProvider(this, {context: myContext});}
```

```
import {LitElement, html} from 'lit';import {ContextProvider} from '@lit/context';import {myContext} from './my-context.js';
export class MyApp extends LitElement {  private _provider = new ContextProvider(this, {context: myContext});}
```

```
import {LitElement, html} from 'lit';
```

```
import {ContextProvider} from '@lit/context';
```

```
import {myContext} from './my-context.js';
```

```
export class MyApp extends LitElement {
```

```
private _provider = new ContextProvider(this, {context: myContext});
```

```
}
```

```
private _provider = new ContextProvider(this, {context: myContext, initialValue: myData});
```

```
private _provider = new ContextProvider(this, {context: myContext, initialValue: myData});
```

```
private _provider = new ContextProvider(this, {context: myContext, initialValue: myData});
```

```
setValue()
```

```
this._provider.setValue(myData);
```

```
this._provider.setValue(myData);
```

```
this._provider.setValue(myData);
```

```
@consume()
```

```
@consume()
```

```
@consume()
```

```
import {LitElement, html} from 'lit';import {consume} from '@lit/context';import {myContext, MyData} from './my-context.js';
class MyElement extends LitElement {  @consume({context: myContext})  myData: MyData;}
```

```
import {LitElement, html} from 'lit';import {consume} from '@lit/context';import {myContext, MyData} from './my-context.js';
class MyElement extends LitElement {  @consume({context: myContext})  myData: MyData;}
```

```
import {LitElement, html} from 'lit';
```

```
import {consume} from '@lit/context';
```

```
import {myContext, MyData} from './my-context.js';
```

```
class MyElement extends LitElement {
```

```
@consume({context: myContext})
```

```
myData: MyData;
```

```
}
```

```
context-request
```

```
context-request
```

```
.value
```

```
import {LitElement, property} from 'lit';import {ContextConsumer} from '@lit/context';import {myContext} from './my-context.js';
export class MyElement extends LitElement {  private _myData = new ContextConsumer(this, {context: myContext});
  render() {    const myData = this._myData.value;    return html`...`;  }}
```

```
import {LitElement, property} from 'lit';import {ContextConsumer} from '@lit/context';import {myContext} from './my-context.js';
export class MyElement extends LitElement {  private _myData = new ContextConsumer(this, {context: myContext});
  render() {    const myData = this._myData.value;    return html`...`;  }}
```

```
import {LitElement, property} from 'lit';
```

```
import {ContextConsumer} from '@lit/context';
```

```
import {myContext} from './my-context.js';
```

```
export class MyElement extends LitElement {
```

```
private _myData = new ContextConsumer(this, {context: myContext});
```

```
render() {
```

```
const myData = this._myData.value;
```

```
return html`...`;
```

```
}
```

```
}
```

```
@consume()
```

```
@consume({context: myContext, subscribe: true})  myData: MyData;
```

```
@consume({context: myContext, subscribe: true})  myData: MyData;
```

```
@consume({context: myContext, subscribe: true})
```

```
myData: MyData;
```

```
private _myData = new ContextConsumer(this,    {      context: myContext,      subscribe: true,    }  );
```

```
private _myData = new ContextConsumer(this,    {      context: myContext,      subscribe: true,    }  );
```

```
private _myData = new ContextConsumer(this,
```

```
{
```

```
context: myContext,
```

```
subscribe: true,
```

```
}
```

```
);
```

```
Theme
```

```
context-request
```

```
<code-editor>  <code-editor-javascript-mode></code-editor-javascript-mode>  <code-editor-python-mode></code-editor-python-mode></code-editor>
```

```
<code-editor>  <code-editor-javascript-mode></code-editor-javascript-mode>  <code-editor-python-mode></code-editor-python-mode></code-editor>
```

```
<code-editor>
```

```
<code-editor-javascript-mode></code-editor-javascript-mode>
```

```
<code-editor-python-mode></code-editor-python-mode>
```

```
</code-editor>
```

```
<code-editor>
```

```
createContext()
```

```
import {createContext} from '@lit/context';
```

```
import {createContext} from '@lit/context';
```

```
import {createContext} from '@lit/context';
```

```
function createContext<ValueType, K = unknown>(key: K): Context<K, ValueType>;
```

```
function createContext<ValueType, K = unknown>(key: K): Context<K, ValueType>;
```

```
function createContext<ValueType, K = unknown>(key: K): Context<K, ValueType>;
```

```
createContext()
```

```
Symbol.for()
```

```
// truecreateContext('my-context') === createContext('my-context')// truecreateContext(Symbol.for('my-context')) === createContext(Symbol.for('my-context'))
```

```
// truecreateContext('my-context') === createContext('my-context')// truecreateContext(Symbol.for('my-context')) === createContext(Symbol.for('my-context'))
```

```
// true
```

```
createContext('my-context') === createContext('my-context')
```

```
// true
```

```
createContext(Symbol.for('my-context')) === createContext(Symbol.for('my-context'))
```

```
Symbol()
```

```
// falsecreateContext(Symbol('my-context')) === createContext(Symbol('my-context'))// falsecreateContext({}) === createContext({})
```

```
// falsecreateContext(Symbol('my-context')) === createContext(Symbol('my-context'))// falsecreateContext({}) === createContext({})
```

```
// false
```

```
createContext(Symbol('my-context')) === createContext(Symbol('my-context'))
```

```
// false
```

```
createContext({}) === createContext({})
```

```
ValueType
```

```
@provide()
```

```
context-request
```

```
import {provide} from '@lit/context';
```

```
import {provide} from '@lit/context';
```

```
import {provide} from '@lit/context';
```

```
@provide({context: Context})
```

```
@provide({context: Context})
```

```
@provide({context: Context})
```

```
@consume()
```

```
import {consume} from '@lit/context';
```

```
import {consume} from '@lit/context';
```

```
import {consume} from '@lit/context';
```

```
@consume({context: Context, subscribe?: boolean})
```

```
@consume({context: Context, subscribe?: boolean})
```

```
@consume({context: Context, subscribe?: boolean})
```

```
subscribe
```

```
false
```

```
true
```

```
ContextProvider
```

```
context-request
```

```
import {ContextProvider} from '@lit/context';
```

```
import {ContextProvider} from '@lit/context';
```

```
import {ContextProvider} from '@lit/context';
```

```
ContextProvider(  host: ReactiveElement,  options: {    context: T,    initialValue?: ContextType<T>  })
```

```
ContextProvider(  host: ReactiveElement,  options: {    context: T,    initialValue?: ContextType<T>  })
```

```
ContextProvider(
```

```
host: ReactiveElement,
```

```
options: {
```

```
context: T,
```

```
initialValue?: ContextType<T>
```

```
}
```

```
)
```

```
setValue(v: T, force = false): void
```

```
force
```

```
ContextConsumer
```

```
context-request
```

```
import {ContextConsumer} from '@lit/context';
```

```
import {ContextConsumer} from '@lit/context';
```

```
import {ContextConsumer} from '@lit/context';
```

```
ContextConsumer(  host: HostElement,  options: {    context: C,    callback?: (value: ContextType<C>, dispose?: () => void) => void,    subscribe?: boolean = false  })
```

```
ContextConsumer(  host: HostElement,  options: {    context: C,    callback?: (value: ContextType<C>, dispose?: () => void) => void,    subscribe?: boolean = false  })
```

```
ContextConsumer(
```

```
host: HostElement,
```

```
options: {
```

```
context: C,
```

```
callback?: (value: ContextType<C>, dispose?: () => void) => void,
```

```
subscribe?: boolean = false
```

```
}
```

```
)
```

```
value: ContextType<C>
```

```
context-request
```

```
ContextRoot
```

```
import {ContextRoot} from '@lit/context';
```

```
import {ContextRoot} from '@lit/context';
```

```
import {ContextRoot} from '@lit/context';
```

```
ContextRoot()
```

```
ContextRoot()
```

```
ContextRoot()
```

```
attach(element: HTMLElement): void
```

```
context-request
```

```
detach(element: HTMLElement): void
```

```
context-request
```

```
ContextRequestEvent
```

```
import {ContextRequestEvent} from '@lit/context';
```

```
import {ContextRequestEvent} from '@lit/context';
```

```
import {ContextRequestEvent} from '@lit/context';
```

```
context-request
```

```
readonly context: C
```

```
readonly contextTarget: Element
```

```
readonly callback: ContextCallback<ContextType<C>>
```

```
readonly subscribe?: boolean
```

```
ContextCallback
```

```
import {type ContextCallback} from '@lit/context';
```

```
import {type ContextCallback} from '@lit/context';
```

```
import {type ContextCallback} from '@lit/context';
```

```
type ContextCallback<ValueType> = (  value: ValueType,  unsubscribe?: () => void) => void;
```

```
type ContextCallback<ValueType> = (  value: ValueType,  unsubscribe?: () => void) => void;
```

```
type ContextCallback<ValueType> = (
```

```
value: ValueType,
```

```
unsubscribe?: () => void
```

```
) => void;
```

