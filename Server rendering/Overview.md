# Overview

Server-side rendering (SSR) is a technique for generating and serving the HTML of your components, including shadow DOM and styles, before their JavaScript implementations have loaded and executed.

You can use SSR for a variety of reasons:

For a deeper dive into server-side rendering concepts and techniques generally, see Rendering on the Web on web.dev.

Lit supports server-side rendering through the Lit SSR package. Lit SSR renders Lit components and templates to static HTML markup in non-browser JavaScript environments like Node. It works without fully emulating the browser's DOM, and takes advantage of Lit's declarative template format to enable fast performance, achieve low time-to-first-byte, and support streaming.

Lit SSR is a low-level library that you can use directly in your Node-based server or site generator. Check out an example of Lit SSR used in a Koa server.

A number of integrations have also been published which make Lit SSR work out-of-the-box:

This library is under active development with some notable limitations we hope to resolve:


1. Library status


* Performance. Some sites can render faster if they render static HTML first without waiting for JavaScript to load, then (optionally) load the page's JavaScript and hydrate the components.
* SEO and web crawlers. While the major search-engine web crawlers render pages with full JavaScript-enabled browsers, not all web crawlers support JavaScript.
* Robustness. Static HTML renders even if the JavaScript fails to load or the user has JavaScript disabled.


* Lit Eleventy Plugin
* Astro integration for Lit
* Rocket
* Next.js pages router with @lit-labs/nextjs
* Nuxt 3 with nuxt-ssr-lit
* ...and more under development!


* Async component work is not supported. See issue #2469.
* Only Lit components using shadow DOM is supported. See issue #3080.
* Declarative shadow DOM is not implemented in all major browsers yet, though a polyfill is available. Read more about it in client usage.
* There are also open discussions that need to happen regarding ElementRendererRegistry for interop with other custom elements.

```
ElementRendererRegistry
```

