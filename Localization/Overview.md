# Overview

Localization is the process of supporting multiple languages and regions in your apps and components. Lit has first-party support for localization through the @lit/localize library, which has a number of advantages that can make it a good choice over third-party localization libraries:

Native support for expressions and HTML markup inside localized templates. No need for a new syntax and interpolation runtime for variable substitution—just use the templates you already have.

Automatic re-rendering of Lit components when the locale switches.

Only 1.27 KiB (minified + compressed) of extra JavaScript.

Optionally compile for each locale, reducing extra JavaScript to 0 KiB.

Install the @lit/localize client library and the @lit/localize-tools command-line interface.

To make a string or Lit template localizable, wrap it in the msg function. The msg function returns a version of the given string or template in whichever locale is currently active.

Before you have any translations available, msg simply returns the original string or template, so it's safe to use even if you're not yet ready to actually localize.

Any string or template that you would normally render with Lit can be localized, including ones with dynamic expressions and HTML markup.

Plain string:

Plain string with expression (see strings with expressions for details on str):

HTML template:

HTML template with expression:

Localized messages can also be nested inside HTML templates:

Strings that contain an expression must be tagged with either html or str in order to be localizable. You should prefer str over html when your string doesn't contain any HTML markup, because it has slightly less performance overhead. An error will be raised when you run the lit-localize command if you forget the html or str tag on a string with an expression.

Incorrect:

Correct:

The str tag is required in these cases because untagged template string literals are evaluated to regular strings before they are received by the msg function, which means dynamic expression values could not otherwise be captured and substituted into the localized versions of the string.

A locale code is a string that identifies a human language, and sometimes also includes a region, script, or other variation.

Lit Localize does not mandate use any particular system of locale codes, though it is strongly recommended to use the BCP 47 language tag standard. Some examples of BCP 47 language tags are:

Lit Localize defines a few terms that refer to locale codes. These terms are used in this documentation, in the Lit Localize config file, and in the Lit Localize API:

The locale that is used to write strings and templates in your source code.

The locales that your strings and templates can be translated into.

The global locale that is currently being displayed.

Lit Localize supports two output modes:

Runtime mode uses Lit Localize's APIs to load localized messages at runtime.

Transform mode eliminates the Lit Localize runtime code by building a separate JavaScript bundle for each locale.

Unsure which mode to use? Start with runtime mode. It's easy to switch modes later because the core msg API is identical.

In runtime mode, one JavaScript or TypeScript module is generated for each of your locales. Each module contains the localized templates for that locale. When the active locale switches, the module for that locale is imported, and all localized components are re-rendered.

Runtime mode makes switching locales very fast because a page reload is not required. However, there is a slight performance cost to rendering performance compared to transform mode.

See the runtime mode page for full details about runtime mode.

In transform mode, a separate folder is generated for each locale. Each folder contains a complete standalone build of your application in that locale, with msg wrappers and all other Lit Localize runtime code completely removed.

Transform mode requires 0 KiB of extra JavaScript and is extremely fast to render. However, switching locales requires re-loading the page so that a new JavaScript bundle can be loaded.

See the transform mode page for full details about transform mode.

The lit-localize command-line tool looks for a config file called lit-localize.json in the current directory. Copy-paste the example below for a quick start, and see the CLI and config page for a full reference of all options.

If you're writing JavaScript, set the inputFiles property to the location of your .js source files. If you're writing TypeScript, set the tsConfig property to the location of your tsconfig.json file, and leave inputFiles blank.

Run lit-localize extract to generate an XLIFF file for each target locale. XLIFF is an XML format supported by most localization tools and services. XLIFF files will be written to the directory specified by the interchange.xliffDir config option.

For example, given the source:

Then a <xliffDir>/<locale>.xlf file will be generated for each target locale:

XLIFF files can be edited manually, but more typically they are sent to a third-party translation service where they are edited by language experts using specialized tools.

After uploading your XLIFF files to your chosen translation service, you will eventually receive new XLIFF files in response. The new XLIFF files will look just like the ones you uploaded, but with <target> tags inserted into each <trans-unit>.

When you receive new translation XLIFF files, save them to your configured interchange.xliffDir directory, overwriting the original versions.

Use the lit-localize build command to incorporate translations back into your application. The behavior of this command depends on the output mode you have configured.

See the runtime mode and transform mode pages for details of how building in each mode works.

Use the desc option to the msg function to provide human-readable descriptions for your strings and templates. These descriptions are shown to translators by most translation tools, and are highly recommended to help explain and contextualize the meaning of messages.

