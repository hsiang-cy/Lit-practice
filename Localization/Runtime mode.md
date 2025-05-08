# Runtime mode

In Lit Localize runtime mode, one JavaScript or TypeScript module is generated for each of your locales. Each generated module contains the localized templates for that locale. When your application switches locales, the module for that locale is imported, and all localized components are re-rendered.

See output modes for a comparison of Lit Localize output modes.

The following example demonstrates an application built with Lit Localize runtime mode:



The Lit GitHub repo includes full working examples (JavaScript, TypeScript) of Lit Localize runtime mode that you can use as templates.

In your lit-localize.json config, set the output.mode property to runtime, and set the output.outputDir property to the location where you would like your localized template modules to be generated. See runtime mode settings for more details.

Next, set output.localeCodesModule to a filepath of your chosing. Lit Localize will generate a .js or .ts module here which mirrors the sourceLocale and targetLocales settings in your config file as exported variables. The generated module will look something like this:

Finally, in your JavaScript or TypeScript project, call configureLocalization, passing an object with the following properties:

sourceLocale: string: The sourceLocale variable exported by your generated output.localeCodesModule module.

targetLocales: string[]: The targetLocales variable exported by your generated output.localeCodesModule module.

loadLocale: (locale: string) => Promise<LocaleModule>: A function that loads a localized template. Returns a promise that resolves to the generated localized template module for the given locale code. See Approaches for loading locale modules for examples of functions you can use here.

configureLocalization returns an object with the following properties:

getLocale: Function that returns the active locale code. If a new locale has started loading, getLocale will continue to return the previous locale code until the new one has finished loading.

setLocale: Function that begins switching the active locale to the given code, and returns a promise that resolves when the new locale has loaded. Example usage:

For example:

To automatically trigger a re-render of your component each time the active locale switches, apply the updateWhenLocaleChanges function in your constructor when writing JavaScript, or apply the @localized decorator to your class when writing TypeScript.

The lit-localize-status event fires on window whenever a locale switch starts, finishes, or fails. You can use this event to:

Re-render when you can't use the @localized decorator (e.g. when using the Lit render function directly).

Render as soon as a locale switch begins, even before it finishes loading (e.g. a loading indicator).

Perform other localization related tasks (e.g. setting a locale preference cookie).

The detail.status string property tells you what kind of status change has occured, and can be either loading, ready, or error:

A new locale has started to load.

The detail object contains:

In the case that a second locale is requested before the first one finishes loading, a new loading event is dispatched, and no ready or error event will be dispatched for the first request.

A loading status can be followed by a ready, error, or loading status.

A new locale has successfully loaded and is ready for rendering.

The detail object contains:

A ready status can be followed only by a loading status.

A new locale failed to load.

The detail object contains:

An error status can be followed only by a loading status.

Lit Localize lets you load locale modules however you like, because you can pass any function as the loadLocale option. Here are a few common patterns:

Use dynamic imports to load each locale only when it becomes active. This is a good default because it minimizes the amount of code that your users will download and execute.

Start pre-loading all locales when the page loads. Dynamic imports are still used to ensure that the remaining script on the page is not blocked while the locale modules are being fetched.

Use static imports to pre-load all locales in a way that blocks other script on the page.

This approach is not usually recommended because it will cause more code than necessary to be fetched and executed before the rest of the script on the page can execute, blocking interactivity. Use this approach only if your application is extremely small, must be distributed in a single JavaScript file, or you have some other restriction that prevents the use of dynamic imports.


1. Example of using runtime mode
2. Configuring runtime mode
3. Automatically re-render
4. Status eventEvent typesExample of using the status event
5. Event types
6. Example of using the status event
7. Approaches for loading locale modulesLazy-loadPre-loadStatic imports
8. Lazy-load
9. Pre-load
10. Static imports


1. Event types
2. Example of using the status event


1. Lazy-load
2. Pre-load
3. Static imports


