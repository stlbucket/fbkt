var fbkt = require('../../../../../../Fbkt');
var _app = 'NO_APP';
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


module.exports = ()=>{
	_app = express();
	_app.use(cors());
	_app.use(bodyParser.json());       // to support JSON-encoded bodies
	_app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));
	fbkt().app = _app;
};
