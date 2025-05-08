# Styles

Applies the given styles to a shadowRoot. When Shadow DOM is available but adoptedStyleSheets is not, styles are appended to the shadowRoot to mimic spec behavior. Note, when shimming is used, any styles that are subsequently placed into the shadowRoot should be placed before any shimmed adopted styles. This will match spec behavior that gives adopted sheets precedence over styles in shadowRoot.

adoptStyles(renderRoot, styles): void

A template literal tag which can be used with LitElement's styles property to set element styles.

css(strings, values): CSSResult

For security reasons, only literal string values and number may be used in embedded expressions. To incorporate non-literal values unsafeCSS may be used inside an expression.

A container for a string of CSS text, that may be used to create a CSSStyleSheet.

CSSResult is the return value of css-tagged template literals and unsafeCSS(). In order to ensure that CSSResults are only created via the css tag and unsafeCSS(), CSSResult cannot be constructed directly.

getCompatibleStyle(s): CSSResultOrNative

Whether the current browser supports adoptedStyleSheets.

Wrap a value for interpolation in a css tagged template literal.

unsafeCSS(value): CSSResult

This is unsafe because untrusted CSS text can be used to phone home or exfiltrate data to an attacker controlled site. Take care to only use this with trusted input.

A single CSSResult, CSSStyleSheet, or an array or nested arrays of those.

A CSSResult or native CSSStyleSheet.

In browsers that support constructible CSS style sheets, CSSStyleSheet object can be used for styling along side CSSResult from the css template tag.


1. adoptStyles
2. css
3. CSSResult
4. getCompatibleStyle
5. supportsAdoptingStyleSheets
6. unsafeCSS
7. CSSResultArray
8. CSSResultGroup
9. CSSResultOrNative

```
shadowRoot
```

```
adoptedStyleSheets
```

```
shadowRoot
```

```
import { adoptStyles } from 'lit';
```

```
adoptStyles(renderRoot, styles): void
```

```
MDN ShadowRoot
```

```
Array<CSSResultOrNative>
```

```
styles
```

```
import { css } from 'lit';
```

```
css(strings, values): CSSResult
```

```
TemplateStringsArray
```

```
Array<number | CSSResultGroup>
```

```
unsafeCSS
```

```
import { CSSResult } from 'lit';
```

```
css
```

```
unsafeCSS()
```

```
css
```

```
unsafeCSS()
```

```
import { getCompatibleStyle } from 'lit';
```

```
getCompatibleStyle(s): CSSResultOrNative
```

```
CSSResultOrNative
```

```
adoptedStyleSheets
```

```
import { supportsAdoptingStyleSheets } from 'lit';
```

```
boolean
```

```
css
```

```
import { unsafeCSS } from 'lit';
```

```
unsafeCSS(value): CSSResult
```

```
unknown
```

```
import { CSSResultArray } from 'lit';
```

```
Array<CSSResultOrNative | CSSResultArray>
```

```
import { CSSResultGroup } from 'lit';
```

```
CSSResultOrNative | CSSResultArray
```

```
import { CSSResultOrNative } from 'lit';
```

```
CSSResult | MDN CSSStyleSheet
```

```
css
```

