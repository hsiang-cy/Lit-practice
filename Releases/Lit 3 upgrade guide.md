# Lit 3 upgrade guide

If you are looking to migrate from Lit 1.x to Lit 2.x, see the Lit 2 upgrade guide.

Lit 3.0 has very few breaking changes from Lit 2.x:

For the vast majority of users there should be no required code changes to upgrade from Lit 2 to Lit 3. Most apps and libraries should be able to extend their npm version ranges to include both 2.x and 3.x, like "^2.7.0 || ^3.0.0".

Lit 2.x and 3.0 are interoperable – templates, base classes, and directives from one version of Lit will work with those from another.

Lit 2 was published as ES2019, and Lit 3 is now published as ES2021 which has wide support in modern browsers and build tools. This may be a breaking change if you need to support older browser versions and your current tooling can't parse ES2021.

Webpack 4's internal parser doesn't support nullish coalescing (??), logical assignment (??=), or optional chaining (?.), which are syntaxes introduced in ES2021 so will throw a Module parse failed: Unexpected token when encountering those.

The preferred solution is to upgrade to Webpack 5 which does support parsing these newer JS syntax. However if you are unable to do so, it is possible to use babel-loader to transform Lit 3 code to work with Webpack 4.

To transpile Lit 3 in Webpack 4, install the following required babel packages:

And add a new rule that is similar to the following (you may need to modify it based on your specific project):

JavaScript decorators have recently been standardized by TC39 and are at Stage 3 of the four-stage standardization process. Stage 3 is when JavaScript implementations such as VMs and compilers start implementing the stable specification. TypeScript 5.2 and Babel 7.23 have implemented the standard recently.

This means that there is more than one version of the decorator API in existence: standard decorators, TypeScript's experimental decorators, and previous proposals that Babel has implemented, such as version "2018-09".

While Lit 2 supported TypeScript experimental decorators and Babel's "2018-09" decorators, Lit 3 now supports standard decorators and TypeScript experimental decorators.

The Lit 3 decorators are mostly backwards compatible with the Lit 2 TypeScript decorators - most likely no changes are needed.

Some minor breaking changes were necessary to make the Lit decorators behave consistently between both experimental and standard decorator modes.

Changes to Lit decorator behavior in Lit 3.0:

If your Lit 2.x project does not have deprecation warnings you should not be impacted by this list.

Replace Lit 2.x usage of UpdatingElement with ReactiveElement. This is not a functional change as UpdatingElement was aliasing ReactiveElement.

Lit 3.0 built-in decorators are no longer exported by lit-element, and should instead be imported from lit/decorators.js.

Migrate any usage of queryAssignedNodes taking a selector to use queryAssignedElements.

Usages without a selector now must take an options object.

Experimental hydration support has been moved out of core libraries and into @lit-labs/ssr-client.

This is a type only change with no runtime effect.

The type of ReactiveElement.renderRoot was changed from Element | ShadowRoot to HTMLElement | DocumentFragment and the return type of ReactiveElement.createRenderRoot() was changed from HTMLElement | ShadowRoot to HTMLElement | DocumentFragment. This makes them congruent with each other, as well as lit-html's render().

This change generally should not affect code that simply accesses this.renderRoot. However, any code that had explicit type annotations for their former types should be updated.

While Lit 3 adds support for standard decorators, we still recommend that TypeScript users stay with experimental decorators. This is because the emitted code for standard decorators from the TypeScript and Babel compilers is quite large at the moment.

We will recommend standard decorators for production when browsers support them, or when we release decorator transform support in our new Lit compiler.

But you can try standard decorators now, and they work in TypeScript 5.2 and above and Babel 7.23 with the @babel/plugin-proposal-decorators plugin.

Install TypeScript 5.2 or later, and remove the "experimentalDecorators" setting from your tsconfig if it's present.

Install Babel 7.23 or later, and @babel/plugin-proposal-decorators. Be sure to pass the "version": "2023-05" option to the plugin.

Standard decorators are not allowed to change the kind of class member they decorate. Decorators that need to create getters and setters must be applied to existing getters and setters. To make this more ergonomic, the decorators standard adds the accessor keyword which creates "auto accessors" when applied to a class field. Auto accessors look and act much like class fields, but create accessors on the prototype backed by private storage.

The @property(), @state(), @query(), @queryAll(), @queryAssignedElements() and @queryAssignedNode() decorators require the accessor keyword.