* sourceLocale: string: The sourceLocale variable exported by your generated output.localeCodesModule module. 
* targetLocales: string[]: The targetLocales variable exported by your generated output.localeCodesModule module. 
* loadLocale: (locale: string) => Promise<LocaleModule>: A function that loads a localized template. Returns a promise that resolves to the generated localized template module for the given locale code. See Approaches for loading locale modules for examples of functions you can use here. 


* getLocale: Function that returns the active locale code. If a new locale has started loading, getLocale will continue to return the previous locale code until the new one has finished loading. 
* setLocale: Function that begins switching the active locale to the given code, and returns a promise that resolves when the new locale has loaded. Example usage: 


* Re-render when you can't use the @localized decorator (e.g. when using the Lit render function directly). 
* Render as soon as a locale switch begins, even before it finishes loading (e.g. a loading indicator). 
* Perform other localization related tasks (e.g. setting a locale preference cookie). 


* loadingLocale: string: Code of the locale that has started loading.


* readyLocale: string: Code of the locale that has successfully loaded.


* errorLocale: string: Code of the locale that failed to load.
* errorMessage: string: Error message from locale load failure.

```
// locales/es-419.tsexport const templates = {  h3c44aff2d5f5ef6b: html`Hola <b>Mundo!</b>`,};
```

```
// locales/es-419.tsexport const templates = {  h3c44aff2d5f5ef6b: html`Hola <b>Mundo!</b>`,};
```

```
// locales/es-419.ts
```

```
export const templates = {
```

```
h3c44aff2d5f5ef6b: html`Hola <b>Mundo!</b>`,
```

```
};
```

```
lit-localize.json
```

```
output.mode
```

```
runtime
```

```
output.outputDir
```

```
output.localeCodesModule
```

```
.js
```

```
.ts
```

```
sourceLocale
```

```
targetLocales
```

```
export const sourceLocale = 'en';export const targetLocales = ['es-419', 'zh-Hans'];export const allLocales = ['en', 'es-419', 'zh-Hans'];
```

```
export const sourceLocale = 'en';export const targetLocales = ['es-419', 'zh-Hans'];export const allLocales = ['en', 'es-419', 'zh-Hans'];
```

```
export const sourceLocale = 'en';
```

```
export const targetLocales = ['es-419', 'zh-Hans'];
```

```
export const allLocales = ['en', 'es-419', 'zh-Hans'];
```

```
configureLocalization
```

```
sourceLocale: string
```

```
sourceLocale
```

```
output.localeCodesModule
```

```
targetLocales: string[]
```

```
targetLocales
```

```
output.localeCodesModule
```

```
loadLocale: (locale: string) => Promise<LocaleModule>
```

```
configureLocalization
```

```
getLocale
```

```
getLocale
```

```
setLocale
```

```
import {configureLocalization} from '@lit/localize';// Generated via output.localeCodesModuleimport {sourceLocale, targetLocales} from './generated/locale-codes.js';
export const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: (locale) => import(`/locales/${locale}.js`),});
```

```
import {configureLocalization} from '@lit/localize';// Generated via output.localeCodesModuleimport {sourceLocale, targetLocales} from './generated/locale-codes.js';
export const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: (locale) => import(`/locales/${locale}.js`),});
```

```
import {configureLocalization} from '@lit/localize';
```

```
// Generated via output.localeCodesModule
```

```
import {sourceLocale, targetLocales} from './generated/locale-codes.js';
```

```
export const {getLocale, setLocale} = configureLocalization({
```

```
sourceLocale,
```

```
targetLocales,
```

```
loadLocale: (locale) => import(`/locales/${locale}.js`),
```

```
});
```

```
updateWhenLocaleChanges
```

```
constructor
```

```
@localized
```

```
import {LitElement, html} from 'lit';import {customElement} from 'lit/decorators.js';import {msg, localized} from '@lit/localize';
@customElement('my-element');@localized()class MyElement extends LitElement {  render() {    // Whenever setLocale() is called, and templates for that locale have    // finished loading, this render() function will be re-invoked.    return msg(html`Hello <b>World!</b>`);  }}
```

