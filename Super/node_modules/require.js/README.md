Small AMD loader for bundled AMD modules. No dynamic loading or loader plugin support.

### define(id, deps, factory)

argument|type
--:|--
id|string
deps|array
factory|function

All modules must have IDs and dependency arrays in their define() calls. [See AMD define()](https://github.com/amdjs/amdjs-api/blob/master/AMD.md#define-function-).

```js
define('dep1', [], function() {
});

define('dep2', [], function() {
});

define('module1', ['dep1', 'dep2'], function(dep1, dep2) {
	// initial setup
	return {
		// exports
	};
});
```

### require(id)

argument|type
--:|--
id|string

Synchronously returns the module export for the module ID represented by the `id` argument. Modules and all dependencies must be defined before calling this function as it does not do dynamic loading. [See AMD require()](https://github.com/amdjs/amdjs-api/blob/master/require.md#requirestring-).

```js
var $ = require('jquery');
```

```js
define('module1', ['dep1'], function(dep1) {
	var dep2 = require('dep2');
	// initial setup
	return {
		// exports
	};
});
```

### Usage
```bash
npm install require.js
```
Bundle *require.js* with other scripts. It should be added before named or bundled AMD modules.
```js
concat([
	'node_modules/require.js/require.min.js', // require.js - define() and require() functions are available from this point
	'node_modules/jquery/dist/jquery.min.js', // jquery is registered as a named amd module 'jquery'
	'src/js/**/*.js' // named amd modules
]);
```

```js
concat([
	'node_modules/jquery/dist/jquery.min.js', // jquery is registered as a global variable '$'
	'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js', // bootstrap does not support amd
	'node_modules/require.js/require.min.js', // require.js - define() and require() functions are available from this point
	'src/js/**/*.js' // named amd modules
]);
```

It can also be included before bundled amd modules.
```js
concat([
	'node_modules/require.js/require.min.js', // require.js - define() and require() functions are available from this point
	'build/js/app.build.js' // bundled amd modules - build tool should assign ids and deps array for each module
]);
```