Example:

Standard decorators can only replace the class member they're directly applied to. Lit decorators need to intercept property setting, so the decorators must be applied to setters. This is different from the Lit 2 recommendation of applying decorators to getters.

For @property() and @state() you can also remove any this.requestUpdate() calls in the setter since this is done automatically now. If you need to not have requestUpdate() called, you'll have to use the noAccessor property option.

Note that for @property() and @state() the getter will be called by the decorator when setting the property to retrieve the old value. This means that you must define both a getter and a setter.

Before:

After:


1. Overview
2. Lit is now published as ES2021Using Lit 3 with Webpack 4
3. Using Lit 3 with Webpack 4
4. Updates to Lit decorators
5. List of removed APIs
6. Steps to upgradeRemoved UpdatingElement alias for ReactiveElementRemoved re-export of decorators from lit-elementDeprecated queryAssignedNodes(slot: string, flatten: bool, selector: string) decorator signature removedServer side rendering experimental hydration modules removed from lit, lit-element, and lit-html
7. Removed UpdatingElement alias for ReactiveElement
8. Removed re-export of decorators from lit-element
9. Deprecated queryAssignedNodes(slot: string, flatten: bool, selector: string) decorator signature removed
10. Server side rendering experimental hydration modules removed from lit, lit-element, and lit-html
11. [Type only]: Type of renderRoot and createRenderRoot() have been updated
12. Optional: Upgrade to standard decoratorsConfigurationCode changes
13. Configuration
14. Code changes


1. Using Lit 3 with Webpack 4


1. Removed UpdatingElement alias for ReactiveElement
2. Removed re-export of decorators from lit-element
3. Deprecated queryAssignedNodes(slot: string, flatten: bool, selector: string) decorator signature removed
4. Server side rendering experimental hydration modules removed from lit, lit-element, and lit-html


1. Configuration
2. Code changes


* IE11 is no longer supported.
* Lit's npm modules are now published as ES2021.
* APIs marked deprecated in Lit 2.x releases have been removed.
* SSR hydration support modules have moved to the @lit-labs/ssr-client package.
* Type only: Type of ReactiveElement's renderRoot and createRenderRoot() have been updated.
* Support was removed for Babel decorators version "2018-09".
* Decorator behavior has been unified between TypeScript experimental decorators and standard decorators.As a consequence, if you use TypeScript you'll need to upgrade to at least TypeScript v5.2, to get the updated types for both kinds of decorators.
* As a consequence, if you use TypeScript you'll need to upgrade to at least TypeScript v5.2, to get the updated types for both kinds of decorators.


* As a consequence, if you use TypeScript you'll need to upgrade to at least TypeScript v5.2, to get the updated types for both kinds of decorators.


* requestUpdate() is called automatically for @property() and @state() decorated accessors where previously that was the setters responsibility.
* The value of an accessor is read on first render and used as the initial value for changedProperties and attribute reflection.
* Lit 3 decorators no longer support the version: "2018-09" option of @babel/plugin-proposal-decorators. Babel users should migrate to standard decorators.
* [Optional]: We recommend migrating @property() and @state() to the setter for hand-written accessors to aid in migrating to standard decorators.


* Removed UpdatingElement alias for ReactiveElement.
* Removed re-export of decorators from main lit-element module.
* Removed deprecated call signature for the queryAssignedNodes decorator.
* Moved experimental server side rendering hydration modules from lit, lit-element, and lit-html to @lit-labs/ssr-client.

```
@lit-labs/ssr-client
```

```
ReactiveElement
```

```
renderRoot
```

```
createRenderRoot()
```

```
"^2.7.0 || ^3.0.0"
```

```
??
```

```
??=
```

```
?.
```

```
Module parse failed: Unexpected token
```

```
babel-loader
```

```
> npm i -D babel-loader@8 \    @babel/plugin-transform-optional-chaining \    @babel/plugin-transform-nullish-coalescing-operator \    @babel/plugin-transform-logical-assignment-operators
```

```
> npm i -D babel-loader@8 \    @babel/plugin-transform-optional-chaining \    @babel/plugin-transform-nullish-coalescing-operator \    @babel/plugin-transform-logical-assignment-operators
```

```
> npm i -D babel-loader@8 \
```

```
@babel/plugin-transform-optional-chaining \
```

```
@babel/plugin-transform-nullish-coalescing-operator \
```

