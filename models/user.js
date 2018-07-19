const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User', 
{ 
	name: String,
	secret: String,
	domains: [String],
	updateDate: { 
		type: Date,
		default: Date.now
	}
});

module.exports = User;