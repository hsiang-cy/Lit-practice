# Decorators

Decorators are functions that can be used to declaratively annotate and modify the behavior of classes.

Lit provides a set of optional decorators that enable declarative APIs for things like registering elements, defining reactive properties and query properties, or adding event options to event handler methods.

For example, the @customElement and @property() decorators let you register a custom element and define a reactive property in a compact, declarative way:

Lit supports two different versions of the JavaScript decorators proposal – an early version supported by TypeScript that we refer to as experimental decorators and a new and final version we refer to as standard decorators.

There are some small differences in usage between the two proposals (standard decorators often require the accessor keyword). Our code samples are written for experimental decorators because we recommend them for production at the moment.

See Decorator versions for more details.

You can import all of the Lit decorators via the lit/decorators.js module:

To reduce the amount of code needed to run the component, decorators can be imported individually into component code. All decorators are available at lit/decorators/<decorator-name>.js. For example,

To use decorators, you need to build your code with a compiler such as TypeScript or Babel.

In the future when decorators are supported natively in browsers, this will no longer be necessary

TypeScript supports both experimental decorators and standard decorators. We recommend that TypeScript developers use experimental decorators for now for optimal compiler output. If your project requires using standard decorators or setting "useDefineForClassFields": true, skip down to migrating to standard decorators.

To use experimental decorators you must enable the experimentalDecorators compiler option.

You should also ensure that the useDefineForClassFields setting is false. This is only required when target is set to ES2022 or greater, but it is recommended to explicitly set this to false. This is needed to avoid issues with class fields when declaring properties.

Enabling emitDecoratorMetadata is not required and not recommended.

Lit decorators are designed to support standard decorator syntax (using accessor on class field decorators) with TypeScript's experimental decorator mode.

This allows incremental migration off of experimental decorators starting with the addition of the accessor keyword to decorated properties without a change of behavior. Once all decorated class field use the accessor keyword, you can change your compiler options to complete the migration to standard decorators:

Note: The accessor keyword was introduced in TypeScript 4.9 and standard decorators with metadata require TypeScript ≥5.2.

Babel supports standard decorators with the @babel/plugin-proposal-decorators plugin as of version 7.23. Babel does not support TypeScript experimental decorators, so you must use Lit decorators with standard decorator syntax using the accessor keyword on decorated class fields.

Enable decorators by adding @babel/plugin-proposal-decorators with these Babel configuration settings:

Note: Lit decorators only work with "version": "2023-05". Other versions, including the formerly supported "2018-09", are not supported.

Decorators are a stage 3 proposal for addition to the ECMAScript standard. Compilers like Babel and TypeScript support decorators, though no browsers have implemented them yet. Lit decorators work with Babel and TypeScript, and will work in browsers when they implement them natively.

What does stage 3 mean?

It means that the specification text is complete, and ready for browsers to implement. Once the specification has been implemented in multiple browsers, it can move to the final stage, stage 4, and be added to the ECMAScript standard. A stage 3 proposal will only change if critical issues are discovered during implementation.

Before the TC39 proposal reached stage 3, compilers implemented earlier versions of the decorator specification.

Most notable of these is TypeScript's experimental decorators which Lit has supported since its inception and is our current recommendation for use.

Babel has also supported different versions of the specification over time as can be seen from the "version" option of the decorator plugin. In the past, Lit 2 has supported the "2018-09" version for Babel users but that has now been dropped in favor of the standard "2023-05" version described below.

Standard decorators is the version of decorators that has reached Stage 3 consensus at TC39, the body that defines ECMAScript/JavaScript.

Standard decorators are supported in TypeScript and Babel, with native browser coming in the near future.

The biggest difference between standard decorators and experimental decorators is that, for performance reasons, standard decorators cannot change the kind of a class member – fields, accessors, and methods – being decorated and replaced, and will only produce the same kind of member.

Since many Lit decorators generate accessors, this means that the decorators need to be applied to accessors, not class fields.

To make this convenient, the standard decorator specification adds the accessor keyword to declare "auto-accessors":

Auto-accessors create a getter and setter pair that read and write from a private field. Decorators can then wrap these getters and setters.

Lit decorators that work on class fields with experimental decorators – such as @property(), @state(), @query(), etc. – must be applied to accessors or auto-accessors with standard decorators:

Compiler output for standard decorators is unfortunately large due to the need to generate the accessors, private storage, and other objects that are part of the decorators API.

So we recommend that users who wish to use decorators, if possible, use TypeScript experimental decorators for now.

In the future the Lit team plans on adding decorator transforms to our optional Lit Compiler in order to compile standard decorators to a more compact compiler output. Native browser support will also eliminate the need for any compiler transforms at all.