```
import {LitElement, html} from 'lit';import {customElement} from 'lit/decorators.js';import {msg, localized} from '@lit/localize';
@customElement('my-element');@localized()class MyElement extends LitElement {  render() {    // Whenever setLocale() is called, and templates for that locale have    // finished loading, this render() function will be re-invoked.    return msg(html`Hello <b>World!</b>`);  }}
```

```
import {LitElement, html} from 'lit';
```

```
import {customElement} from 'lit/decorators.js';
```

```
import {msg, localized} from '@lit/localize';
```

```
@customElement('my-element');
```

```
@localized()
```

```
class MyElement extends LitElement {
```

```
render() {
```

```
// Whenever setLocale() is called, and templates for that locale have
```

```
// finished loading, this render() function will be re-invoked.
```

```
return msg(html`Hello <b>World!</b>`);
```

```
}
```

```
}
```

```
import {LitElement, html} from 'lit';import {msg, updateWhenLocaleChanges} from '@lit/localize';
class MyElement extends LitElement {  constructor() {    super();    updateWhenLocaleChanges(this);  }
  render() {    // Whenever setLocale() is called, and templates for that locale have    // finished loading, this render() function will be re-invoked.    return msg(html`Hello <b>World!</b>`);  }}customElements.define('my-element', MyElement);
```

```
import {LitElement, html} from 'lit';import {msg, updateWhenLocaleChanges} from '@lit/localize';
class MyElement extends LitElement {  constructor() {    super();    updateWhenLocaleChanges(this);  }
  render() {    // Whenever setLocale() is called, and templates for that locale have    // finished loading, this render() function will be re-invoked.    return msg(html`Hello <b>World!</b>`);  }}customElements.define('my-element', MyElement);
```

```
import {LitElement, html} from 'lit';
```

```
import {msg, updateWhenLocaleChanges} from '@lit/localize';
```

```
class MyElement extends LitElement {
```

```
constructor() {
```

```
super();
```

```
updateWhenLocaleChanges(this);
```

```
}
```

```
render() {
```

```
// Whenever setLocale() is called, and templates for that locale have
```

```
// finished loading, this render() function will be re-invoked.
```

```
return msg(html`Hello <b>World!</b>`);
```

```
}
```

```
}
```

```
customElements.define('my-element', MyElement);
```

```
lit-localize-status
```

```
window
```

```
@localized
```

```
render
```

```
detail.status
```

```
loading
```

```
ready
```

```
error
```

```
detail
```

```
loadingLocale: string
```

```
loading
```

```
ready
```

```
error
```

```
loading
```

```
ready
```

```
error
```

```
loading
```

```
detail
```

```
readyLocale: string
```

```
ready
```

```
loading
```

```
detail
```

```
errorLocale: string
```

```
errorMessage: string
```

```
error
```

```
loading
```

```
// Show/hide a progress indicator whenever a new locale is loading,// and re-render the application every time a new locale successfully loads.window.addEventListener('lit-localize-status', (event) => {  const spinner = document.querySelector('#spinner');
  if (event.detail.status === 'loading') {    console.log(`Loading new locale: ${event.detail.loadingLocale}`);    spinner.removeAttribute('hidden');  } else if (event.detail.status === 'ready') {    console.log(`Loaded new locale: ${event.detail.readyLocale}`);    spinner.setAttribute('hidden', '');    renderApplication();  } else if (event.detail.status === 'error') {    console.error(      `Error loading locale ${event.detail.errorLocale}: ` +        event.detail.errorMessage    );    spinner.setAttribute('hidden', '');  }});
```

```
// Show/hide a progress indicator whenever a new locale is loading,// and re-render the application every time a new locale successfully loads.window.addEventListener('lit-localize-status', (event) => {  const spinner = document.querySelector('#spinner');
  if (event.detail.status === 'loading') {    console.log(`Loading new locale: ${event.detail.loadingLocale}`);    spinner.removeAttribute('hidden');  } else if (event.detail.status === 'ready') {    console.log(`Loaded new locale: ${event.detail.readyLocale}`);    spinner.setAttribute('hidden', '');    renderApplication();  } else if (event.detail.status === 'error') {    console.error(      `Error loading locale ${event.detail.errorLocale}: ` +        event.detail.errorMessage    );    spinner.setAttribute('hidden', '');  }});
```

