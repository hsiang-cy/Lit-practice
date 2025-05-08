# Lists

You can use standard JavaScript constructs to create repeating templates.

Lit also provides a repeat directive to build certain kinds of dynamic lists more efficiently.

When an expression in the child position returns an array or iterable, Lit renders all of the items in the array:



In most cases, you'll want to transform the array items into a more useful form.

To render lists, you can use map to transform a list of data into a list of templates:



Note that this expression returns an array of TemplateResult objects. Lit will render an array or iterable of sub-templates and other values.

You can also build an array of templates and pass it into a template expression.

In most cases, using loops or map is an efficient way to build repeating templates. However, if you want to reorder a large list, or mutate it by adding and removing individual entries, this approach can involve updating a large number of DOM nodes.

The repeat directive can help here.

The repeat directive performs efficient updates of lists based on user-supplied keys:

Where:

For example:



If you re-sort the employees array, the repeat directive reorders the existing DOM nodes.

To compare this to Lit's default handling for lists, consider reversing a large list of names:

Which repeat is more efficient depends on your use case:

If updating the DOM nodes is more expensive than moving them, use the repeat directive.

If the DOM nodes have state that isn't controlled by a template expression, use the repeat directive.

For example, consider this list:

The checkbox has a checked or unchecked state, but it isn't controlled by a template expression.

If you reorder the list after the user has checked one or more checkboxes, Lit would update the names associated with the checkboxes, but not the state of the checkboxes.

If neither of these situations apply, use map or looping statements.


1. Rendering arrays
2. Repeating templates with map
3. Repeating templates with looping statements
4. The repeat directiveWhen to use map or repeat
5. When to use map or repeat


1. When to use map or repeat


* items is an array or iterable.
* keyFunction is a function that takes a single item as an argument and returns a guaranteed unique key for that item.
* itemTemplate is a template function that takes the item and its current index as arguments, and returns a TemplateResult.


* For a list created using map, Lit maintains the DOM nodes for the list items, but reassigns the values.
* For a list created using repeat, the repeat directive reorders the existing DOM nodes, so the nodes representing the first list item move to the last position.


* If updating the DOM nodes is more expensive than moving them, use the repeat directive. 
* If the DOM nodes have state that isn't controlled by a template expression, use the repeat directive. For example, consider this list: The checkbox has a checked or unchecked state, but it isn't controlled by a template expression. If you reorder the list after the user has checked one or more checkboxes, Lit would update the names associated with the checkboxes, but not the state of the checkboxes. 

```
repeat
```

```
map
```

```
TemplateResult
```

```
render() {  const itemTemplates = [];  for (const i of this.items) {    itemTemplates.push(html`<li>${i}</li>`);  }
  return html`    <ul>      ${itemTemplates}    </ul>  `;}
```

```
render() {  const itemTemplates = [];  for (const i of this.items) {    itemTemplates.push(html`<li>${i}</li>`);  }
  return html`    <ul>      ${itemTemplates}    </ul>  `;}
```

```
render() {
```

```
const itemTemplates = [];
```

```
for (const i of this.items) {
```

```
itemTemplates.push(html`<li>${i}</li>`);
```

```
}
```

```
return html`
```

```
<ul>
```

```
${itemTemplates}
```

```
</ul>
```

```
`;
```

```
}
```

```
map
```

```
repeat
```

```
repeat(items, keyFunction, itemTemplate)
```

```
repeat(items, keyFunction, itemTemplate)
```

```
repeat(items, keyFunction, itemTemplate)
```

```
items
```

```
keyFunction
```

```
itemTemplate
```

```
TemplateResult
```

```
employees
```

```
repeat
```

```
map
```

```
repeat
```

```
repeat
```

```
repeat
```

```
repeat
```

```
html`${this.users.map((user) =>  html`    <div><input type="checkbox"> ${user.name}</div>  `)}`
```

```
html`${this.users.map((user) =>  html`    <div><input type="checkbox"> ${user.name}</div>  `)}`
```

```
html`${this.users.map((user) =>
```

```
html`
```

```
<div><input type="checkbox"> ${user.name}</div>
```

```
`)
```

```
}`
```

```
map
```

```
代碼示例 (項目: v3-docs/templates/lists-arrays, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/templates/lists-map, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

```
代碼示例 (項目: v3-docs/templates/lists-repeat, 文件: my-element.ts)
請參考原始頁面查看完整示例
```

