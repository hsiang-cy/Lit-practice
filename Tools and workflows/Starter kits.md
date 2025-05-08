# Starter kits

The Lit Starter Kits are project templates for reusable Lit components that can be published for others to use.

To get started working on a component locally, you can use one of these starter projects:

Both projects define a Lit component. They also add a set of optional tools for developing, linting, and testing the component:

None of these tools is required to work with Lit. They represent one possible set of tools for a good developer experience.

Alternative starting point. As an alternative to the official Lit starter projects, the Open WC project has a project generator for web components using Lit. The Open WC script asks a series of questions and scaffolds out a project for you.

The quickest way to try out a project locally is to download one of the starter projects as a zip file.

Download the starter project from GitHub as a zip file:

Uncompress the zip file.

Install dependencies.

Want it on GitHub? If you're familiar with git you may want to create a GitHub repository for your starter project, instead of just downloading the zip file. You can use the GitHub template repository feature to create your own repository from the JavaScript starter project or the TypeScript starter project. Then clone your new repository and install dependencies, as above.

If you're using the TypeScript version of the starter, build the JavaScript version of your project:

To watch files and rebuild when the files are modified, run the following command in a separate shell:

No build step is required if you're using the JavaScript version of the starter project.

Run the dev server:

Open the project demo page in a browser tab. For example:

http://localhost:8000/dev/

Your server may use a different port number. Check the URL in the terminal output for the correct port number.

Edit your component definition. The file you edit depends on which language you're using:

A couple of things to look for in the code:

The code defines a class for the component (MyElement) and registers it with the browser as a custom element named <my-element>.

The component's render method defines a template that will be rendered as a part of the component. In this case, it includes some text, some data bindings, and a button. For more information, see Templates.

The component defines some properties. The component responds to changes in these properties (for example, by re-rendering the template when necessary). For more information, see Properties.

You'll probably want to change the component name from "my-element" to something more appropriate. This is easiest to do using an IDE or other text editor that lets you do a global search and replace through an entire project.

If you're using the TypeScript version, remove generated files:

Search and replace "my-element" with your new component name in all files in your project (except in the node_modules folder).

Search and replace "MyElement" with your new class name in all files in your project (except in the node_modules folder).

Rename the source and test files to match the new component name:

JavaScript:

TypeScript:

If you're using the TypeScript version, rebuild the project:

Test and make sure your component is still working:

Ready to add features to your component? Head over to Components to learn about building your first Lit component, or Templates for details on writing templates.

For details on running tests and using other tools, see the starter project README:

For a guide on publishing your component to npm, see Publishing.


1. Download the starter project
2. Try out your project
3. Edit your component
4. Rename your component
5. Next steps


* Lit JavaScript starter project
* Lit TypeScript starter project


* Node.js and npm for managing dependencies. Requires Node.js 10 or greater.
* A local dev server, Web Dev Server.
* Linting with ESLint and lit-analyzer.
* Testing with Web Test Runner.
* A static doc site built with web-component-analyzer and eleventy.


1. Download the starter project from GitHub as a zip file: 
2. JavaScript starter project
3. TypeScript starter project
4. Uncompress the zip file. 
5. Install dependencies. 


* JavaScript starter project
* TypeScript starter project


1. If you're using the TypeScript version of the starter, build the JavaScript version of your project: To watch files and rebuild when the files are modified, run the following command in a separate shell: No build step is required if you're using the JavaScript version of the starter project. 
2. Run the dev server: 
3. Open the project demo page in a browser tab. For example: http://localhost:8000/dev/ Your server may use a different port number. Check the URL in the terminal output for the correct port number. 


* JavaScript. Edit the my-element.js file in the project root.
* TypeScript. Edit the my-element.ts file in the src directory.


* The code defines a class for the component (MyElement) and registers it with the browser as a custom element named <my-element>. 
* The component's render method defines a template that will be rendered as a part of the component. In this case, it includes some text, some data bindings, and a button. For more information, see Templates. 
* The component defines some properties. The component responds to changes in these properties (for example, by re-rendering the template when necessary). For more information, see Properties. 


