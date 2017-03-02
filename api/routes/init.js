/* =============================================================================
 INITIALIZE
===============================================================================*/
var express = require('express');
var router = express.Router();

/** =============================================================================
 HELPER METHODS
===============================================================================*/

methods = {};

/**
* Functions
*
* Helper methods for API routes
*
**/
methods.response = function(res, error, success, data) {
    res.json({
      error: error,
      success: success,
      data: data
    });
}
methods.responseData = function(res, data) {
    res.json({
      error: null,
      success: true,
      data: data
    });
}

methods.responseError = function(res, error) {
    res.json({
      error: error,
      success: false,
      data: null
    });
}

methods.responseUnauthorized = function(res) {
    res.json({
      error: "Unauthorized Request",
      success: false,
      data: null
    });
}

methods.authenticateToken = function (req, res, next) {
  return router.methods.isAuthorized(req, res, 
  	function(is_authenticated, decoded) {
  		if (!is_authenticated) {
  			return router.methods.responseUnauthorized(res);
  		}
  		req.session_object = decoded;
  		return next();
  	});
}

/**
* Function
*
* Checks whether the authToken is Valid or not
*
**/
methods.isAuthorized = function (req, res, cb) {
  
  var token =  req.headers['authorization']
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
    
    if (err) { 
    	return cb(false, null);
    }
    if (!decoded) {
    	return cb(false, null);
    }

    if (!decoded.is_active) {
    	console.log("something worng");
    	return cb(false, null);
    }

    return cb(true, decoded);
  });
}

/**
* Function
*
* Checks if the user is properly authenticated, with all session objects set up.
*
**/
methods.isAuthenticated = function (req, res, cb) {
  
  if (req.session_object && req.session_object.user && req.session_object.user_type) {
  	return cb();
  }
  return router.methods.responseError('Token not authenticated!')
}

router.methods = methods;

/* =============================================================================
 Middleware
===============================================================================*/
router.use(function(req, res, next) {
    // do logging, and validation here.
    console.log('Request made to: ' + req.url);
    console.log(req.headers);
    console.log(req.params);
    console.log(req.body);
    next();
});

/* =============================================================================
 Test Routes
===============================================================================*/
router.get('/ping', function(req, res) {
	console.log(req.session_object);
  router.methods.responseData(res, "Pong");
});

router.post('/ping', function(req, res) {
  console.log(req.body);
  router.methods.responseData(res, ['Pong',req.body]);
});

/* =============================================================================
 Include Routes
==============================================================================*/

require('./todo')(router);

/* =============================================================================
End
===============================================================================*/

module.exports = router;
