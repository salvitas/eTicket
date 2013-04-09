//var tickets = require('../data/faketickets');
var Ticket = require('../data/models/ticket.js');
var loadTicket = require('./middleware/load_ticket.js');

var maxTicketsPerPage = 5;

module.exports = function(app) {
	
	app.get('/tickets', function(req, res, next) { 
		var page = req.query.page && parseInt(req.query.page, 10) || 0;	
		Ticket.count(function(err, count) {
			if (err) {
				return next(err);
			}
			var lastPage = (page + 1) * maxTicketsPerPage >= count;
		
			Ticket.find({}).skip(page * maxTicketsPerPage).limit(maxTicketsPerPage).exec(function(err, tickets) { 
				if (err) {
					return next(err); 
				}
				res.render('tickets/index.jade', {
					title: 'Tickets', 
					tickets: tickets, 
					page: page,
					lastPage: lastPage
				});
			});
		});
	});
	
	app.get('/tickets/new', function(req, res) { 
		res.render('tickets/new.jade', {title: "New Ticket"});
	});
	
	app.get('/tickets/:number', loadTicket,function(req, res, next) {
		if (!req.ticket) {
			 return res.send('Not Found', 404);
		}
		res.render('tickets/view.jade', {title: 'Ver Ticket', ticket: req.ticket});
	});
	
	app.get('/tickets/:number/edit', loadTicket, function(req, res, next) {
		if(!req.ticket) {
			return res.send('Not Found', 404);
		} 
		res.render('tickets/edit.jade', {title: 'Editar Ticket', ticket: req.ticket}); 
	});
	
	app.post('/tickets', loadTicket, function(req, res, next) { 
		if (req.ticket) {
			return res.send('Conflict', 409);
		}
		console.log(req.body);
		var t = new Ticket(req.body);
		t.save(function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/tickets');
		});
	});
	
	app.put('/tickets/:number', loadTicket, function(req, res, next) { 
		if (!req.ticket) {
			return res.send('Not Found', 404);
		}
		console.log('PUT - ticket:'+ req.body.total);
		var t = new Ticket(req.body);
		Ticket.update({_id: req.ticket._id}, t, {}, function(err) { 
			if (err) { 
				return next(err); 
			}
			res.redirect('/tickets'); 
		});
		
	});
	
	app.del('/tickets/:number', loadTicket, function(req, res, next) { 
		if (!req.ticket) {
			return res.send('Not Found', 404);
		}
		req.ticket.remove(function(err) { 
			if (err) { 
				return next(err); 
			}
			res.redirect('/tickets'); 
		});
	});
};