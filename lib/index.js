var stream = require('stream');

var mod = {};

mod = function(input) {
	var locked = false;
	var res = stream.Writable();
	res._write = function (chunk, enc, next) {
		res._body += chunk;
		next();
	};

	res._body = '';
	res._headers = {};
	res._rawHeaders = [];
	res._statusCode = 0;
	res._statusMessage = '';

	res.setHeader = function(name, value) {
		if(locked) {
			throw new Error("Can't set headers after they are sent.");
		}
		res._rawHeaders.push(name);
		res._rawHeaders.push(value);
		res._headers[name.toLowerCase()] = value;
	};

	res.writeHead = function(statusCode, statusMessage, header) {
		locked = true;
		res._statusCode = statusCode;
		if(typeof statusMessage == 'string') {
			res._statusMessage = statusMessage;
		} else {
			header = statusMessage;
		}

		headerAdd(header);
	};

	res.write = function(input) {
		res._body += input;
	};

	function headerAdd(header) {
		var keys = Object.keys(header);
		var i;

		for(i = 0; i < keys.length; i++) {
			res._rawHeaders.push(keys[i], header[keys[i]]);
			res._headers[keys[i].toLowerCase()] = header[keys[i]];
		}
	}

	return res;
}

module.exports = mod;
