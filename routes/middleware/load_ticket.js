var Ticket = require('../../data/models/ticket');

function loadTicket(req, res, next) {
	Ticket.findOne({number: req.param('number')}, function(err, ticket) {
		if (err) {
			return next(err);
		}
		req.ticket = ticket;
		next(); 
	});
}
module.exports = loadTicket;