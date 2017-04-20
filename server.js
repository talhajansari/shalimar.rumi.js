/* =============================================================================
/ Get the Packsages
/===============================================================================*/

var express    = require('express');

var config = require('./config');

var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var fs = require('fs') // this engine requires the fs module

var app        = express();

/* =============================================================================
/ Configuration
/===============================================================================*/
var port = process.env.PORT || config.port;        // set our port

app.set('SUPER_SECRET', config.secret);

app.use(express.static(__dirname + '/client/public')); // set the static files location /public/img will be /img
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

/* =============================================================================
 DATABASE
===============================================================================*/
mongoose.connect(config.database)

/* =============================================================================
 MODELS
===============================================================================*/


/* =============================================================================
 ROUTES
===============================================================================*/

app.use('/api', require('./api/core/routes')); // all of our API routes will be prefixed with /api/
app.use('/', require('./client/routes')); // our client facing routes

/* =============================================================================
 Start the Server
===============================================================================*/


app.listen(port);
console.log('Magic happens on port ' + port);
