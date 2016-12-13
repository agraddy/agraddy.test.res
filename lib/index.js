var output = {};

output = function(input) {
	var res = {};

	res._body = '';
	res._headers = [];
	res._statusCode = 0;
	res._statusMessage = '';

	res.end = function(input) {
	};

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

module.exports = output;
