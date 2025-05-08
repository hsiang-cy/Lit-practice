# Lit 文檔

## Introduction

* [What is Lit?](https://lit.dev/docs/)
  :host{display:contents}svg{width:inherit;height:inherit;min-width:inherit;min-height:inherit;max-width:inherit;max-height:inherit}

* [Getting Started](https://lit.dev/docs/getting-started/)
  There are many ways to get started using Lit, from our Playground and interactive tutorial to installing into an existing project.

## Components

* [Overview](https://lit.dev/docs/components/overview/)
  A Lit component is a reusable piece of UI. You can think of a Lit component as a container that has some state and that displays a UI based on its state. It can also react to user input, fire events—a...

* [Defining](https://lit.dev/docs/components/defining/)
  Define a Lit component by creating a class extending LitElement and registering your class with the browser:

* [Rendering](https://lit.dev/docs/components/rendering/)
  Add a template to your component to define what it should render. Templates can include expressions, which are placeholders for dynamic content.

* [Reactive properties](https://lit.dev/docs/components/properties/)
  Lit components receive input and store their state as JavaScript class fields or properties. Reactive properties are properties that can trigger the reactive update cycle when changed, re-rendering th...

* [Styles](https://lit.dev/docs/components/styles/)
  Your component's template is rendered to its shadow root. The styles you add to your component are automatically scoped to the shadow root and only affect elements in the component's shadow root.

* [Lifecycle](https://lit.dev/docs/components/lifecycle/)
  Lit components use the standard custom element lifecycle methods. In addition Lit introduces a reactive update cycle that renders changes to DOM when reactive properties change.

* [Shadow DOM](https://lit.dev/docs/components/shadow-dom/)
  Lit components use shadow DOM to encapsulate their DOM. Shadow DOM provides a way to add a separate isolated and encapsulated DOM tree to an element. DOM encapsulation is the key to unlocking interope...

* [Events](https://lit.dev/docs/components/events/)
  Events are the standard way that elements communicate changes. These changes typically occur due to user interaction. For example, a button dispatches a click event when a user clicks on it; an input ...

* [Decorators](https://lit.dev/docs/components/decorators/)
  Decorators are functions that can be used to declaratively annotate and modify the behavior of classes.

## Templates

* [Overview](https://lit.dev/docs/templates/overview/)
  If time permits, add new page on working with inputs, per outline.

* [Expressions](https://lit.dev/docs/templates/expressions/)
  Lit templates can include dynamic values called expressions. An expression can be any JavaScript expression. The expression is evaluated when the template is evaluated, and the result of the expressio...

* [Conditionals](https://lit.dev/docs/templates/conditionals/)
  Since Lit leverages normal Javascript expressions, you can use standard Javascript control flow constructs like conditional operators, function calls, and if or switch statements to render conditional...

* [Lists](https://lit.dev/docs/templates/lists/)
  You can use standard JavaScript constructs to create repeating templates.

* [Built-in directives](https://lit.dev/docs/templates/directives/)
  Directives are functions that can extend Lit by customizing the way an expression renders. Lit includes a number of built-in directives to help with a variety of rendering needs:

* [Custom directives](https://lit.dev/docs/templates/custom-directives/)
  Directives are functions that can extend Lit by customizing how a template expression renders. Directives are useful and powerful because they can be stateful, access the DOM, be notified when templat...

## Composition

* [Overview](https://lit.dev/docs/composition/overview/)
  Composition is a strategy for managing complexity and organizing code into reusable pieces. Lit provides a few options for composition and code reuse:

* [Component composition](https://lit.dev/docs/composition/component-composition/)
  The most common way to handle complexity and factor Lit code into separate units is component composition: that is, the process of building a large, complex component out of smaller, simpler component...

* [Mixins](https://lit.dev/docs/composition/mixins/)
  Class mixins are a pattern for sharing code between classes using standard JavaScript. As opposed to "has-a" composition patterns like reactive controllers, where a class can own a controller to add b...

* [Controllers](https://lit.dev/docs/composition/controllers/)
  A reactive controller is an object that can hook into a component's reactive update cycle. Controllers can bundle state and behavior related to a feature, making it reusable across multiple component ...

## Managing Data

* [Context](https://lit.dev/docs/data/context/)
  Context is a way of making data available to entire component subtrees without having to manually bind properties to every component. The data is "contextually" available, such that ancestor elements ...

* [Async Tasks](https://lit.dev/docs/data/task/)
  Sometimes a component needs to render data that is only available asynchronously. Such data might be fetched from a server, a database, or in general retrieved or computed from an async API.

* [Signals](https://lit.dev/docs/data/signals/)
  Signals are data structures for managing observable state.

## Tools and workflows

* [Overview](https://lit.dev/docs/tools/overview/)
  Lit components are written using plain JavaScript or TypeScript and run out-of-the box on modern browsers with minimal tooling, so you don't need any Lit-specific compilers, tools, or workflows.

* [Requirements](https://lit.dev/docs/tools/requirements/)
  The most important things to know about Lit in order to work with various browsers and tools are that:

* [Development](https://lit.dev/docs/tools/development/)
  During the development phase of your projects, when you're writing Lit components, the following tools can help boost your productivity:

* [Testing](https://lit.dev/docs/tools/testing/)
  Testing ensures your code functions as you intend and saves you from tedious debugging.

* [Publishing](https://lit.dev/docs/tools/publishing/)
  This page provides guidelines for publishing a Lit component to npm, the package manager used by the vast majority of JavaScript libraries and developers. See Starter Kits for reusable component templ...

* [Production](https://lit.dev/docs/tools/production/)
  This page focuses on recommendations for building an application that uses Lit components for production. For recommendations on build steps to perform on source code prior to publishing a reusable Li...

* [Starter kits](https://lit.dev/docs/tools/starter-kits/)
  The Lit Starter Kits are project templates for reusable Lit components that can be published for others to use.

* [Adding Lit](https://lit.dev/docs/tools/adding-lit/)
  Lit doesn't require any specialized tools, and Lit components work in any JavaScript framework or with any server templating system or CMS, so Lit is ideal for adding to existing projects and applicat...

## Server rendering

* [Overview](https://lit.dev/docs/ssr/overview/)
  Server-side rendering (SSR) is a technique for generating and serving the HTML of your components, including shadow DOM and styles, before their JavaScript implementations have loaded and executed.

* [Server usage](https://lit.dev/docs/ssr/server-usage/)
  Server rendering begins with rendering a Lit template with a server-specific render() function provided in the @lit-labs/ssr package.

* [Client usage](https://lit.dev/docs/ssr/client-usage/)
  Lit SSR generates static HTML for the browser to parse and paint without any JavaScript. (Browsers that do not have support for Declarative Shadow DOM will require some JavaScript polyfill for Lit com...

* [Authoring components](https://lit.dev/docs/ssr/authoring/)
  Lit's approach to rendering web components in a server environment places some restrictions on component code to achieve efficient server rendering. When authoring components, keep in mind these consi...

* [DOM emulation](https://lit.dev/docs/ssr/dom-emulation/)
  When running in Node, Lit automatically imports and uses a set of DOM shims, and defines the customElements global. Only the minimal DOM interfaces needed to define and register components are impleme...

## Frameworks

* [React](https://lit.dev/docs/frameworks/react/)
  The @lit/react package provides utilities to create React wrapper components for web components, and custom hooks from reactive controllers.

## Localization

* [Overview](https://lit.dev/docs/localization/overview/)
  Localization is the process of supporting multiple languages and regions in your apps and components. Lit has first-party support for localization through the @lit/localize library, which has a number...

* [Runtime mode](https://lit.dev/docs/localization/runtime-mode/)
  In Lit Localize runtime mode, one JavaScript or TypeScript module is generated for each of your locales. Each generated module contains the localized templates for that locale. When your application s...

* [Transform mode](https://lit.dev/docs/localization/transform-mode/)
  In Lit Localize transform mode, a separate folder is generated for each locale. Each folder contains a complete standalone build of your application in that locale, with all runtime @lit/localize code...

* [CLI and config](https://lit.dev/docs/localization/cli-and-config/)
  All file paths are relative to the location of the config file.

* [Best practices](https://lit.dev/docs/localization/best-practices/)
  Each time the msg function is called, it returns a version of the given string or Lit template in the active locale. However, this result is just a normal string or template; it is not intrinsically c...

## API

* [LitElement](https://lit.dev/docs/api/LitElement/)
  Base element class that manages element properties and attributes, and renders a lit-html template.

* [ReactiveElement](https://lit.dev/docs/api/ReactiveElement/)
  Base element class which manages element properties and attributes. When properties change, the update method is asynchronously called. This method should be supplied by subclassers to render updates ...

* [Templates](https://lit.dev/docs/api/templates/)
  Interprets a template literal as an HTML template that can efficiently render to and update a container.

* [Styles](https://lit.dev/docs/api/styles/)
  Applies the given styles to a shadowRoot. When Shadow DOM is available but adoptedStyleSheets is not, styles are appended to the shadowRoot to mimic spec behavior. Note, when shimming is used, any sty...

* [Decorators](https://lit.dev/docs/api/decorators/)
  Class decorator factory that defines the decorated class as a custom element.

* [Directives](https://lit.dev/docs/api/directives/)
  A directive that renders the items of an async iterable[1], appending new values after previous values, similar to the built-in support for iterables. This directive is usable only in child expression...

* [Custom directives](https://lit.dev/docs/api/custom-directives/)
  An abstract Directive base class whose disconnected method will be called when the part containing the directive is cleared as a result of re-rendering, or when the user calls part.setConnected(false)...

* [Static HTML](https://lit.dev/docs/api/static-html/)
  Interprets a template literal as an HTML template that can efficiently render to and update a container.

* [Controllers](https://lit.dev/docs/api/controllers/)
  A Reactive Controller is an object that enables sub-component code organization and reuse by aggregating the state, behavior, and lifecycle hooks related to a single feature.

* [Misc](https://lit.dev/docs/api/misc/)
  A boolean that will be true in server environments like Node, and false in browser environments. Note that your server environment or toolchain must support the "node" export condition for this to be ...

## Releases

* [Lit 3 upgrade guide](https://lit.dev/docs/releases/upgrade/)
  If you are looking to migrate from Lit 1.x to Lit 2.x, see the Lit 2 upgrade guide.

## Related libraries

* [Standalone lit-html](https://lit.dev/docs/libraries/standalone-templates/)
  Lit combines the component model of LitElement with JavaScript template literal-based rendering into an easy-to-use package. However, the templating portion of Lit is factored into a standalone librar...

* [Lit Labs](https://lit.dev/docs/libraries/labs/)
  Lit Labs is an umbrella for Lit packages under development that we are actively seeking feedback on. While we encourage real-world use in order to help the feedback process, please note:

## Resources

* [Community](https://lit.dev/docs/resources/community/)
  There are many great resources and locations to learn about Lit, share what you've built, and more. Participation in our community is subject to the Lit Code of Conduct—be excellent to each other!

