# Authoring components

Lit's approach to rendering web components in a server environment places some restrictions on component code to achieve efficient server rendering. When authoring components, keep in mind these considerations to ensure they are compatible with Lit SSR.

Note: The restrictions listed on this page are subject to change as we make improvements to Lit SSR. If you would like to see a certain use case supported, please file an issue or start a discussion thread.

Most browser DOM APIs are not available in the Node environment. Lit SSR utilizes a DOM shim that's the bare minimum required for rendering Lit templates and components. For a full list of what APIs are available, see the DOM Emulation page.

When authoring components, perform imperative DOM operations from lifecycle methods that are called only on the client, and not on the server. For example, use updated() if you need to measure the updated DOM. This callback is only run on the browser, so it is safe to access the DOM.

See the lifecycle section below for a list of which specific methods are called on the server and which are browser-only.

Some modules that define Lit components may also have side effects that use browser APIs—for example to detect certain browser features—such that the module breaks when imported in a non-browser environment. In this case, you can move the side effect code into a browser-only lifecycle callback, or conditionalize so that it only runs on the browser.

For simple cases, adding conditionals or optional chaining to certain DOM accesses may be sufficient to guard against unavailable DOM APIs. For example:

The lit package also provides an isServer environment checker that can be used to write conditional blocks of code targeting different environments:

For more complex uses cases, consider utilizing conditional exports that specifically match for "node" environments so you could have different code depending on whether the module is being imported for use in Node or in the browser. Users would get the appropriate version of the package depending on whether it was imported from Node or the browser. Export conditions are also supported by popular bundling tools like rollup and webpack so users can bring in the appropriate code for your bundle.

An example configuration might look like below:

The Node entrypoint file can be made manually, or you might use a bundler to generate those.

Avoid bundling Lit inline into published components if possible.

Because Lit packages use conditional exports to provide different modules to Node and browser environments, we strongly discourage bundling lit into your packages being published to NPM. If you do, your bundle will only include lit modules meant for the environment you bundled, and won't automatically switch based on environment.

If you are using a bundler like ESBuild or Rollup to transform your code, you can mark packages as external so they will not be bundled into your component. ESBuild has a packages option to externalize all dependencies, or you can mark only lit and related packages in the external option. Similarly, Rollup also has an equivalent "external" configuration option.

If you must bundle Lit library code into your component (e.g. for distribution via a CDN), we recommended creating two entrypoints: one for the browser, and one for Node. Bundlers will have options to either select a target platform like browser or Node, or allow you to explicitly specify the export condition used for resolving modules.

For example, ESBuild has the platform option, and in Rollup you can provide "node" to @rollup/plugin-node-resolve's exportConditions option.

These entrypoints for browser and Node targets must then be specified in your component library's package.json file. See Conditional exports for more details.

Only certain lifecycle callbacks are run during server-side rendering. These callback generate the initial styling and markup for the component. Additional lifecycle methods are called client-side during hydration and during runtime after the components are hydrated.

The tables below lists the standard custom element and Lit lifecycle methods and whether they are called during SSR. All of the lifecycle is available on the browser after element registration and hydration.

Methods called on the server should not contain references to browser/DOM APIs that have not been shimmed. Methods that are not called server-side may contain those references without causing breakages.

Whether a method is called on the server is subject to change while Lit SSR is part of Lit Labs.

There currently isn't a mechanism to wait for asynchronous results before continuing to render (such as results from async directives or controllers), though we are considering options to allow this in the future. The current workaround for this is to do any asynchronous work before rendering the top level template on the server and providing the data to the template as some attribute or property.

For example:

The @lit-labs/testing package contains utility functions that utilize a Web Test Runner plugin to create test fixtures that are rendered server-side using @lit-labs/ssr. It can help test whether your components are server-side renderable. See more in the readme.


1. Browser-only codeConditional exportsBundlers
2. Conditional exports
3. Bundlers
4. LifecycleStandard custom element and LitElementReactiveControllerDirective
5. Standard custom element and LitElement
6. ReactiveController
7. Directive
8. Asynchronicity
9. Testing


1. Conditional exports
2. Bundlers


1. Standard custom element and LitElement
2. ReactiveController
3. Directive


* Async directives such as asyncAppend() or asyncReplace() will not produce any renderable results server-side.
* until() directive will only ever result in the highest-priority non-promise placeholder value.

```
updated()
```

```
const hasConstructableStylesheets = typeof globalThis.CSSStyleSheet?.prototype.replaceSync === 'function';
```

```
const hasConstructableStylesheets = typeof globalThis.CSSStyleSheet?.prototype.replaceSync === 'function';
```

```
const hasConstructableStylesheets = typeof globalThis.CSSStyleSheet?.prototype.replaceSync === 'function';
```

```
lit
```

```
isServer
```

```
import {isServer} from 'lit';
if (isServer) {  // only runs in server environments like Node} else {  // runs in the browser}
```

```
import {isServer} from 'lit';
if (isServer) {  // only runs in server environments like Node} else {  // runs in the browser}
```

```
import {isServer} from 'lit';
```

```
if (isServer) {
```

```
// only runs in server environments like Node
```

```
} else {
```

```
// runs in the browser
```

```
}
```

```
"node"
```

```
// package.json{  "name": "my-awesome-lit-components",  "exports": {    "./button.js": {      "node": "./button-node.js",      "default": "./button.js"    }  }}
```

```
// package.json{  "name": "my-awesome-lit-components",  "exports": {    "./button.js": {      "node": "./button-node.js",      "default": "./button.js"    }  }}
```

```
// package.json
```

```
{
```

```
"name": "my-awesome-lit-components",
```

```
"exports": {
```

```
"./button.js": {
```

```
"node": "./button-node.js",
```

```
"default": "./button.js"
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
lit
```

```
lit
```

```
packages
```

```
lit
```

```
platform
```

```
"node"
```

```
@rollup/plugin-node-resolve
```

```
exportConditions
```

```
package.json
```

```
constructor()
```

```
connectedCallback()
```

```
disconnectedCallback()
```

```
attributeChangedCallback()
```

```
adoptedCallback()
```

```
hasChanged()
```

```
shouldUpdate()
```

```
willUpdate()
```

```
render()
```

```
update()
```

```
render()
```

```
firstUpdate()
```

```
updated()
```

```
constructor()
```

```
hostConnected()
```

```
hostDisconnected()
```

```
hostUpdate()
```

```
hostUpdated()
```

```
constructor()
```

```
update()
```

```
render()
```

```
disconnected()
```

```
reconnected()
```

```
asyncAppend()
```

```
asyncReplace()
```

```
until()
```

```
@lit-labs/testing
```

```
@lit-labs/ssr
```