1. If you're using the TypeScript version, remove generated files: 
2. Search and replace "my-element" with your new component name in all files in your project (except in the node_modules folder). 
3. Search and replace "MyElement" with your new class name in all files in your project (except in the node_modules folder). 
4. Rename the source and test files to match the new component name: JavaScript: TypeScript: 
5. src/my-element.js
6. src/test/my-element_test.js
7. src/my-element.ts
8. src/test/my-element_test.ts
9. If you're using the TypeScript version, rebuild the project: 
10. Test and make sure your component is still working: 


* src/my-element.js
* src/test/my-element_test.js


* src/my-element.ts
* src/test/my-element_test.ts


* TypeScript project README
* JavaScript project README

```
cd <project folder>npm i
```

```
cd <project folder>npm i
```

```
cd <project folder>
```

```
npm i
```

```
npm run build
```

```
npm run build
```

```
npm run build
```

```
npm run build:watch
```

```
npm run build:watch
```

```
npm run build:watch
```

```
npm run serve
```

```
npm run serve
```

```
npm run serve
```

```
my-element.js
```

```
my-element.ts
```

```
src
```

```
MyElement
```

```
<my-element>
```

```
@customElement('my-element')export class MyElement extends LitElement { /* ... */ }
```

```
@customElement('my-element')export class MyElement extends LitElement { /* ... */ }
```

```
@customElement('my-element')
```

```
export class MyElement extends LitElement { /* ... */ }
```

```
export class MyElement extends LitElement { /* ... */ }
customElements.define('my-element', MyElement);
```

```
export class MyElement extends LitElement { /* ... */ }
customElements.define('my-element', MyElement);
```

```
export class MyElement extends LitElement { /* ... */ }
```

```
customElements.define('my-element', MyElement);
```

```
render
```

```
export class MyElement extends LitElement {  // ...  render() {    return html`      <h1>Hello, ${this.name}!</h1>      <button @click=${this._onClick}>        Click Count: ${this.count}      </button>      <slot></slot>    `;  }}
```

```
export class MyElement extends LitElement {  // ...  render() {    return html`      <h1>Hello, ${this.name}!</h1>      <button @click=${this._onClick}>        Click Count: ${this.count}      </button>      <slot></slot>    `;  }}
```

```
export class MyElement extends LitElement {
```

```
// ...
```

```
render() {
```

```
return html`
```

```
<h1>Hello, ${this.name}!</h1>
```

```
<button @click=${this._onClick}>
```

```
Click Count: ${this.count}
```

```
</button>
```

```
<slot></slot>
```

```
`;
```

```
}
```

```
}
```

```
export class MyElement extends LitElement {  // ...  @property({type: String})  name = 'World';  //...}
```

```
export class MyElement extends LitElement {  // ...  @property({type: String})  name = 'World';  //...}
```

```
export class MyElement extends LitElement {
```

```
// ...
```

```
@property({type: String})
```

```
name = 'World';
```

```
//...
```

```
}
```

```
export class MyElement extends LitElement {  // ...  static properties = {    name: {type: String}  };
  constructor() {    super();    this.name = 'World';  }  // ...}
```

```
export class MyElement extends LitElement {  // ...  static properties = {    name: {type: String}  };
  constructor() {    super();    this.name = 'World';  }  // ...}
```

```
export class MyElement extends LitElement {
```

```
// ...
```

```
static properties = {
```

```
name: {type: String}
```

```
};
```

```
constructor() {
```

```
super();
```

```
this.name = 'World';
```

```
}
```

```
// ...
```

```
}
```

```
npm run clean
```

```
npm run clean
```

```
npm run clean
```

```
node_modules
```

```
node_modules
```

```
src/my-element.js
```

```
src/test/my-element_test.js
```

```
src/my-element.ts
```

```
src/test/my-element_test.ts
```

```
npm run build
```

```
npm run build
```

```
npm run build
```

```
npm run serve
```

```
npm run serve
```

```
npm run serve
```

```
npm
```

