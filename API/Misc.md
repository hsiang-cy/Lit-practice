# Misc

A boolean that will be true in server environments like Node, and false in browser environments. Note that your server environment or toolchain must support the "node" export condition for this to be true.

This can be used when authoring components to change behavior based on whether or not the component is executing in an SSR context.

Contains types that are part of the unstable debug API.

Everything in this API is not stable and may change or be removed in the future, even on patch releases.

When Lit is running in dev mode and window.emitLitDebugLogEvents is true, we will emit 'lit-debug' events to window, with live details about the update and render lifecycle. These can be useful for writing debug tooling and visualizations.

Please be aware that running with window.emitLitDebugLogEvents has performance overhead, making certain operations that are normally very cheap (like a no-op render) much slower, because we must copy data and dispatch events.

Change function that returns true if value is different from oldValue. This method is used as the default for a property's hasChanged function.

notEqual(value, old): boolean

Contains types that are part of the unstable debug API.

Everything in this API is not stable and may change or be removed in the future, even on patch releases.

When Lit is running in dev mode and window.emitLitDebugLogEvents is true, we will emit 'lit-debug' events to window, with live details about the update and render lifecycle. These can be useful for writing debug tooling and visualizations.

Please be aware that running with window.emitLitDebugLogEvents has performance overhead, making certain operations that are normally very cheap (like a no-op render) much slower, because we must copy data and dispatch events.

An updateable instance of a Template. Holds references to the Parts used to update the template instance.

Contains types that are part of the unstable debug API.

Everything in this API is not stable and may change or be removed in the future, even on patch releases.

When Lit is running in dev mode and window.emitLitDebugLogEvents is true, we will emit 'lit-debug' events to window, with live details about the update and render lifecycle. These can be useful for writing debug tooling and visualizations.

Please be aware that running with window.emitLitDebugLogEvents has performance overhead, making certain operations that are normally very cheap (like a no-op render) much slower, because we must copy data and dispatch events.

HasChanged(value, old): boolean

Do not use, instead prefer PropertyValues.

A top-level ChildPart returned from render that manages the connected state of AsyncDirectives created throughout the tree below it.

The part's trailing marker node, if any. See .parentNode for more information.

The parent node into which the part renders its content.

A ChildPart's content consists of a range of adjacent child nodes of .parentNode, possibly bordered by 'marker nodes' (.startNode and .endNode).

The part's leading marker node, if any. See .parentNode for more information.

Sets the connection state for AsyncDirectives contained within this root ChildPart.

Whether directives within this tree should be connected or not

lit-html does not automatically monitor the connectedness of DOM rendered; as such, it is the responsibility of the caller to render to ensure that part.setConnected(false) is called before the part object is potentially discarded, to ensure that AsyncDirectives have a chance to dispose of any resources being held. If a RootPart that was previously disconnected is subsequently re-connected (and its AsyncDirectives should re-connect), setConnected(true) should be called.

A function which can sanitize values that will be written to a specific kind of DOM sink.

See SanitizerFactory.

A string representing one of the supported dev mode warning categories.


1. defaultConverter
2. isServer
3. LitUnstable
4. notEqual
5. ReactiveUnstable
6. TemplateInstance
7. Unstable
8. CompiledTemplate
9. CompiledTemplateResult
10. DirectiveParent
11. Disconnectable
12. HasChanged
13. HTMLTemplateResult
14. Initializer
15. PropertyValueMap
16. RootPart
17. ValueSanitizer
18. WarningKind


* If both .startNode and .endNode are non-null, then the part's content consists of all siblings between .startNode and .endNode, exclusively.
* If .startNode is non-null but .endNode is null, then the part's content consists of all siblings following .startNode, up to and including the last child of .parentNode. If .endNode is non-null, then .startNode will always be non-null.
* If both .endNode and .startNode are null, then the part's content consists of all child nodes of .parentNode.

```
import { defaultConverter } from 'lit';
```

```
ComplexAttributeConverter
```

```
true
```

```
false
```

```
"node"
```

```
true
```

```
import { isServer } from 'lit';
```

```
false
```

```
import { LitUnstable } from 'lit';
```

```
window.emitLitDebugLogEvents
```

```
value
```

```
oldValue
```

```
hasChanged
```

```
import { notEqual } from 'lit';
```

```
notEqual(value, old): boolean
```

```
unknown
```

```
unknown
```

```
import { ReactiveUnstable } from 'lit';
```

```
window.emitLitDebugLogEvents
```

```
import { TemplateInstance } from 'lit';
```

```
Template
```

```
ChildPart
```

```
import { Unstable } from 'lit';
```

```
window.emitLitDebugLogEvents
```

```
import { CompiledTemplate } from 'lit';
```

```
import { CompiledTemplateResult } from 'lit';
```

```
import { DirectiveParent } from 'lit';
```

```
import { Disconnectable } from 'lit';
```

```
import { HasChanged } from 'lit';
```

```
HasChanged(value, old): boolean
```

```
unknown
```

```
unknown
```

```
import { HTMLTemplateResult } from 'lit';
```

```
TemplateResult<HTML_RESULT>
```

```
import { Initializer } from 'lit';
```

```
(element: ReactiveElement) => void
```

```
PropertyValues
```

```
import { PropertyValueMap } from 'lit';
```

```
K
```

```
K
```

```
K
```

```
K
```

```
T[K]
```

```
ChildPart
```

```
render
```

```
AsyncDirective
```

```
import { RootPart } from 'lit';
```

```
.parentNode
```

```
.parentNode
```

```
.startNode
```

```
.endNode
```

```
.startNode
```

```
.endNode
```

```
.startNode
```

```
.endNode
```

```
.startNode
```

```
.endNode
```

```
.startNode
```

```
.parentNode
```

```
.endNode
```

```
.startNode
```

```
.endNode
```

```
.startNode
```

```
.parentNode
```

```
.parentNode
```

```
AsyncDirective
```

```
boolean
```

```
render
```

```
part.setConnected(false)
```

```
AsyncDirective
```

```
RootPart
```

```
AsyncDirective
```

```
setConnected(true)
```

```
import { ValueSanitizer } from 'lit';
```

```
(value: unknown) => unknown
```

```
import { WarningKind } from 'lit';
```

```
"change-in-update" | "migration"
```

