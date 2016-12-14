var events = require('events');
var test = require('tape');

var mod;

test('overall', function(t) {
	mod = require('../')();
	t.equal(typeof mod.setHeader, 'function');
	t.equal(typeof mod.writeHead, 'function');
	t.equal(typeof mod.write, 'function');
	t.equal(typeof mod._body, 'string');
	t.equal(typeof mod._headers, 'object');
	t.equal(typeof mod._statusCode, 'number');

	// From: http://stackoverflow.com/a/37022523
	// return test instanceof EventEmitter && typeof test.write === 'function' && typeof test.end ==== 'function'
	t.ok(mod instanceof events.EventEmitter);
	t.equal(typeof mod.write, 'function');
	t.equal(typeof mod.end, 'function');

	t.end();
});

test('setHeader', function(t) {
	mod = require('../')();
	mod.setHeader('Content-Type', 'application/javascript');

	t.deepEqual(mod._headers, [{'Content-Type': 'application/javascript'}]);
	t.end();
});

test('write', function(t) {
	mod = require('../')();
	mod.write('test');

	t.equal(mod._body, 'test');
	t.end();
});

test('writeHead', function(t) {
	mod = require('../')();
	mod.writeHead(200, {'Content-Type': 'application/javascript'});

	t.equal(mod._body, '');
	t.deepEqual(mod._headers, [{'Content-Type': 'application/javascript'}]);
	t.equal(mod._statusCode, 200);
	t.end();
});