Descriptions are represented in XLIFF files using <note> elements.

Lit Localize automatically generates an ID for every msg call using a hash of the string.

If two msg calls share the same ID, then they are treated as the same message, meaning they will be translated as a single unit and the same translations will be substituted in both places.

For example, these two msg calls are in two different files, but since they have the same content they will be treated as one message:

The following content affects ID generation:

The following content does not affect ID generation:

For example, all of these messages share the same ID:

But this message has a different ID:

Note, while providing a description does not affect ID generation, multiple messages with the same ID but different description will produce an error during analysis to avoid ambiguity in the extracted translation unit. The following is considered invalid:

Make sure that all messages with the same ID also have the same description.

Message IDs can be overridden by specifying the id option to the msg function. In some cases this may be necessary, such as when an identical string has multiple meanings, because each might be written differently in another language:


1. Installation
2. Quick start
3. Making strings and templates localizableMessage typesStrings with expressions
4. Message types
5. Strings with expressions
6. Locale codesTerms
7. Terms
8. Output modesRuntime modeTransform modeDifferences
9. Runtime mode
10. Transform mode
11. Differences
12. Config file
13. Extracting messages
14. Translation with XLIFF
15. Building localized templates
16. Message descriptions
17. Message IDsID generationOverriding IDs
18. ID generation
19. Overriding IDs


1. Message types
2. Strings with expressions


1. Terms


1. Runtime mode
2. Transform mode
3. Differences


1. ID generation
2. Overriding IDs


* Native support for expressions and HTML markup inside localized templates. No need for a new syntax and interpolation runtime for variable substitution—just use the templates you already have. 
* Automatic re-rendering of Lit components when the locale switches. 
* Only 1.27 KiB (minified + compressed) of extra JavaScript. 
* Optionally compile for each locale, reducing extra JavaScript to 0 KiB. 


1. Wrap a string or template in the msg function (details).
2. Create a lit-localize.json config file (details).
3. Run lit-localize extract to generate an XLIFF file (details).
4. Edit the generated XLIFF file to add a <target> translation tag (details).
5. Run lit-localize build to output a localized version of your strings and templates (details).


* en: English
* es-419: Spanish spoken in Latin America
* zh-Hans: Chinese written in Simplified script


* Runtime mode uses Lit Localize's APIs to load localized messages at runtime. 
* Transform mode eliminates the Lit Localize runtime code by building a separate JavaScript bundle for each locale. 


* Faster locale switching.
* Fewer marginal bytes when switching locale.


* Faster rendering.
* Fewer bytes for a single locale.


* String content
* HTML markup
* The position of expressions
* Whether the string is tagged with html


* The code inside an expression
* The computed value of an expression
* File location

```
@lit/localize
```

```
@lit/localize
```

```
@lit/localize-tools
```

```
npm i @lit/localizenpm i -D @lit/localize-tools
```

```
npm i @lit/localizenpm i -D @lit/localize-tools
```

```
npm i @lit/localize
```

```
npm i -D @lit/localize-tools
```

```
msg
```

```
lit-localize.json
```

```
lit-localize extract
```

```
<target>
```

```
lit-localize build
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
import {html, LitElement} from 'lit';import {customElement, property} from 'lit/decorators.js';import {msg} from '@lit/localize';
@customElement('my-greeter')class MyGreeter extends LitElement {  @property()  who = 'World';
  render() {    return msg(html`Hello <b>${this.who}</b>`);  }}
```

```
import {html, LitElement} from 'lit';import {customElement, property} from 'lit/decorators.js';import {msg} from '@lit/localize';
@customElement('my-greeter')class MyGreeter extends LitElement {  @property()  who = 'World';
  render() {    return msg(html`Hello <b>${this.who}</b>`);  }}
```

```
import {html, LitElement} from 'lit';
```

```
import {customElement, property} from 'lit/decorators.js';
```

```
import {msg} from '@lit/localize';
```

```
@customElement('my-greeter')
```

```
class MyGreeter extends LitElement {
```

```
@property()
```

```
who = 'World';
```

```
render() {
```

```
return msg(html`Hello <b>${this.who}</b>`);
```

```
}
```

```
}
```

```
import {html, LitElement} from 'lit';import {msg} from '@lit/localize';
class MyGreeter extends LitElement {  static properties = {    who: {},  };
  constructor() {    super();    this.who = 'World';  }
  render() {    return msg(html`Hello <b>${this.who}</b>`);  }}customElements.define('my-greeter', MyGreeter);
```

