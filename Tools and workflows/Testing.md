# Testing

Testing ensures your code functions as you intend and saves you from tedious debugging.

See the Starter Kits documentation for an easy to use setup with a fully pre-configured testing environment that works great for testing Lit components.

Lit is a standard modern Javascript library, and you can use virtually any Javascript testing framework to test your Lit code. There are many popular options, including Jest, Karma, Mocha, Jasmine, WebdriverIO and Web Test Runner.

There are a few things you'll want to make sure your testing environment supports to effectively test your Lit code.

Lit components are designed to run in the browser so testing should be conducted in a browser environment. Tools specifically focusing on testing node code may not be a good fit.

The test environment you use must have support for using modern Javascript, including using modules with bare module specifiers, or else down-leveling modern Javascript appropriately. See the Requirements for legacy browsers documentation for more details.

To test on older browsers, your test environment will need to load some polyfills, including the web components polyfills and Lit's polyfill-support module. See the Polyfills documentation for more details.

Web Test Runner is specifically designed to test modern web libraries like Lit using modern web features like custom elements and shadow DOM. See the Getting Started documentation for Web Test Runner.

In order to support older browsers, you need to configure Web Test Runner as follows:

Install @web/dev-server-legacy:

Setup web-test-runner.config.js:

WebdriverIO is a good option for your component or end-to-end tests. It has very compelling advantages like support for mocking and code coverage reporting.

You can set up WebdriverIO in your project via:

It will start a configuration wizard that will guide you through some questions. Make sure select the following:

The remaining questions can be answered as desired.

In order test the component you have to render it into the test page before the test starts and ensure it gets cleaned up afterwards:

Find more information on element assertions, finding elements within the Shadow DOM and more in the WebdriverIO documentation.


1. Selecting a test frameworkTesting in the browserSupporting modern JavascriptUsing polyfills
2. Testing in the browser
3. Supporting modern Javascript
4. Using polyfills
5. Using Web Test Runner
6. Using WebdriverIO


1. Testing in the browser
2. Supporting modern Javascript
3. Using polyfills


* What type of testing would you like to do?Component or Unit Testing - in the browser
* Which framework do you use for building components?Lit

```
polyfill-support
```

```
@web/dev-server-legacy
```

```
npm i @web/dev-server-legacy --save-dev
```

```
npm i @web/dev-server-legacy --save-dev
```

```
npm i @web/dev-server-legacy --save-dev
```

```
web-test-runner.config.js
```

```
import { legacyPlugin } from '@web/dev-server-legacy';
export default {  /* ... */  plugins: [    // make sure this plugin is always last    legacyPlugin({      polyfills: {        webcomponents: true,        // Inject lit's polyfill-support module into test files, which is required        // for interfacing with the webcomponents polyfills        custom: [          {            name: 'lit-polyfill-support',            path: 'node_modules/lit/polyfill-support.js',            test: "!('attachShadow' in Element.prototype)",            module: false,          },        ],      },    }),  ],};
```

```
import { legacyPlugin } from '@web/dev-server-legacy';
export default {  /* ... */  plugins: [    // make sure this plugin is always last    legacyPlugin({      polyfills: {        webcomponents: true,        // Inject lit's polyfill-support module into test files, which is required        // for interfacing with the webcomponents polyfills        custom: [          {            name: 'lit-polyfill-support',            path: 'node_modules/lit/polyfill-support.js',            test: "!('attachShadow' in Element.prototype)",            module: false,          },        ],      },    }),  ],};
```

```
import { legacyPlugin } from '@web/dev-server-legacy';
```

```
export default {
```

```
/* ... */
```

```
plugins: [
```

```
// make sure this plugin is always last
```

```
legacyPlugin({
```

```
polyfills: {
```

```
webcomponents: true,
```

```
// Inject lit's polyfill-support module into test files, which is required
```

```
// for interfacing with the webcomponents polyfills
```

```
custom: [
```

```
{
```

```
name: 'lit-polyfill-support',
```

```
path: 'node_modules/lit/polyfill-support.js',
```

```
test: "!('attachShadow' in Element.prototype)",
```

```
module: false,
```

```
},
```

```
],
```

```
},
```

```
}),
```

```
],
```

```
};
```

```
npm init wdio@latest ./
```

```
npm init wdio@latest ./
```

```
npm init wdio@latest ./
```

```
import { expect, $ } from '@wdio/globals'
// Component.ts contains the <simple-greeting> component implemented the same as:// https://lit.dev/docs/components/overview/import './components/Component.ts'
describe('Lit Component testing', () => {    let elem: HTMLElement
    beforeEach(() => {        elem = document.createElement('simple-greeting')    })
    it('should render component', async () => {        elem.setAttribute('name', 'WebdriverIO')        document.body.appendChild(elem)        await expect($(elem)).toHaveText('Hello, WebdriverIO!')    })
    afterEach(() => {        elem.remove()    })})
```

```
import { expect, $ } from '@wdio/globals'
// Component.ts contains the <simple-greeting> component implemented the same as:// https://lit.dev/docs/components/overview/import './components/Component.ts'
describe('Lit Component testing', () => {    let elem: HTMLElement
    beforeEach(() => {        elem = document.createElement('simple-greeting')    })
    it('should render component', async () => {        elem.setAttribute('name', 'WebdriverIO')        document.body.appendChild(elem)        await expect($(elem)).toHaveText('Hello, WebdriverIO!')    })
    afterEach(() => {        elem.remove()    })})
```

```
import { expect, $ } from '@wdio/globals'
```

```
// Component.ts contains the <simple-greeting> component implemented the same as:
```

```
// https://lit.dev/docs/components/overview/
```

```
import './components/Component.ts'
```

```
describe('Lit Component testing', () => {
```

```
let elem: HTMLElement
```

```
beforeEach(() => {
```

```
elem = document.createElement('simple-greeting')
```

```
})
```

```
it('should render component', async () => {
```

```
elem.setAttribute('name', 'WebdriverIO')
```

```
document.body.appendChild(elem)
```

```
await expect($(elem)).toHaveText('Hello, WebdriverIO!')
```

```
})
```

```
afterEach(() => {
```

```
elem.remove()
```

```
})
```

```
})
```

