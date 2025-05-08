# DOM emulation

When running in Node, Lit automatically imports and uses a set of DOM shims, and defines the customElements global. Only the minimal DOM interfaces needed to define and register components are implemented. These include a few key DOM classes and a roughly functioning CustomElementRegistry.

✅ signifies item is implemented to be functionally the same as in the browser.

```
customElements
```

```
CustomElementRegistry
```

```
Element
```

```
attributes
```

```
shadowRoot
```

```
{host: this}
```

```
attachShadow()
```

```
{mode: 'open'}
```

```
setAttribute()
```

```
removeAttribute()
```

```
hasAttribute()
```

```
attachShadow()
```

```
{host: this}
```

```
getAttribute()
```

```
HTMLElement
```

```
CustomElementRegistry
```

```
define()
```

```
get()
```

```
customElements
```

```
CustomElementRegistry
```

