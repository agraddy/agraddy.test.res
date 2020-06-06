var tap = require('agraddy.test.tap')(__filename);
var events = require('events');

var mod;

(function overall() {
	mod = require('../')();
	tap.assert.equal(typeof mod.setHeader, 'function', 'setHeader exists');
	tap.assert.equal(typeof mod.writeHead, 'function', 'writeHead exists');
	tap.assert.equal(typeof mod.write, 'function', 'write exists');
	tap.assert.equal(typeof mod._body, 'string', '_body exists');
	tap.assert.equal(typeof mod._headers, 'object', '_headers exists');
	tap.assert.equal(typeof mod._rawHeaders, 'object', '_rawHeaders exists');
	tap.assert.equal(typeof mod._statusCode, 'number', '_statusCode exists');

	// From: http://stackoverflow.com/a/37022523
	// return test instanceof EventEmitter && typeof test.write === 'function' && typeof test.end ==== 'function'
	tap.assert(mod instanceof events.EventEmitter, 'EventEmitter');
	tap.assert.equal(typeof mod.write, 'function', 'write exists');
	tap.assert.equal(typeof mod.end, 'function', 'end exists');
})();


(function setHeader() {
	mod = require('../')();
	mod.setHeader('Content-Type', 'application/javascript');

	tap.assert.deepEqual(mod._headers, {'content-type': 'application/javascript'}, 'Headers set');
	tap.assert.deepEqual(mod._rawHeaders, ['Content-Type', 'application/javascript'], 'Headers set');
})();

(function write() {
	mod = require('../')();
	mod.write('test');

	tap.assert.equal(mod._body, 'test', '_body should get set');
})();

(function writeHead() {
	mod = require('../')();
	mod.writeHead(200, {'Content-Type': 'application/javascript'});

	tap.assert.equal(mod._body, '', '_body should be empty');
	tap.assert.deepEqual(mod._headers, {'content-type': 'application/javascript'}, '_headers should be set');
	tap.assert.deepEqual(mod._rawHeaders, ['Content-Type', 'application/javascript'], '_rawHeaders should be set');
	tap.assert.equal(mod._statusCode, 200, '_statusCode should be set');
	tap.assert.equal(mod.headersSent, true, 'headersSent should be set');
})();

(function writeHead() {
	mod = require('../')();
	mod.writeHead(422);

	tap.assert.equal(mod._statusCode, 422, '_statusCode should be set');
	tap.assert.equal(mod.headersSent, true, 'headersSent should be set');
})();

(function endWorking() {
	mod = require('../')();

	mod.on('finish', function() {
		tap.assert.equal(mod._body, 'end', '_body should be set');
	});

	mod.end('end');

})();

(function errorSetHeaderAfterWriteHead() {
	try {
		mod = require('../')();
		mod.writeHead(200, {'Content-Type': 'application/javascript'});
		mod.setHeader('X-Header', 'too late');
	} catch(e) {
		tap.assert(true, 'Should throw an error if setHeader is called after writeHead.');
	}

})();


