# Production

This page focuses on recommendations for building an application that uses Lit components for production. For recommendations on build steps to perform on source code prior to publishing a reusable Lit component to npm, see Publishing.

When building an application that includes Lit components, you can use common JavaScript build tools like Rollup or webpack to prepare your source code and dependencies for serving in a production environment.

See Requirements for a full list of requirements for building Lit code, which apply to both development and production.

In addition to those minimum requirements, this page describes optimizations you should consider when preparing code for production, as well as a concrete Rollup configuration that implements them.

Lit projects benefit from the same build-time optimizations as other web projects. The following optimizations are recommended when serving Lit applications in production:

In addition, note that because Lit templates are defined inside JavaScript template string literals, they don't get processed by standard HTML minifiers. Adding a plugin that minifies the HTML in template string literals can result in a modest decrease in code size. Several packages are available to perform this optimization:

There are many tools you can use to perform the required and optional build steps necessary to serve Lit code, and Lit does not require any one specific tool. However, we recommend Rollup because it's designed to work with the standard ES module format and output optimal code that leverages native modules on the client.

There are many ways to set up Rollup to bundle your project. The Modern Web project maintains an excellent Rollup plugin @web/rollup-plugin-html that helps tie a number of best-practices for building applications together into an easy-to-use package. Example configurations using this plugin are described below.

The annotated rollup.config.js file below will build an application that meets the modern browser build requirements and production optimizations described on this page. This configuration is suitable for serving to modern browsers that can run ES2021 JS without polyfills.

Required node modules:

rollup.config.js:

Running the rollup build:


1. Preparing code for production
2. Building with RollupModern-only build
3. Modern-only build


1. Modern-only build


* Bundling Javascript modules to reduce network requests (for example, using Rollup or webpack).
* Minifying Javascript code for smaller payload sizes (Terser works well for Lit, because it supports modern JavaScript).
* Serving modern code to modern browsers as it is generally smaller and faster, and falling back to compiled code on older browsers.
* Hashing static assets including bundled JavaScript for easier cache invalidation.
* Enabling serve-time compression (such as gzip or brotli) for fewer bytes over the wire.


* Rollup: rollup-plugin-minify-html-literals
* Webpack: minify-html-literals-loader

```
@web/rollup-plugin-html
```

```
rollup.config.js
```

```
npm i --save-dev rollup \  @web/rollup-plugin-html \  @web/rollup-plugin-copy \  @rollup/plugin-node-resolve \  @rollup/plugin-terser \  rollup-plugin-minify-html-literals \  rollup-plugin-summary
```

```
npm i --save-dev rollup \  @web/rollup-plugin-html \  @web/rollup-plugin-copy \  @rollup/plugin-node-resolve \  @rollup/plugin-terser \  rollup-plugin-minify-html-literals \  rollup-plugin-summary
```

```
npm i --save-dev rollup \
```

```
@web/rollup-plugin-html \
```

```
@web/rollup-plugin-copy \
```

```
@rollup/plugin-node-resolve \
```

```
@rollup/plugin-terser \
```

```
rollup-plugin-minify-html-literals \
```

```
rollup-plugin-summary
```

```
rollup.config.js:
```

```
// Import rollup pluginsimport html from '@web/rollup-plugin-html';import {copy} from '@web/rollup-plugin-copy';import resolve from '@rollup/plugin-node-resolve';import {terser} from '@rollup/plugin-terser';import minifyHTML from 'rollup-plugin-minify-html-literals';import summary from 'rollup-plugin-summary';
export default {  plugins: [    // Entry point for application build; can specify a glob to build multiple    // HTML files for non-SPA app    html({      input: 'index.html',    }),    // Resolve bare module specifiers to relative paths    resolve(),    // Minify HTML template literals    minifyHTML(),    // Minify JS    terser({      ecma: 2021,      module: true,      warnings: true,    }),    // Print bundle summary    summary(),    // Optional: copy any static assets to build directory    copy({      patterns: ['images/**/*'],    }),  ],  output: {    dir: 'build',  },  preserveEntrySignatures: 'strict',};
```

```
// Import rollup pluginsimport html from '@web/rollup-plugin-html';import {copy} from '@web/rollup-plugin-copy';import resolve from '@rollup/plugin-node-resolve';import {terser} from '@rollup/plugin-terser';import minifyHTML from 'rollup-plugin-minify-html-literals';import summary from 'rollup-plugin-summary';
export default {  plugins: [    // Entry point for application build; can specify a glob to build multiple    // HTML files for non-SPA app    html({      input: 'index.html',    }),    // Resolve bare module specifiers to relative paths    resolve(),    // Minify HTML template literals    minifyHTML(),    // Minify JS    terser({      ecma: 2021,      module: true,      warnings: true,    }),    // Print bundle summary    summary(),    // Optional: copy any static assets to build directory    copy({      patterns: ['images/**/*'],    }),  ],  output: {    dir: 'build',  },  preserveEntrySignatures: 'strict',};
```

```
// Import rollup plugins
```

```
import html from '@web/rollup-plugin-html';
```

```
import {copy} from '@web/rollup-plugin-copy';
```

```
import resolve from '@rollup/plugin-node-resolve';
```

```
import {terser} from '@rollup/plugin-terser';
```

```
import minifyHTML from 'rollup-plugin-minify-html-literals';
```

```
import summary from 'rollup-plugin-summary';
```

```
export default {
```

```
plugins: [
```

```
// Entry point for application build; can specify a glob to build multiple
```

```
// HTML files for non-SPA app
```

```
html({
```

```
input: 'index.html',
```

```
}),
```

```
// Resolve bare module specifiers to relative paths
```

```
resolve(),
```

```
// Minify HTML template literals
```

```
minifyHTML(),
```

```
// Minify JS
```

```
terser({
```

```
ecma: 2021,
```

```
module: true,
```

```
warnings: true,
```

```
}),
```

```
// Print bundle summary
```

```
summary(),
```

```
// Optional: copy any static assets to build directory
```

```
copy({
```

```
patterns: ['images/**/*'],
```

```
}),
```

```
],
```

```
output: {
```

```
dir: 'build',
```

```
},
```

```
preserveEntrySignatures: 'strict',
```

```
};
```

```
rollup -c
```

```
rollup -c
```

```
rollup -c
```