1. Built-in decorators
2. Importing decorators
3. Enabling decoratorsUsing decorators with TypeScriptUsing decorators with Babel
4. Using decorators with TypeScript
5. Using decorators with Babel
6. Decorator versionsEarlier decorator proposalsStandard decoratorsCompiler output considerations
7. Earlier decorator proposals
8. Standard decorators
9. Compiler output considerations


1. Using decorators with TypeScript
2. Using decorators with Babel


1. Earlier decorator proposals
2. Standard decorators
3. Compiler output considerations

```
@customElement
```

```
@property()
```

```
@customElement('my-element')export class MyElement extends LitElement {
  @property()  greeting = 'Welcome';
}
```

```
@customElement('my-element')export class MyElement extends LitElement {
  @property()  greeting = 'Welcome';
}
```

```
@customElement('my-element')
```

```
export class MyElement extends LitElement {
```

```
@property()
```

```
greeting = 'Welcome';
```

```
}
```

```
accessor
```

```
@customElement
```

```
@eventOptions
```

```
@property
```

```
@state
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
@queryAssignedElements
```

```
@queryAssignedNodes
```

```
lit/decorators.js
```

```
import {customElement, property, eventOptions, query} from 'lit/decorators.js';
```

```
import {customElement, property, eventOptions, query} from 'lit/decorators.js';
```

```
import {customElement, property, eventOptions, query} from 'lit/decorators.js';
```

```
lit/decorators/<decorator-name>.js
```

```
import {customElement} from 'lit/decorators/custom-element.js';import {eventOptions} from 'lit/decorators/event-options.js';
```

```
import {customElement} from 'lit/decorators/custom-element.js';import {eventOptions} from 'lit/decorators/event-options.js';
```

```
import {customElement} from 'lit/decorators/custom-element.js';
```

```
import {eventOptions} from 'lit/decorators/event-options.js';
```

```
"useDefineForClassFields": true
```

```
experimentalDecorators
```

```
useDefineForClassFields
```

```
false
```

```
target
```

```
ES2022
```

```
false
```

```
// tsconfig.json{  "compilerOptions": {    "experimentalDecorators": true,    "useDefineForClassFields": false,  }}
```

```
// tsconfig.json{  "compilerOptions": {    "experimentalDecorators": true,    "useDefineForClassFields": false,  }}
```

```
// tsconfig.json
```

```
{
```

```
"compilerOptions": {
```

```
"experimentalDecorators": true,
```

```
"useDefineForClassFields": false,
```

```
}
```

```
}
```

```
emitDecoratorMetadata
```

```
accessor
```

```
accessor
```

```
accessor
```

```
// tsconfig.json{  "compilerOptions": {    "experimentalDecorators": false, // default for TypeScript 5.0 and up    "useDefineForClassFields": true, // default when "target" is "ES2022" or higher  }}
```

```
// tsconfig.json{  "compilerOptions": {    "experimentalDecorators": false, // default for TypeScript 5.0 and up    "useDefineForClassFields": true, // default when "target" is "ES2022" or higher  }}
```

```
// tsconfig.json
```

```
{
```

```
"compilerOptions": {
```

```
"experimentalDecorators": false, // default for TypeScript 5.0 and up
```

```
"useDefineForClassFields": true, // default when "target" is "ES2022" or higher
```

```
}
```

```
}
```

```
accessor
```

```
@babel/plugin-proposal-decorators
```

```
accessor
```

```
@babel/plugin-proposal-decorators
```

```
// babel.config.json{  "plugins": [    ["@babel/plugin-proposal-decorators", {"version": "2023-05"}]  ]}
```

```
// babel.config.json{  "plugins": [    ["@babel/plugin-proposal-decorators", {"version": "2023-05"}]  ]}
```

```
// babel.config.json
```

```
{
```

```
"plugins": [
```

```
["@babel/plugin-proposal-decorators", {"version": "2023-05"}]
```

```
]
```

```
}
```

```
"version": "2023-05"
```

```
"2018-09"
```

```
"version"
```

```
"2018-09"
```

```
"2023-05"
```

```
accessor
```

```
class MyClass {  accessor foo = 42;}
```

```
class MyClass {  accessor foo = 42;}
```

```
class MyClass {
```

```
accessor foo = 42;
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
@query()
```

```
@customElement('my-element')export class MyElement extends LitElement {
  @property()  accessor greeting = 'Welcome';
}
```

```
@customElement('my-element')export class MyElement extends LitElement {
  @property()  accessor greeting = 'Welcome';
}
```

```
@customElement('my-element')
```

```
export class MyElement extends LitElement {
```

```
@property()
```

```
accessor greeting = 'Welcome';
```

```
}
```

