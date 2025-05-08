# Conditionals

Since Lit leverages normal Javascript expressions, you can use standard Javascript control flow constructs like conditional operators, function calls, and if or switch statements to render conditional content.

JavaScript conditionals also let you combine nested template expressions, and you can even store template results in variables to use elsewhere.

Ternary expressions with the conditional operator, ?, are a great way to add inline conditionals:

You can express conditional logic with if statements outside of a template to compute values to use inside of the template:

Alternately, you can factor logic into a separate function to simplify your template:

In most cases, JavaScript conditionals are all you need for conditional templates. However, if you're switching between large, complicated templates, you might want to save the cost of recreating DOM on each switch.

In this case, you can use the cache directive. The cache directive caches DOM for templates that aren't being rendered currently.

See the cache directive for more information.

Sometimes, you may want to render nothing in one branch of a conditional operator. This is commonly needed for child expressions and also sometimes needed in attribute expressions.

For child expressions, the values undefined, null, the empty string (''), and Lit's nothing sentinel value all render no nodes. See Removing child content for more information.

This example renders a value if it exists, and otherwise renders nothing:

For attribute expressions, Lit's nothing sentinel value removes the attribute. See Removing an attribute for more information.

This example conditionally renders the aria-label attribute:


1. Conditionals with the conditional (ternary) operator
2. Conditionals with if statements
3. Caching template results: the cache directive
4. Conditionally rendering nothing

```
if
```

```
switch
```

```
?
```

```
render() {  return this.userName    ? html`Welcome ${this.userName}`    : html`Please log in <button>Login</button>`;}
```

```
render() {  return this.userName    ? html`Welcome ${this.userName}`    : html`Please log in <button>Login</button>`;}
```

```
render() {
```

```
return this.userName
```

```
? html`Welcome ${this.userName}`
```

```
: html`Please log in <button>Login</button>`;
```

```
}
```

```
render() {  let message;  if (this.userName) {    message = html`Welcome ${this.userName}`;  } else {    message = html`Please log in <button>Login</button>`;  }  return html`<p class="message">${message}</p>`;}
```

```
render() {  let message;  if (this.userName) {    message = html`Welcome ${this.userName}`;  } else {    message = html`Please log in <button>Login</button>`;  }  return html`<p class="message">${message}</p>`;}
```

```
render() {
```

```
let message;
```

```
if (this.userName) {
```

```
message = html`Welcome ${this.userName}`;
```

```
} else {
```

```
message = html`Please log in <button>Login</button>`;
```

```
}
```

```
return html`<p class="message">${message}</p>`;
```

```
}
```

```
getUserMessage() {  if (this.userName) {    return html`Welcome ${this.userName}`;  } else {    return html`Please log in <button>Login</button>`;  }}render() {  return html`<p>${this.getUserMessage()}</p>`;}
```

```
getUserMessage() {  if (this.userName) {    return html`Welcome ${this.userName}`;  } else {    return html`Please log in <button>Login</button>`;  }}render() {  return html`<p>${this.getUserMessage()}</p>`;}
```

```
getUserMessage() {
```

```
if (this.userName) {
```

```
return html`Welcome ${this.userName}`;
```

```
} else {
```

```
return html`Please log in <button>Login</button>`;
```

```
}
```

```
}
```

```
render() {
```

```
return html`<p>${this.getUserMessage()}</p>`;
```

```
}
```

```
cache
```

```
render() {  return html`${cache(this.userName ?    html`Welcome ${this.userName}`:    html`Please log in <button>Login</button>`)  }`;}
```

```
render() {  return html`${cache(this.userName ?    html`Welcome ${this.userName}`:    html`Please log in <button>Login</button>`)  }`;}
```

```
render() {
```

```
return html`${cache(this.userName ?
```

```
html`Welcome ${this.userName}`:
```

```
html`Please log in <button>Login</button>`)
```

```
}`;
```

```
}
```

```
undefined
```

```
null
```

```
''
```

```
render() {  return html`<user-name>${this.userName ?? nothing}</user-name>`;}
```

```
render() {  return html`<user-name>${this.userName ?? nothing}</user-name>`;}
```

```
render() {
```

```
return html`<user-name>${this.userName ?? nothing}</user-name>`;
```

```
}
```

```
aria-label
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

```
html`<button aria-label="${this.ariaLabel || nothing}"></button>`
```

