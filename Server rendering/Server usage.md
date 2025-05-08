# Server usage

Server rendering begins with rendering a Lit template with a server-specific render() function provided in the @lit-labs/ssr package.

The signature of the render function is:

Typically value is a TemplateResult produced by a Lit template expression, like:

The template can contain custom elements. If the custom elements are defined on the server, they'll be rendered in turn, along with their templates.

To render a single element, you render a template that only contains that element:

render() returns a RenderResult: an iterable of values that can be streamed or concatenated into a string.

A RenderResult can contain strings, nested render results, or Promises of strings or render results. Not all render results contain Promises—those can occur when custom elements perform async tasks, like fetching data—but because a RenderResult can contain Promises, processing it into a string or an HTTP response is potentially an async operation.

Even though a RenderResult can contain Promises, it is still a sync iterable, not an async iterable. This is because sync iterables are faster than async iterables and many server renders will not require async rendering, and so shouldn't pay the overhead of an async iterable.

Allowing Promises in a sync iterable creates a kind of hybrid sync / async iteration protocol. When consuming a RenderResult, you must check each value to see if it is a Promise or iterable and wait or recurse as needed.

@lit-labs/ssr contains three utilities to do this for you:

RenderResultReadable is a Node Readable stream implementation that provides values from a RenderResult. This can be piped into a Writable stream, or passed to web server frameworks like Koa.

This is the preferred way to handle SSR results when integrating with a streaming HTTP server or other stream-supporting API.

collectResult(result: RenderResult): Promise<string>

collectResult() is an async function that takes a RenderResult and joins it into a string. It waits for Promises and recurses into nested iterables.

collectResultSync(result: RenderResult): Promise<string>

collectResultSync() is a sync function that takes a RenderResult and joins it into a string. It recurses into nested iterables, but throws when it encounters a Promise.

Because this function doesn't support async rendering, it's recommended to only use it when you can't await async functions.

The second argument to render() is a RenderInfo object that is used to pass options and current render state to components and sub-templates.

The main options that can be set by callers are:

In order to render custom elements in Node, they must first be defined and registered with the global customElements API, which is a browser-only feature. As such, when Lit runs in Node, it automatically uses a set of minimal DOM APIs necessary to render Lit on the server, and defines the customElements global. (For a list of emulated APIs, see DOM emulation.)

Lit SSR provides two different ways of rendering custom elements server-side: rendering in the global scope or via VM modules. VM modules utilizes Node's vm.Module API, which enables running code within V8 Virtual Machine contexts. The two methods differ primarily in how global state, such as the custom elements registry, are shared.

When rendering in the global scope, a single shared customElements registry will be defined and shared across all render requests, along with any other global state that your component code might set.

Rendering with VM modules allows each render request to have its own context with a separate global from the main Node process. The customElements registry will only be installed within that context, and other global state will also be isolated to that context. VM modules are an experimental Node feature.

When using the global scope, you can just call render() with a template to get a RenderResult and pass that to your server:

Lit also provide a way to load application code into, and render from, a separate VM context with its own global object.

Note: Using this feature requires Node 14+ and passing the --experimental-vm-modules flag to Node because of its use of experimental VM modules for creating a module-compatible VM context.


1. Rendering templatesHandling RenderResultsRender options
2. Handling RenderResults
3. Render options
4. Running SSR in a VM module or the global scopeGlobal ScopeVM Module
5. Global Scope
6. VM Module


1. Handling RenderResults
2. Render options


1. Global Scope
2. VM Module


* RenderResultReadable
* collectResult()
* collectResultSync()


* deferHydration: controls whether the top-level custom elements have a defer-hydration attribute added to signal that the elements should not automatically hydrate. This defaults to false so that top-level elements do automatically hydrate.
* elementRenderers: An array of ElementRenderer classes to use for rendering custom elements. By default this contains LitElementRenderer to render Lit elements. It can be set to include custom ElementRenderer instances (documentation forthcoming), or set to an empty array to disable custom element rendering altogether.


* Easy to use. Can import component modules directly and call render() with templates.


* Custom elements are registered in a shared registry across different render requests.


* Isolates contexts across different render requests.


* Less intuitive usage. Need to write and specify a module file with a function to call.
* Slower due the module graph needing to be re-evaluated per request.

```
render()
```

```
@lit-labs/ssr
```

```
render(value: unknown, renderInfo?: Partial<RenderInfo>): RenderResult
```

```
render(value: unknown, renderInfo?: Partial<RenderInfo>): RenderResult
```

```
render(value: unknown, renderInfo?: Partial<RenderInfo>): RenderResult
```

