var stream = require('stream');

var mod = {};

mod = function(input) {
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
		res._rawHeaders.push(name);
		res._rawHeaders.push(value);
		res._headers[name.toLowerCase()] = value;
	};

	res.writeHead = function(statusCode, statusMessage, header) {
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
