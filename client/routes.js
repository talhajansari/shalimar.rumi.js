/* =============================================================================
 INITIALIZE
===============================================================================*/
var express = require('express');
var router = express.Router();

var path_to_pages = './client//public/pages'
var path_to_assets = './client/public/assets'

router.get('/todo', function(req, res) {
	res.sendfile(path_to_pages + '/todo/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

router.get('/index', function(req, res) {
	res.sendfile(path_to_pages + '/index/index.html'); 
});

router.get('/asset/*', function(req, res) {
	var path = req.params[0]
	console.log(path);
	console.log(req.params);
	
	//res.contentType(path_to_assets + '/' + path);
	res.sendfile(path_to_assets + '/' + path); 
});


module.exports = router