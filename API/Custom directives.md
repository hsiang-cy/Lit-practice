# Custom directives

An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false) on a part that was previously rendered containing the directive (as happens when e.g. a LitElement disconnects from the DOM).

If part.setConnected(true) is subsequently called on a containing part, the directive's reconnected method will be called prior to its next update/render callbacks. When implementing disconnected, reconnected should also be implemented to be compatible with reconnection. Note that updates may occur while the directive is disconnected. As such, directives should generally check the this.isConnected flag during render/update to determine whether it is safe to subscribe to resources that may prevent garbage collection.

The connection state for this Directive.

User callbacks for implementing logic to release any resources/subscriptions that may have been retained by this directive. Since directives may also be re-connected, reconnected should also be implemented to restore the working state of the directive prior to the next render.

Sets the value of the directive's Part outside the normal update/render lifecycle of a directive.

The value to set

This method should not be called synchronously from a directive's update or render.

If this attribute part represents an interpolation, this contains the static strings of the interpolation. For single-value, complete bindings, this is undefined.

If this attribute part represents an interpolation, this contains the static strings of the interpolation. For single-value, complete bindings, this is undefined.

The part's trailing marker node, if any. See .parentNode for more information.

The parent node into which the part renders its content.

A ChildPart's content consists of a range of adjacent child nodes of .parentNode, possibly bordered by 'marker nodes' (.startNode and .endNode).

The part's leading marker node, if any. See .parentNode for more information.

Creates a user-facing directive function from a Directive class. This function has the same parameters as the directive's render() method.

directive(c): (values: Parameters<InstanceType<C>["render"]>) => DirectiveResult<C>

Base class for creating custom directives. Users should extend this class, implement render and/or update, and then pass their subclass to directive.

If this attribute part represents an interpolation, this contains the static strings of the interpolation. For single-value, complete bindings, this is undefined.

If this attribute part represents an interpolation, this contains the static strings of the interpolation. For single-value, complete bindings, this is undefined.

This utility type extracts the signature of a directive class's render() method so we can use it for the type of the generated directive function.

A generated directive function doesn't evaluate the directive, but just returns a DirectiveResult object that captures the arguments.

Information about the part a directive is bound to.

This is useful for checking that a directive is attached to a valid part, such as with directive that can only be used on attribute bindings.

clearPart(part): void

Returns the committed value of a ChildPart.

getCommittedValue(part): unknown

The committed value is used for change detection and efficient updates of the part. It can differ from the value set by the template or directive in cases where the template value is transformed before being committed.

Retrieves the Directive class for a DirectiveResult

getDirectiveClass(value): undefined | DirectiveClass

Inserts a ChildPart into the given container ChildPart's DOM, either at the end of the container ChildPart, or before the optional refPart.

insertPart(containerPart, refPart?, part?): ChildPart

Part within which to add the new ChildPart

Part before which to add the new ChildPart; when omitted the part added to the end of the containerPart

Part to insert, or undefined to create a new part

This does not add the part to the containerPart's committed value. That must be done by callers.

Tests if a value is a DirectiveResult.

isDirectiveResult(value): value

Tests if a value is a primitive value.

isPrimitive(value): value

See https://tc39.github.io/ecma262/#sec-typeof-operator

Tests whether a part has only a single-expression with no strings to interpolate between.

isSingleExpression(part): boolean

Only AttributePart and PropertyPart can have multiple expressions. Multi-expression parts have a strings property and single-expression parts do not.

Tests if a value is a TemplateResult.

isTemplateResult(value, type?): value

Removes a ChildPart from the DOM, including any of its content.

removePart(part): void

The Part to remove

Sets the value of a Part.

setChildPartValue(part, value, directiveParent?): T

Part to set

Value to set

Used internally; should not be set by user

Note that this should only be used to set/update the value of user-created parts (i.e. those created using insertPart); it should not be used by directives to set the value of the directive's container part. Directives should return a value from update/render to update their part state. For directives that require setting their part value asynchronously, they should extend AsyncDirective and call this.setValue().

Sets the committed value of a ChildPart directly without triggering the commit stage of the part.

setCommittedValue(part, value?): unknown

This is useful in cases where a directive needs to update the part such that the next update detects a value change or not. When value is omitted, the next update will be guaranteed to be detected as a change.

A sentinel value that signals that a value was handled by a directive and should not be written to the DOM.


1. AsyncDirective
2. AttributePart
3. BooleanAttributePart
4. ChildPart
5. directive
6. Directive
7. ElementPart
8. EventPart
9. PartType
10. PropertyPart
11. AttributePartInfo
12. ChildPartInfo
13. DirectiveClass
14. DirectiveParameters
15. DirectiveResult
16. ElementPartInfo
17. Part
18. PartInfo
19. clearPart
20. getCommittedValue
21. getDirectiveClass
22. insertPart
23. isDirectiveResult
24. isPrimitive
25. isSingleExpression
26. isTemplateResult
27. removePart
28. setChildPartValue
29. setCommittedValue
30. TemplateResultType
31. noChange


* If both .startNode and .endNode are non-null, then the part's content consists of all siblings between .startNode and .endNode, exclusively.
* If .startNode is non-null but .endNode is null, then the part's content consists of all siblings following .startNode, up to and including the last child of .parentNode. If .endNode is non-null, then .startNode will always be non-null.
* If both .endNode and .startNode are null, then the part's content consists of all child nodes of .parentNode.


