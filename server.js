'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var base = require("./app/base/whoami.js");

var app = express();
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);
base(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});