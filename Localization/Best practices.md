# Best practices

Each time the msg function is called, it returns a version of the given string or Lit template in the active locale. However, this result is just a normal string or template; it is not intrinsically capable of re-rendering itself when the locale changes.

For this reason, it is important to write msg calls in a way that ensures they will be re-evaluated each time the Lit render method runs. This way, when the locale changes, the correct string or template for the latest locale will be returned.

One situation where it is easy to make a mistake here is when localizing property default values. It may seem natural to write this:

However, the above pattern provides no opportunity for the default label to be updated when the locale changes. The default value will get stuck at the version from the locale that happened to be active when the element was instantiated.

A simple fix is to move the default value fallback directly into the render method:

Alternatively, a custom getter/setter can be used to create a more natural interface:

While @lit/localize has full support for embedding HTML markup inside localized templates, it's best to avoid doing so whenever possible. This is because:

It's easier for translators to deal with simple string phrases instead of phrases with embedded markup.

It avoids unnecessary re-translation work when markup changes, such as when adding a class that affects appearance without changing the meaning.

It will typically be faster to swap locales, because fewer parts of the DOM will need to update. Also, less JavaScript will be included in your bundles, because common markup will not need to be duplicated into each translation.

Not ideal:

Ideal:

Breaking templates into smaller pieces can also be helpful:

When using transform mode, templates will be automatically flattened to make them as small and efficient as possible. After transformation, the above example won't have any placeholders, because it knows that strings can be directly merged into HTML templates.

There are cases where HTML should be included in the localized template. For example where an HTML tag is needed in the middle of a phrase:

Static analysis is used to determine when you are calling the @lit/localize msg function and other APIs, as opposed to a different function with the same name.

It is possible to re-export or re-assign the msg function and other APIs, and most of the time this will just work.

However, certain patterns may be too dynamic for static analysis to understand. If a message is failing to be extracted, and you have re-assigned or re-exported the msg function, this could be the cause.

To force a function to be analyzed as a @lit/localize API, you can use a JSDoc @type comment in JavaScript, or a type cast in TypeScript:


1. Ensure re-evaluation on render
2. Avoid unnecessary HTML markup
3. Safely re-exporting or re-assigning localize APIs


1. It's easier for translators to deal with simple string phrases instead of phrases with embedded markup. 
2. It avoids unnecessary re-translation work when markup changes, such as when adding a class that affects appearance without changing the meaning. 
3. It will typically be faster to swap locales, because fewer parts of the DOM will need to update. Also, less JavaScript will be included in your bundles, because common markup will not need to be duplicated into each translation. 

```
msg
```

```
msg
```

```
render
```

```
// Don't do this!label = msg('Default label')
render() {  return html`<button>${this.label}</button>`;}
```

```
// Don't do this!label = msg('Default label')
render() {  return html`<button>${this.label}</button>`;}
```

```
// Don't do this!
```

```
label = msg('Default label')
```

```
render() {
```

```
return html`<button>${this.label}</button>`;
```

```
}
```

```
render() {  return html`<button>${this.label ?? msg('Default label')}</button>`;}
```

```
render() {  return html`<button>${this.label ?? msg('Default label')}</button>`;}
```

```
render() {
```

```
return html`<button>${this.label ?? msg('Default label')}</button>`;
```

```
}
```

```
private _label?: string;
@property()get label() {  return this._label ?? msg('Default label');}
set label(label: string) {  this._label = label;}
render() {  return html`<button>${this.label}</button>`;}
```

```
private _label?: string;
@property()get label() {  return this._label ?? msg('Default label');}
set label(label: string) {  this._label = label;}
render() {  return html`<button>${this.label}</button>`;}
```

```
private _label?: string;
```

```
@property()
```

```
get label() {
```

```
return this._label ?? msg('Default label');
```

```
}
```

```
set label(label: string) {
```

```
this._label = label;
```

```
}
```

```
render() {
```

```
return html`<button>${this.label}</button>`;
```

```
}
```