```
value
```

```
TemplateResult
```

```
html`<h1>Hello</h1>`
```

```
html`<h1>Hello</h1>`
```

```
html`<h1>Hello</h1>`
```

```
import {render} from '@lit-labs/ssr';import {html} from 'lit';// Import `my-element` on the server to server render it.import './my-element.js';
const result = render(html`  <h1>Hello SSR!</h1>  <my-element></my-element>`);
```

```
import {render} from '@lit-labs/ssr';import {html} from 'lit';// Import `my-element` on the server to server render it.import './my-element.js';
const result = render(html`  <h1>Hello SSR!</h1>  <my-element></my-element>`);
```

```
import {render} from '@lit-labs/ssr';
```

```
import {html} from 'lit';
```

```
// Import `my-element` on the server to server render it.
```

```
import './my-element.js';
```

```
const result = render(html`
```

```
<h1>Hello SSR!</h1>
```

```
<my-element></my-element>
```

```
`);
```

```
import {html} from 'lit';import './my-element.js';
const result = render(html`<my-element></my-element>`);
```

```
import {html} from 'lit';import './my-element.js';
const result = render(html`<my-element></my-element>`);
```

```
import {html} from 'lit';
```

```
import './my-element.js';
```

```
const result = render(html`<my-element></my-element>`);
```

```
render()
```

```
RenderResult
```

```
RenderResult
```

```
RenderResult
```

```
RenderResult
```

```
RenderResult
```

```
@lit-labs/ssr
```

```
RenderResultReadable
```

```
collectResult()
```

```
collectResultSync()
```

```
RenderResultReadable
```

```
RenderResultReadable
```

```
Readable
```

```
RenderResult
```

```
Writable
```

```
import {render} from '@lit-labs/ssr';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';import {html} from 'lit';
// Using Koa to streamapp.use(async (ctx) => {  const result = render(html`<my-element></my-element>`);  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(result);});
```

```
import {render} from '@lit-labs/ssr';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';import {html} from 'lit';
// Using Koa to streamapp.use(async (ctx) => {  const result = render(html`<my-element></my-element>`);  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(result);});
```

```
import {render} from '@lit-labs/ssr';
```

```
import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
```

```
import {html} from 'lit';
```

```
// Using Koa to stream
```

```
app.use(async (ctx) => {
```

```
const result = render(html`<my-element></my-element>`);
```

```
ctx.type = 'text/html';
```

```
ctx.body = new RenderResultReadable(result);
```

```
});
```

```
collectResult()
```

```
collectResult(result: RenderResult): Promise<string>
```

```
collectResult()
```

```
RenderResult
```

```
import {render} from '@lit-labs/ssr';import {collectResult} from '@lit-labs/ssr/lib/render-result.js';import {html} from 'lit';
const result = render(html`<my-element></my-element>`);const contents = await collectResult(result);
```

```
import {render} from '@lit-labs/ssr';import {collectResult} from '@lit-labs/ssr/lib/render-result.js';import {html} from 'lit';
const result = render(html`<my-element></my-element>`);const contents = await collectResult(result);
```

```
import {render} from '@lit-labs/ssr';
```

```
import {collectResult} from '@lit-labs/ssr/lib/render-result.js';
```

```
import {html} from 'lit';
```

```
const result = render(html`<my-element></my-element>`);
```

```
const contents = await collectResult(result);
```

```
collectResultSync()
```

```
collectResultSync(result: RenderResult): Promise<string>
```

```
collectResultSync()
```

```
RenderResult
```

```
import {render} from '@lit-labs/ssr';import {collectResultSync} from '@lit-labs/ssr/lib/render-result.js';import {html} from 'lit';
const result = render(html`<my-element></my-element>`);// Throws if `result` contains a Promise!const contents = collectResultSync(result);
```

```
import {render} from '@lit-labs/ssr';import {collectResultSync} from '@lit-labs/ssr/lib/render-result.js';import {html} from 'lit';
const result = render(html`<my-element></my-element>`);// Throws if `result` contains a Promise!const contents = collectResultSync(result);
```

```
import {render} from '@lit-labs/ssr';
```

```
import {collectResultSync} from '@lit-labs/ssr/lib/render-result.js';
```

```
import {html} from 'lit';
```

```
const result = render(html`<my-element></my-element>`);
```

```
// Throws if `result` contains a Promise!
```

```
const contents = collectResultSync(result);
```

```
render()
```

```
RenderInfo
```

```
deferHydration
```

```
defer-hydration
```

```
false
```

```
elementRenderers
```