* TemplateResults are committed as a TemplateInstance
* Iterables are committed as Array<ChildPart>
* All other types are committed as the template value or value returned or set by a directive.

```
Directive
```

```
disconnected
```

```
part.setConnected(false)
```

```
import { AsyncDirective } from 'lit/async-directive.js';
```

```
part.setConnected(true)
```

```
reconnected
```

```
update
```

```
render
```

```
disconnected
```

```
reconnected
```

```
this.isConnected
```

```
PartInfo
```

```
reconnected
```

```
Array<unknown>
```

```
update
```

```
render
```

```
unknown
```

```
update
```

```
render
```

```
Part
```

```
Array<unknown>
```

```
import { AttributePart } from 'lit/async-directive.js';
```

```
MDN HTMLElement
```

```
string
```

```
ReadonlyArray<string>
```

```
Disconnectable
```

```
undefined | RenderOptions
```

```
import { BooleanAttributePart } from 'lit/async-directive.js';
```

```
MDN HTMLElement
```

```
string
```

```
ReadonlyArray<string>
```

```
Disconnectable
```

```
undefined | RenderOptions
```

```
import { ChildPart } from 'lit/async-directive.js';
```

```
ChildNode
```

```
null | ChildNode
```

```
undefined | ChildPart | TemplateInstance
```

```
undefined | RenderOptions
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
import { directive } from 'lit/async-directive.js';
```

```
directive(c): (values: Parameters<InstanceType<C>["render"]>) => DirectiveResult<C>
```

```
C
```

```
render
```

```
update
```

```
directive
```

```
import { Directive } from 'lit/async-directive.js';
```

```
PartInfo
```

```
Array<unknown>
```

```
Part
```

```
Array<unknown>
```

```
import { ElementPart } from 'lit/async-directive.js';
```

```
MDN Element
```

```
Disconnectable
```

```
undefined | RenderOptions
```

```
import { EventPart } from 'lit/async-directive.js';
```

```
MDN HTMLElement
```

```
string
```

```
ReadonlyArray<string>
```

```
Disconnectable
```

```
undefined | RenderOptions
```

```
Event
```

```
import { PartType } from 'lit/async-directive.js';
```

```
{ATTRIBUTE: 1, BOOLEAN_ATTRIBUTE: 4, CHILD: 2, ELEMENT: 6, EVENT: 5, PROPERTY: 3}
```

```
import { PropertyPart } from 'lit/async-directive.js';
```

```
MDN HTMLElement
```

```
string
```

```
ReadonlyArray<string>
```

```
Disconnectable
```

```
undefined | RenderOptions
```

```
import { AttributePartInfo } from 'lit/async-directive.js';
```

```
import { ChildPartInfo } from 'lit/async-directive.js';
```

```
import { DirectiveClass } from 'lit/async-directive.js';
```

```
PartInfo
```

```
import { DirectiveParameters } from 'lit/async-directive.js';
```

```
Parameters<C["render"]>
```

```
import { DirectiveResult } from 'lit/async-directive.js';
```

```
import { ElementPartInfo } from 'lit/async-directive.js';
```

```
import { Part } from 'lit/async-directive.js';
```

```
ChildPart | AttributePart | PropertyPart | BooleanAttributePart | ElementPart | EventPart
```

```
import { PartInfo } from 'lit/async-directive.js';
```

```
ChildPartInfo | AttributePartInfo | ElementPartInfo
```

```
import { clearPart } from 'lit/directive-helpers.js';
```

```
clearPart(part): void
```

```
ChildPart
```

```
import { getCommittedValue } from 'lit/directive-helpers.js';
```

```
getCommittedValue(part): unknown
```

```
ChildPart
```

```
TemplateResult
```

```
TemplateInstance
```

```
Array<ChildPart>
```

```
import { getDirectiveClass } from 'lit/directive-helpers.js';
```

```
getDirectiveClass(value): undefined | DirectiveClass
```

```
unknown
```

```
refPart
```

```
import { insertPart } from 'lit/directive-helpers.js';
```

```
insertPart(containerPart, refPart?, part?): ChildPart
```

```
ChildPart
```

```
ChildPart
```

```
containerPart
```

```
ChildPart
```

```
import { isDirectiveResult } from 'lit/directive-helpers.js';
```

```
isDirectiveResult(value): value
```

```
unknown
```

```
import { isPrimitive } from 'lit/directive-helpers.js';
```

```
isPrimitive(value): value
```

```
unknown
```

```
import { isSingleExpression } from 'lit/directive-helpers.js';
```

```
isSingleExpression(part): boolean
```

```
PartInfo
```

```
strings
```

```
import { isTemplateResult } from 'lit/directive-helpers.js';
```

```
isTemplateResult(value, type?): value
```

```
unknown
```

```
TemplateResultType
```

```
import { removePart } from 'lit/directive-helpers.js';
```

```
removePart(part): void
```

```
ChildPart
```

```
import { setChildPartValue } from 'lit/directive-helpers.js';
```

```
setChildPartValue(part, value, directiveParent?): T
```

```
T
```

```
unknown
```

```
DirectiveParent
```

```
insertPart
```

```
update
```

```
render
```

```
AsyncDirective
```

```
this.setValue()
```

```
import { setCommittedValue } from 'lit/directive-helpers.js';
```

```
setCommittedValue(part, value?): unknown
```

```
Part
```

```
unknown
```

```
import { TemplateResultType } from 'lit/directive-helpers.js';
```

```
{HTML: 1, SVG: 2}
```

```
import { noChange } from 'lit';
```

```
symbol
```

