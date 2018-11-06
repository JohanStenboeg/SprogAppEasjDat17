// define modules

define('module', [], function(dep1, dep2) {
	console.log('setup module1');
	return {
		api: function() {
			console.log('from module1');
		}
	};
});

define('module2', [], function() {
	console.log('setup module2');
	var module = require('module');
	return {
		api2: function() {
			console.log('from module2');
		}
	};
});

define('module3', ['module'], function(module) {
	console.log('setup module3');
	return {
		api3: function() {
			console.log('from module3');
		}
	};
});

define('main', ['module2', 'module'], function(module2, module) {
	module2.api2();
	module.api();
	require('module3').api3();
});

// run main module

console.time('time');
require('main');
console.timeEnd('time');