```
import {html, LitElement} from 'lit';import {msg} from '@lit/localize';
class MyGreeter extends LitElement {  static properties = {    who: {},  };
  constructor() {    super();    this.who = 'World';  }
  render() {    return msg(html`Hello <b>${this.who}</b>`);  }}customElements.define('my-greeter', MyGreeter);
```

```
import {html, LitElement} from 'lit';
```

```
import {msg} from '@lit/localize';
```

```
class MyGreeter extends LitElement {
```

```
static properties = {
```

```
who: {},
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
this.who = 'World';
```

```
}
```

```
render() {
```

```
return msg(html`Hello <b>${this.who}</b>`);
```

```
}
```

```
}
```

```
customElements.define('my-greeter', MyGreeter);
```

```
msg('Hello World');
```

```
msg('Hello World');
```

```
msg('Hello World');
```

```
str
```

```
msg(str`Hello ${name}`);
```

```
msg(str`Hello ${name}`);
```

```
msg(str`Hello ${name}`);
```

```
msg(html`Hello <b>World</b>`);
```

```
msg(html`Hello <b>World</b>`);
```

```
msg(html`Hello <b>World</b>`);
```

```
msg(html`Hello <b>${name}</b>`);
```

```
msg(html`Hello <b>${name}</b>`);
```

```
msg(html`Hello <b>${name}</b>`);
```

```
html`<button>${msg('Hello World')}</button>`;
```

```
html`<button>${msg('Hello World')}</button>`;
```

```
html`<button>${msg('Hello World')}</button>`;
```

```
html
```

```
str
```

```
str
```

```
html
```

```
lit-localize
```

```
html
```

```
str
```

```
import {msg} from '@lit/localize';msg(`Hello ${name}`);
```

```
import {msg} from '@lit/localize';msg(`Hello ${name}`);
```

```
import {msg} from '@lit/localize';
```

```
msg(`Hello ${name}`);
```

```
import {msg, str} from '@lit/localize';msg(str`Hello ${name}`);
```

```
import {msg, str} from '@lit/localize';msg(str`Hello ${name}`);
```

```
import {msg, str} from '@lit/localize';
```

```
msg(str`Hello ${name}`);
```

```
str
```

```
msg
```

```
msg
```

```
// locales/es-419.tsexport const templates = {  hf71d669027554f48: html`Hola <b>Mundo</b>`,};
```

```
// locales/es-419.tsexport const templates = {  hf71d669027554f48: html`Hola <b>Mundo</b>`,};
```

```
// locales/es-419.ts
```

```
export const templates = {
```

```
hf71d669027554f48: html`Hola <b>Mundo</b>`,
```

```
};
```

```
msg
```

```
// locales/en/my-element.jsrender() {  return html`Hello <b>World</b>`;}
```

```
// locales/en/my-element.jsrender() {  return html`Hello <b>World</b>`;}
```

```
// locales/en/my-element.js
```

```
render() {
```

```
return html`Hello <b>World</b>`;
```

```
}
```

```
// locales/es-419/my-element.jsrender() {  return html`Hola <b>Mundo</b>`;}
```

```
// locales/es-419/my-element.jsrender() {  return html`Hola <b>Mundo</b>`;}
```

```
// locales/es-419/my-element.js
```

```
render() {
```

```
return html`Hola <b>Mundo</b>`;
```

```
}
```

```
setLocale()
```

```
msg()
```

```
msg()
```

```
configureLocalization()
```

```
configureTransformLocalization()
```

```
lit-localize
```

```
lit-localize.json
```

```
inputFiles
```

```
.js
```

```
tsConfig
```

```
tsconfig.json
```

```
inputFiles
```

```
{  "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",  "sourceLocale": "en",  "targetLocales": ["es-419", "zh-Hans"],  "tsConfig": "./tsconfig.json",  "output": {    "mode": "runtime",    "outputDir": "./src/generated/locales",    "localeCodesModule": "./src/generated/locale-codes.ts"  },  "interchange": {    "format": "xliff",    "xliffDir": "./xliff/"  }}
```

```
{  "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",  "sourceLocale": "en",  "targetLocales": ["es-419", "zh-Hans"],  "tsConfig": "./tsconfig.json",  "output": {    "mode": "runtime",    "outputDir": "./src/generated/locales",    "localeCodesModule": "./src/generated/locale-codes.ts"  },  "interchange": {    "format": "xliff",    "xliffDir": "./xliff/"  }}
```

```
{
```

```
"$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",
```

```
"sourceLocale": "en",
```