```
static properties = {  label: {}};
get label() {  return this._label ?? msg('Default label');}
set label(label) {  this._label = label;}
render() {  return html`<button>${this.label}</button>`;}
```

```
static properties = {  label: {}};
get label() {  return this._label ?? msg('Default label');}
set label(label) {  this._label = label;}
render() {  return html`<button>${this.label}</button>`;}
```

```
static properties = {
```

```
label: {}
```

```
};
```

```
get label() {
```

```
return this._label ?? msg('Default label');
```

```
}
```

```
set label(label) {
```

```
this._label = label;
```

```
}
```

```
render() {
```

```
return html`<button>${this.label}</button>`;
```

```
}
```

```
@lit/localize
```

```
render() {  // Don't do this! There's no reason to include the <button> tag in this  // localized template.  return msg(html`<button>Launch rocket</button>`);}
```

```
render() {  // Don't do this! There's no reason to include the <button> tag in this  // localized template.  return msg(html`<button>Launch rocket</button>`);}
```

```
render() {
```

```
// Don't do this! There's no reason to include the <button> tag in this
```

```
// localized template.
```

```
return msg(html`<button>Launch rocket</button>`);
```

```
}
```

```
render() {  // Much better! Now the phrase "Launch rocket" can be translated more easily  // in isolation.  return html`<button>${msg('Launch rocket')}</button>`;}
```

```
render() {  // Much better! Now the phrase "Launch rocket" can be translated more easily  // in isolation.  return html`<button>${msg('Launch rocket')}</button>`;}
```

```
render() {
```

```
// Much better! Now the phrase "Launch rocket" can be translated more easily
```

```
// in isolation.
```

```
return html`<button>${msg('Launch rocket')}</button>`;
```

```
}
```

```
render() {  // Don't do this!  return msg(html`  <p>The red button makes the rocket go up.</p>  <p>The green button makes the rocket do a flip.</p>  `);}
```

```
render() {  // Don't do this!  return msg(html`  <p>The red button makes the rocket go up.</p>  <p>The green button makes the rocket do a flip.</p>  `);}
```

```
render() {
```

```
// Don't do this!
```

```
return msg(html`
```

```
<p>The red button makes the rocket go up.</p>
```

```
<p>The green button makes the rocket do a flip.</p>
```

```
`);
```

```
}
```

```
render() {  // Better! No markup needs to be processed by translators, and each sentence  // can be translated independently.  return html`  <p>${msg('The red button makes the rocket go up.')}</p>  <p>${msg('The green button makes the rocket do a flip.')}</p>  `;}
```

```
render() {  // Better! No markup needs to be processed by translators, and each sentence  // can be translated independently.  return html`  <p>${msg('The red button makes the rocket go up.')}</p>  <p>${msg('The green button makes the rocket do a flip.')}</p>  `;}
```

```
render() {
```

```
// Better! No markup needs to be processed by translators, and each sentence
```

```
// can be translated independently.
```

```
return html`
```

```
<p>${msg('The red button makes the rocket go up.')}</p>
```

```
<p>${msg('The green button makes the rocket do a flip.')}</p>
```

```
`;
```

```
}
```

```
render() {  return msg(html`Lift off in <b>T-${this.countdown}</b> seconds`);}
```

```
render() {  return msg(html`Lift off in <b>T-${this.countdown}</b> seconds`);}
```

```
render() {
```

```
return msg(html`Lift off in <b>T-${this.countdown}</b> seconds`);
```

```
}
```

```
@lit/localize
```

```
msg
```

```
msg
```

```
msg
```

```
@lit/localize
```

```
@type
```

```
const myMsg = ... as typeof import('@lit/localize').msg;
```

```
const myMsg = ... as typeof import('@lit/localize').msg;
```

```
const myMsg = ... as typeof import('@lit/localize').msg;
```

```
/** @type import('@lit/localize').msg */const myMsg = ...;
```

```
/** @type import('@lit/localize').msg */const myMsg = ...;
```

```
/** @type import('@lit/localize').msg */
```

```
const myMsg = ...;
```

