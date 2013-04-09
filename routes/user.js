var users = require('../data/users');

module.exports = function(app) {
	
	app.get('/users', function(req, res) { 
		res.render('users/index', {title: 'Users', users: users});
	});
	
	app.get('/users/new', function(req, res) { 
		res.render('users/new', {title: "New User"});
	});
	
	app.get('/users/:name', function(req, res, next) {
		var user = users[req.params.name];
		if(user) {
			res.render('users/view', {title: 'View User', user: user}); 
		} else {
			next();
		}
	});
	
	app.get('/users/:name/edit', function(req, res, next) {
		var user = users[req.params.name];
		if(user) {
			res.render('users/edit', {title: 'Editar Ticket', user: user}); 
		} else {
			next();
		}
	});
	
	app.post('/users', function(req, res, next) { 
		if (users[req.body.username]) {
			res.send('Conflict', 409); 
		} else {
			users[req.body.username] = req.body;
			res.redirect('/users'); 
		}
		
		//DB
		/*db.get(req.body.username, function(err, user) {
		if (err) {
		return next(err);
		}
		if (user) {
		res.send('Conflict', 409); } else {
		db.set(req.body.username, req.body, function(err) { if (err) {
		return next(err); }
		res.redirect('/users'); });
		} 
		}*/
	});
	
	app.put('/users/:name', function(req, res, next) { 
		var user = tickets[req.params.name];
		if (user) {
			//edit tickets[req.params.number];
			console.log('PUT - user:'+ t.username)
			res.redirect('/users'); 
		} else {
			next(); 
		}
	});
	
	app.del('/users/:name', function(req, res, next) { 
		if (users[req.params.name]) {
			delete users[req.params.name];
			res.redirect('/users'); 
		} else {
			next(); 
		}
	});
};