```
"targetLocales": ["es-419", "zh-Hans"],
```

```
"tsConfig": "./tsconfig.json",
```

```
"output": {
```

```
"mode": "runtime",
```

```
"outputDir": "./src/generated/locales",
```

```
"localeCodesModule": "./src/generated/locale-codes.ts"
```

```
},
```

```
"interchange": {
```

```
"format": "xliff",
```

```
"xliffDir": "./xliff/"
```

```
}
```

```
}
```

```
{  "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",  "sourceLocale": "en",  "targetLocales": ["es-419", "zh-Hans"],  "inputFiles": [    "src/**/*.js"  ],  "output": {    "mode": "runtime",    "outputDir": "./src/generated/locales",    "localeCodesModule": "./src/generated/locale-codes.js"  },  "interchange": {    "format": "xliff",    "xliffDir": "./xliff/"  }}
```

```
{  "$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",  "sourceLocale": "en",  "targetLocales": ["es-419", "zh-Hans"],  "inputFiles": [    "src/**/*.js"  ],  "output": {    "mode": "runtime",    "outputDir": "./src/generated/locales",    "localeCodesModule": "./src/generated/locale-codes.js"  },  "interchange": {    "format": "xliff",    "xliffDir": "./xliff/"  }}
```

```
{
```

```
"$schema": "https://raw.githubusercontent.com/lit/lit/main/packages/localize-tools/config.schema.json",
```

```
"sourceLocale": "en",
```

```
"targetLocales": ["es-419", "zh-Hans"],
```

```
"inputFiles": [
```

```
"src/**/*.js"
```

```
],
```

```
"output": {
```

```
"mode": "runtime",
```

```
"outputDir": "./src/generated/locales",
```

```
"localeCodesModule": "./src/generated/locale-codes.js"
```

```
},
```

```
"interchange": {
```

```
"format": "xliff",
```

```
"xliffDir": "./xliff/"
```

```
}
```

```
}
```

```
lit-localize extract
```

```
interchange.xliffDir
```

```
lit-localize extract
```

```
lit-localize extract
```

```
lit-localize extract
```

```
msg('Hello World');msg(str`Hello ${name}`);msg(html`Hello <b>World</b>`);
```

```
msg('Hello World');msg(str`Hello ${name}`);msg(html`Hello <b>World</b>`);
```

```
msg('Hello World');
```

```
msg(str`Hello ${name}`);
```

```
msg(html`Hello <b>World</b>`);
```

```
<xliffDir>/<locale>.xlf
```

```
<!-- xliff/es-419.xlf -->
<trans-unit id="s3d58dee72d4e0c27">  <source>Hello World</source></trans-unit>
<trans-unit id="saed7d3734ce7f09d">  <source>Hello <x equiv-text="${name}"/></source></trans-unit>
<trans-unit id="hf71d669027554f48">  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source></trans-unit>
```

```
<!-- xliff/es-419.xlf -->
<trans-unit id="s3d58dee72d4e0c27">  <source>Hello World</source></trans-unit>
<trans-unit id="saed7d3734ce7f09d">  <source>Hello <x equiv-text="${name}"/></source></trans-unit>
<trans-unit id="hf71d669027554f48">  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source></trans-unit>
```

```
<!-- xliff/es-419.xlf -->
```

```
<trans-unit id="s3d58dee72d4e0c27">
```

```
<source>Hello World</source>
```

```
</trans-unit>
```

```
<trans-unit id="saed7d3734ce7f09d">
```

```
<source>Hello <x equiv-text="${name}"/></source>
```

```
</trans-unit>
```

```
<trans-unit id="hf71d669027554f48">
```

```
<source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>
```

```
</trans-unit>
```

```
<target>
```

```
<trans-unit>
```

```
interchange.xliffDir
```

```
<!-- xliff/es-419.xlf -->
<trans-unit id="s3d58dee72d4e0c27">  <source>Hello World</source>  <target>Hola Mundo</target></trans-unit>
<trans-unit id="saed7d3734ce7f09d">  <source>Hello <x equiv-text="${name}"/></source>  <target>Hola <x equiv-text="${name}"/></target></trans-unit>
<trans-unit id="hf71d669027554f48">  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>  <target>Hola <x equiv-text="&lt;b&gt;"/>Mundo<x equiv-text="&lt;/b&gt;"/></target></trans-unit>
```