```
@babel/plugin-transform-logical-assignment-operators
```

```
// In webpack.config.js
module.exports = {  // ...
  module: {    rules: [      // ... your other rules
      // Add a babel-loader rule to downlevel Lit's ES2021 syntax so Webpack 4 can parse it.      // TODO: Once on Webpack 5, this rule can be deleted.      {        test: /\.js$/,        include: ['@lit', 'lit-element', 'lit-html'].map((p) =>          path.resolve(__dirname, 'node_modules/' + p)        ),        use: {          loader: 'babel-loader',          options: {            plugins: [              '@babel/plugin-transform-optional-chaining',              '@babel/plugin-transform-nullish-coalescing-operator',              '@babel/plugin-transform-logical-assignment-operators'            ],          },        },      },    ],  }}
```

```
// In webpack.config.js
module.exports = {  // ...
  module: {    rules: [      // ... your other rules
      // Add a babel-loader rule to downlevel Lit's ES2021 syntax so Webpack 4 can parse it.      // TODO: Once on Webpack 5, this rule can be deleted.      {        test: /\.js$/,        include: ['@lit', 'lit-element', 'lit-html'].map((p) =>          path.resolve(__dirname, 'node_modules/' + p)        ),        use: {          loader: 'babel-loader',          options: {            plugins: [              '@babel/plugin-transform-optional-chaining',              '@babel/plugin-transform-nullish-coalescing-operator',              '@babel/plugin-transform-logical-assignment-operators'            ],          },        },      },    ],  }}
```

```
// In webpack.config.js
```

```
module.exports = {
```

```
// ...
```

```
module: {
```

```
rules: [
```

```
// ... your other rules
```

```
// Add a babel-loader rule to downlevel Lit's ES2021 syntax so Webpack 4 can parse it.
```

```
// TODO: Once on Webpack 5, this rule can be deleted.
```

```
{
```

```
test: /\.js$/,
```

```
include: ['@lit', 'lit-element', 'lit-html'].map((p) =>
```

```
path.resolve(__dirname, 'node_modules/' + p)
```

```
),
```

```
use: {
```

```
loader: 'babel-loader',
```

```
options: {
```

```
plugins: [
```

```
'@babel/plugin-transform-optional-chaining',
```

```
'@babel/plugin-transform-nullish-coalescing-operator',
```

```
'@babel/plugin-transform-logical-assignment-operators'
```

```
],
```

```
},
```

```
},
```

```
},
```

```
],
```

```
}
```

```
}
```

```
requestUpdate()
```

```
@property()
```

```
@state()
```

```
changedProperties
```

```
version: "2018-09"
```

```
@babel/plugin-proposal-decorators
```

```
@property()
```

```
@state()
```

```
UpdatingElement
```

```
ReactiveElement
```

```
lit-element
```

```
queryAssignedNodes
```

```
lit
```

```
lit-element
```

```
lit-html
```

```
@lit-labs/ssr-client
```

```
UpdatingElement
```

```
ReactiveElement
```

```
UpdatingElement
```

```
ReactiveElement
```

```
UpdatingElement
```

```
ReactiveElement
```

```
// Removedimport {UpdatingElement} from 'lit';
// Updatedimport {ReactiveElement} from 'lit';
```

```
// Removedimport {UpdatingElement} from 'lit';
// Updatedimport {ReactiveElement} from 'lit';
```

```
// Removed
```

```
import {UpdatingElement} from 'lit';
```

```
// Updated
```

```
import {ReactiveElement} from 'lit';
```

```
lit-element
```

```
lit-element
```

```
lit/decorators.js
```

```
// Removed decorator exports from lit-elementimport {customElement, property, state} from 'lit-element';
// Updatedimport {customElement, property, state} from 'lit/decorators.js';
```

```
// Removed decorator exports from lit-elementimport {customElement, property, state} from 'lit-element';
// Updatedimport {customElement, property, state} from 'lit/decorators.js';
```

```
// Removed decorator exports from lit-element
```

```
import {customElement, property, state} from 'lit-element';
```

```
// Updated
```

```
import {customElement, property, state} from 'lit/decorators.js';
```

```
queryAssignedNodes(slot: string, flatten: bool, selector: string)
```

```
queryAssignedNodes
```

```
queryAssignedElements
```

