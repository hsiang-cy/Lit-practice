# Controllers

A Reactive Controller is an object that enables sub-component code organization and reuse by aggregating the state, behavior, and lifecycle hooks related to a single feature.

Controllers are added to a host component, or other object that implements the ReactiveControllerHost interface, via the addController() method. They can hook their host components's lifecycle by implementing one or more of the lifecycle callbacks, or initiate an update of the host component by calling requestUpdate() on the host.

Called when the host is connected to the component tree. For custom element hosts, this corresponds to the connectedCallback() lifecycle, which is only called when the component is connected to the document.

Called when the host is disconnected from the component tree. For custom element hosts, this corresponds to the disconnectedCallback() lifecycle, which is called the host or an ancestor component is disconnected from the document.

Called during the client-side host update, just before the host calls its own update.

Code in update() can depend on the DOM as it is not called in server-side rendering.

Called after a host update, just before the host calls firstUpdated and updated. It is not called in server-side rendering.

An object that can host Reactive Controllers and call their lifecycle callbacks.

Returns a Promise that resolves when the host has completed updating. The Promise value is a boolean that is true if the element completed the update without triggering another update. The Promise result is false if a property was set inside updated(). If the Promise is rejected, an exception was thrown during the update.

Adds a controller to the host, which sets up the controller's lifecycle methods to be called with the host's lifecycle.

Removes a controller from the host.

Requests a host update which is processed asynchronously. The update can be waited on via the updateComplete property.


1. ReactiveController
2. ReactiveControllerHost

```
import { ReactiveController } from 'lit';
```

```
ReactiveControllerHost
```

```
addController()
```

```
requestUpdate()
```

```
connectedCallback()
```

```
disconnectedCallback()
```

```
update()
```

```
import { ReactiveControllerHost } from 'lit';
```

```
true
```

```
false
```

```
updated()
```

```
ReactiveController
```

```
ReactiveController
```

```
updateComplete
```

