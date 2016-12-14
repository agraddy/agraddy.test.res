var stream = require('stream');

var mod = {};

mod = function(input) {
	var res = stream.Writable();
	res._write = function (chunk, enc, next) {
		res._body += chunk;
		next();
	};

	res._body = '';
	res._headers = [];
	res._statusCode = 0;
	res._statusMessage = '';

	res.setHeader = function(name, value) {
		var obj = {};
		obj[name] = value;
		res._headers.push(obj);
	};

	res.writeHead = function(statusCode, statusMessage, header) {
		res._statusCode = statusCode;
		if(typeof statusMessage == 'string') {
			res._statusMessage = statusMessage;
			res._headers.push(header);
		} else {
			header = statusMessage;
			res._headers.push(header);
		}
	};

	res.write = function(input) {
		res._body += input;
	};

	return res;
}

module.exports = mod;