```
// Removed@queryAssignedNodes('list', true, '.item')
// Updated@queryAssignedElements({slot: 'list', flatten: true, selector: '.item'})
```

```
// Removed@queryAssignedNodes('list', true, '.item')
// Updated@queryAssignedElements({slot: 'list', flatten: true, selector: '.item'})
```

```
// Removed
```

```
@queryAssignedNodes('list', true, '.item')
```

```
// Updated
```

```
@queryAssignedElements({slot: 'list', flatten: true, selector: '.item'})
```

```
selector
```

```
// Removed@queryAssignedNodes('list', true)
// Updated@queryAssignedNodes({slot: 'list', flatten: true})
```

```
// Removed@queryAssignedNodes('list', true)
// Updated@queryAssignedNodes({slot: 'list', flatten: true})
```

```
// Removed
```

```
@queryAssignedNodes('list', true)
```

```
// Updated
```

```
@queryAssignedNodes({slot: 'list', flatten: true})
```

```
lit
```

```
lit-element
```

```
lit-html
```

```
@lit-labs/ssr-client
```

```
// Removedimport 'lit/experimental-hydrate-support.js';import {hydrate} from 'lit/experimental-hydrate.js';
// Updatedimport '@lit-labs/ssr-client/lit-element-hydrate-support.js';import {hydrate} from '@lit-labs/ssr-client';
```

```
// Removedimport 'lit/experimental-hydrate-support.js';import {hydrate} from 'lit/experimental-hydrate.js';
// Updatedimport '@lit-labs/ssr-client/lit-element-hydrate-support.js';import {hydrate} from '@lit-labs/ssr-client';
```

```
// Removed
```

```
import 'lit/experimental-hydrate-support.js';
```

```
import {hydrate} from 'lit/experimental-hydrate.js';
```

```
// Updated
```

```
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
```

```
import {hydrate} from '@lit-labs/ssr-client';
```

```
renderRoot
```

```
createRenderRoot()
```

```
ReactiveElement.renderRoot
```

```
Element | ShadowRoot
```

```
HTMLElement | DocumentFragment
```

```
ReactiveElement.createRenderRoot()
```

```
HTMLElement | ShadowRoot
```

```
HTMLElement | DocumentFragment
```

```
render()
```

```
this.renderRoot
```

```
@babel/plugin-proposal-decorators
```

```
"experimentalDecorators"
```

```
@babel/plugin-proposal-decorators
```

```
"version": "2023-05"
```

```
accessor
```

```
accessor
```

```
@property()
```

```
@state()
```

```
@query()
```

```
@queryAll()
```

```
@queryAssignedElements()
```

```
@queryAssignedNode()
```

```
accessor
```

```
class MyElement extends LitElement {  @property()  accessor myProperty = "initial value"...}
```

```
class MyElement extends LitElement {  @property()  accessor myProperty = "initial value"...}
```

```
class MyElement extends LitElement {
```

```
@property()
```

```
accessor myProperty = "initial value"
```

```
...
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
this.requestUpdate()
```

```
requestUpdate()
```

```
noAccessor
```

```
@property()
```

```
@state()
```

```
class MyElement extends LitElement {  private _foo = 42;  set(v) {    const oldValue = this._foo;    this._foo = v;    this.requestUpdate('foo', oldValue);  }  @property()  get() {    return this._foo;  }}
```

```
class MyElement extends LitElement {  private _foo = 42;  set(v) {    const oldValue = this._foo;    this._foo = v;    this.requestUpdate('foo', oldValue);  }  @property()  get() {    return this._foo;  }}
```

```
class MyElement extends LitElement {
```

```
private _foo = 42;
```

```
set(v) {
```

```
const oldValue = this._foo;
```

```
this._foo = v;
```

```
this.requestUpdate('foo', oldValue);
```

```
}
```

```
@property()
```

```
get() {
```

```
return this._foo;
```

```
}
```

```
}
```

```
class MyElement extends LitElement {  private _foo = 42;  @property()  set(v) {    this._foo = v;  }  get() {    return this._foo;  }}
```

```
class MyElement extends LitElement {  private _foo = 42;  @property()  set(v) {    this._foo = v;  }  get() {    return this._foo;  }}
```

```
class MyElement extends LitElement {
```

```
private _foo = 42;
```

```
@property()
```

```
set(v) {
```

```
this._foo = v;
```

```
}
```

```
get() {
```

```
return this._foo;
```

```
}
```

```
}
```

