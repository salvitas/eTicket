var mongoose = require('mongoose');
var TicketSchema = require('../schemas/ticket'); 

var Ticket = mongoose.model('Ticket', TicketSchema); 

module.exports = Ticket;