# Static HTML

Interprets a template literal as an HTML template that can efficiently render to and update a container.

html(strings, values): TemplateResult<ResultType>

Includes static value support from lit-html/static.js.

Tags a string literal so that it behaves like part of the static template strings instead of a dynamic value.

literal(strings, values): StaticValue

The only values that may be used in template expressions are other tagged literal results or unsafeStatic values (note that untrusted content should never be passed to unsafeStatic). Users must take care to ensure that adding the static string to the template results in well-formed HTML, or else templates may break unexpectedly. Static values can be changed, but they will cause a complete re-render since they effectively create a new template.

Interprets a template literal as an SVG template that can efficiently render to and update a container.

svg(strings, values): TemplateResult<ResultType>

Includes static value support from lit-html/static.js.

Wraps a string so that it behaves like part of the static template strings instead of a dynamic value.

unsafeStatic(value): StaticValue

Users must take care to ensure that adding the static string to the template results in well-formed HTML, or else templates may break unexpectedly. Note that this function is unsafe to use on untrusted content, as it will be directly parsed into HTML. Do not pass user input to this function without sanitizing it. Static values can be changed, but they will cause a complete re-render since they effectively create a new template.

Wraps a lit-html template tag (html or svg) to add static value support.

withStatic(coreTag): (strings: TemplateStringsArray, values: Array<unknown>) => TemplateResult<ResultType>

A value that can't be decoded from ordinary JSON, make it harder for a attacker-controlled data that goes through JSON.parse to produce a valid StaticValue.


1. html
2. literal
3. svg
4. unsafeStatic
5. withStatic
6. StaticValue

```
import { html } from 'lit/static-html.js';
```

```
html(strings, values): TemplateResult<ResultType>
```

```
TemplateStringsArray
```

```
Array<unknown>
```

```
lit-html/static.js
```

```
import { literal } from 'lit/static-html.js';
```

```
literal(strings, values): StaticValue
```

```
TemplateStringsArray
```

```
Array<unknown>
```

```
literal
```

```
unsafeStatic
```

```
unsafeStatic
```

```
import { svg } from 'lit/static-html.js';
```

```
svg(strings, values): TemplateResult<ResultType>
```

```
TemplateStringsArray
```

```
Array<unknown>
```

```
lit-html/static.js
```

```
import { unsafeStatic } from 'lit/static-html.js';
```

```
unsafeStatic(value): StaticValue
```

```
string
```

```
html
```

```
svg
```

```
import { withStatic } from 'lit/static-html.js';
```

```
withStatic(coreTag): (strings: TemplateStringsArray, values: Array<unknown>) => TemplateResult<ResultType>
```

```
(strings: TemplateStringsArray, values: Array<unknown>) => TemplateResult<1> | (strings: TemplateStringsArray, values: Array<unknown>) => TemplateResult<2>
```

```
import { StaticValue } from 'lit/static-html.js';
```