```
ElementRenderer
```

```
LitElementRenderer
```

```
ElementRenderer
```

```
customElements
```

```
customElements
```

```
vm.Module
```

```
customElements
```

```
customElements
```

```
render()
```

```
render()
```

```
RenderResult
```

```
import {render} from '@lit-labs/ssr';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';import {myTemplate} from './my-template.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const ssrResult = render(myTemplate(data));  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
import {render} from '@lit-labs/ssr';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';import {myTemplate} from './my-template.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const ssrResult = render(myTemplate(data));  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
import {render} from '@lit-labs/ssr';
```

```
import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
```

```
import {myTemplate} from './my-template.js';
```

```
// ...
```

```
// within a Koa middleware, for example
```

```
app.use(async (ctx) => {
```

```
const ssrResult = render(myTemplate(data));
```

```
ctx.type = 'text/html';
```

```
ctx.body = new RenderResultReadable(ssrResult);
```

```
});
```

```
// render-template.jsimport {render} from '@lit-labs/ssr';import {myTemplate} from './my-template.js';
export const renderTemplate = (someData) => {  return render(myTemplate(someData));};
```

```
// render-template.jsimport {render} from '@lit-labs/ssr';import {myTemplate} from './my-template.js';
export const renderTemplate = (someData) => {  return render(myTemplate(someData));};
```

```
// render-template.js
```

```
import {render} from '@lit-labs/ssr';
```

```
import {myTemplate} from './my-template.js';
```

```
export const renderTemplate = (someData) => {
```

```
return render(myTemplate(someData));
```

```
};
```

```
// server.jsimport {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const moduleLoader = new ModuleLoader();  const importResult = await moduleLoader.importModule(    './render-template.js',  // Module to load in VM context    import.meta.url          // Referrer URL for module  );  const {renderTemplate} = importResult.module.namespace    as typeof import('./render-template.js')  const ssrResult = await renderTemplate({some: "data"});  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
// server.jsimport {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const moduleLoader = new ModuleLoader();  const importResult = await moduleLoader.importModule(    './render-template.js',  // Module to load in VM context    import.meta.url          // Referrer URL for module  );  const {renderTemplate} = importResult.module.namespace    as typeof import('./render-template.js')  const ssrResult = await renderTemplate({some: "data"});  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
// server.js
```

```
import {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';
```

```
import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
```

```
// ...
```

```
// within a Koa middleware, for example
```

```
app.use(async (ctx) => {
```

```
const moduleLoader = new ModuleLoader();
```

```
const importResult = await moduleLoader.importModule(
```

```
'./render-template.js',  // Module to load in VM context
```

```
import.meta.url          // Referrer URL for module
```

```
);
```

```
const {renderTemplate} = importResult.module.namespace
```

```
as typeof import('./render-template.js')
```

```
const ssrResult = await renderTemplate({some: "data"});
```

```
ctx.type = 'text/html';
```

```
ctx.body = new RenderResultReadable(ssrResult);
```

```
});
```

```
// server.jsimport {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const moduleLoader = new ModuleLoader();  const importResult = await moduleLoader.importModule(    './render-template.js',  // Module to load in VM context    import.meta.url          // Referrer URL for module  );  const {renderTemplate} = importResult.module.namespace;  const ssrResult = await renderTemplate({some: "data"});  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
// server.jsimport {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
// ...
// within a Koa middleware, for exampleapp.use(async (ctx) => {  const moduleLoader = new ModuleLoader();  const importResult = await moduleLoader.importModule(    './render-template.js',  // Module to load in VM context    import.meta.url          // Referrer URL for module  );  const {renderTemplate} = importResult.module.namespace;  const ssrResult = await renderTemplate({some: "data"});  ctx.type = 'text/html';  ctx.body = new RenderResultReadable(ssrResult);});
```

```
// server.js
```

```
import {ModuleLoader} from '@lit-labs/ssr/lib/module-loader.js';
```

```
import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';
```

```
// ...
```

```
// within a Koa middleware, for example
```

```
app.use(async (ctx) => {
```

```
const moduleLoader = new ModuleLoader();
```

```
const importResult = await moduleLoader.importModule(
```

```
'./render-template.js',  // Module to load in VM context
```

```
import.meta.url          // Referrer URL for module
```

```
);
```

```
const {renderTemplate} = importResult.module.namespace;
```

```
const ssrResult = await renderTemplate({some: "data"});
```

```
ctx.type = 'text/html';
```

```
ctx.body = new RenderResultReadable(ssrResult);
```

```
});
```

```
--experimental-vm-modules
```

