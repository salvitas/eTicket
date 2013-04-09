var mongoose = require('mongoose');
var TicketSchema = new mongoose.Schema({ 
	number: {type: String, unique: true, required: true},
	mobile: String,
	items: String,
	price: String,
	vat: String,
	total: String,
	fecha: Date,
	meta: { 
		created_at: {type: Date, 'default': Date.now },
		updated_at: {type: Date, 'default': Date.now }
	}
});

TicketSchema.pre('save', function(next) { 
	if (this.isNew) {
		this.meta.created_at = Date.now; 
	}
	this.meta.updated_at = Date.now;
	next(); 
});

module.exports = TicketSchema;