```
// Show/hide a progress indicator whenever a new locale is loading,
```

```
// and re-render the application every time a new locale successfully loads.
```

```
window.addEventListener('lit-localize-status', (event) => {
```

```
const spinner = document.querySelector('#spinner');
```

```
if (event.detail.status === 'loading') {
```

```
console.log(`Loading new locale: ${event.detail.loadingLocale}`);
```

```
spinner.removeAttribute('hidden');
```

```
} else if (event.detail.status === 'ready') {
```

```
console.log(`Loaded new locale: ${event.detail.readyLocale}`);
```

```
spinner.setAttribute('hidden', '');
```

```
renderApplication();
```

```
} else if (event.detail.status === 'error') {
```

```
console.error(
```

```
`Error loading locale ${event.detail.errorLocale}: ` +
```

```
event.detail.errorMessage
```

```
);
```

```
spinner.setAttribute('hidden', '');
```

```
}
```

```
});
```

```
loadLocale
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: (locale) => import(`/locales/${locale}.js`),});
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: (locale) => import(`/locales/${locale}.js`),});
```

```
import {configureLocalization} from '@lit/localize';
```

```
import {sourceLocale, targetLocales} from './generated/locale-codes.js';
```

```
const {getLocale, setLocale} = configureLocalization({
```

```
sourceLocale,
```

```
targetLocales,
```

```
loadLocale: (locale) => import(`/locales/${locale}.js`),
```

```
});
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
const localizedTemplates = new Map(  targetLocales.map((locale) => [locale, import(`/locales/${locale}.js`)]));
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: async (locale) => localizedTemplates.get(locale),});
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
const localizedTemplates = new Map(  targetLocales.map((locale) => [locale, import(`/locales/${locale}.js`)]));
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: async (locale) => localizedTemplates.get(locale),});
```

```
import {configureLocalization} from '@lit/localize';
```

```
import {sourceLocale, targetLocales} from './generated/locale-codes.js';
```

```
const localizedTemplates = new Map(
```

```
targetLocales.map((locale) => [locale, import(`/locales/${locale}.js`)])
```

```
);
```

```
const {getLocale, setLocale} = configureLocalization({
```

```
sourceLocale,
```

```
targetLocales,
```

```
loadLocale: async (locale) => localizedTemplates.get(locale),
```

```
});
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
import * as templates_es_419 from './locales/es-419.js';import * as templates_zh_hans from './locales/zh-Hans.js';...
const localizedTemplates = new Map([  ['es-419', templates_es_419],  ['zh-Hans', templates_zh_hans],  ...]);
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: async (locale) => localizedTemplates.get(locale),});
```

```
import {configureLocalization} from '@lit/localize';import {sourceLocale, targetLocales} from './generated/locale-codes.js';
import * as templates_es_419 from './locales/es-419.js';import * as templates_zh_hans from './locales/zh-Hans.js';...
const localizedTemplates = new Map([  ['es-419', templates_es_419],  ['zh-Hans', templates_zh_hans],  ...]);
const {getLocale, setLocale} = configureLocalization({  sourceLocale,  targetLocales,  loadLocale: async (locale) => localizedTemplates.get(locale),});
```

```
import {configureLocalization} from '@lit/localize';
```

```
import {sourceLocale, targetLocales} from './generated/locale-codes.js';
```

```
import * as templates_es_419 from './locales/es-419.js';
```

```
import * as templates_zh_hans from './locales/zh-Hans.js';
```

```
...
```

```
const localizedTemplates = new Map([
```

```
['es-419', templates_es_419],
```

```
['zh-Hans', templates_zh_hans],
```

```
...
```

```
]);
```

```
const {getLocale, setLocale} = configureLocalization({
```

```
sourceLocale,
```

```
targetLocales,
```

```
loadLocale: async (locale) => localizedTemplates.get(locale),
```

```
});
```

```
代碼示例 (項目: v3-docs/libraries/localization/runtime, 文件: x-greeter.ts)
請參考原始頁面查看完整示例
```

