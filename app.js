
/**
 * Module dependencies.
 */
var dbURL = 'mongodb://localhost/eTickets'; 
var db = require('mongoose').connect(dbURL);

var express = require('express'),
  	//routes = require('./routes'),
  	//user = require('./routes/user'),
  	http = require('http'),
	path = require('path');

var app = express();

// all environments



app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('lahojaverde'));
	app.use(express.session({ 
		secret: 'lahojaverde', 
		maxAge: 3600000
	}));
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(function(req, res) {
	  res.locals.session = req.session;
	});
});

if('production' == app.get('env')) {
	app.use(gzippo.staticGzip(__dirname + '/public'))
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/ticket')(app);
require('./routes/user')(app);
require('./routes/session')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