```
<!-- xliff/es-419.xlf -->
<trans-unit id="s3d58dee72d4e0c27">  <source>Hello World</source>  <target>Hola Mundo</target></trans-unit>
<trans-unit id="saed7d3734ce7f09d">  <source>Hello <x equiv-text="${name}"/></source>  <target>Hola <x equiv-text="${name}"/></target></trans-unit>
<trans-unit id="hf71d669027554f48">  <source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>  <target>Hola <x equiv-text="&lt;b&gt;"/>Mundo<x equiv-text="&lt;/b&gt;"/></target></trans-unit>
```

```
<!-- xliff/es-419.xlf -->
```

```
<trans-unit id="s3d58dee72d4e0c27">
```

```
<source>Hello World</source>
```

```
<target>Hola Mundo</target>
```

```
</trans-unit>
```

```
<trans-unit id="saed7d3734ce7f09d">
```

```
<source>Hello <x equiv-text="${name}"/></source>
```

```
<target>Hola <x equiv-text="${name}"/></target>
```

```
</trans-unit>
```

```
<trans-unit id="hf71d669027554f48">
```

```
<source>Hello <x equiv-text="&lt;b&gt;"/>World<x equiv-text="&lt;/b&gt;"/></source>
```

```
<target>Hola <x equiv-text="&lt;b&gt;"/>Mundo<x equiv-text="&lt;/b&gt;"/></target>
```

```
</trans-unit>
```

```
lit-localize build
```

```
lit-localize build
```

```
lit-localize build
```

```
lit-localize build
```

```
desc
```

```
msg
```

```
render() {  return html`<button>    ${msg("Launch", {      desc: "Button that begins rocket launch sequence.",    })}  </button>`;}
```

```
render() {  return html`<button>    ${msg("Launch", {      desc: "Button that begins rocket launch sequence.",    })}  </button>`;}
```

```
render() {
```

```
return html`<button>
```

```
${msg("Launch", {
```

```
desc: "Button that begins rocket launch sequence.",
```

```
})}
```

```
</button>`;
```

```
}
```

```
<note>
```

```
<trans-unit id="s512957aa09384646">  <source>Launch</source>  <note from="lit-localize">Button that begins rocket launch sequence.</note></trans-unit>
```

```
<trans-unit id="s512957aa09384646">  <source>Launch</source>  <note from="lit-localize">Button that begins rocket launch sequence.</note></trans-unit>
```

```
<trans-unit id="s512957aa09384646">
```

```
<source>Launch</source>
```

```
<note from="lit-localize">Button that begins rocket launch sequence.</note>
```

```
</trans-unit>
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
// file1.jsmsg('Hello World');
// file2.jsmsg('Hello World');
```

```
// file1.jsmsg('Hello World');
// file2.jsmsg('Hello World');
```

```
// file1.js
```

```
msg('Hello World');
```

```
// file2.js
```

```
msg('Hello World');
```

```
html
```

```
msg(html`Hello <b>${name}</b>`);msg(html`Hello <b>${this.name}</b>`);
```

```
msg(html`Hello <b>${name}</b>`);msg(html`Hello <b>${this.name}</b>`);
```

```
msg(html`Hello <b>${name}</b>`);
```

```
msg(html`Hello <b>${this.name}</b>`);
```

```
msg(html`Hello <i>${name}</i>`);
```

```
msg(html`Hello <i>${name}</i>`);
```

```
msg(html`Hello <i>${name}</i>`);
```

```
msg(html`Hello <b>${name}</b>`);msg(html`Hello <b>${name}</b>`, {desc: 'A friendly greeting'});
```

```
msg(html`Hello <b>${name}</b>`);msg(html`Hello <b>${name}</b>`, {desc: 'A friendly greeting'});
```

```
msg(html`Hello <b>${name}</b>`);
```

```
msg(html`Hello <b>${name}</b>`, {desc: 'A friendly greeting'});
```

```
id
```

```
msg
```

```
msg('Buffalo', {id: 'buffalo-animal-singular'});msg('Buffalo', {id: 'buffalo-animal-plural'});msg('Buffalo', {id: 'buffalo-city'});msg('Buffalo', {id: 'buffalo-verb'});
```

```
msg('Buffalo', {id: 'buffalo-animal-singular'});msg('Buffalo', {id: 'buffalo-animal-plural'});msg('Buffalo', {id: 'buffalo-city'});msg('Buffalo', {id: 'buffalo-verb'});
```

```
msg('Buffalo', {id: 'buffalo-animal-singular'});
```

```
msg('Buffalo', {id: 'buffalo-animal-plural'});
```

```
msg('Buffalo', {id: 'buffalo-city'});
```

```
msg('Buffalo', {id: 'buffalo-verb'});
```

