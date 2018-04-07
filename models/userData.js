const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserData = mongoose.model('UserData', 
{ 
	firstName: String,
	lastName: String,
	user: Schema.Types.ObjectId
	birthDate: Date,
	updateDate: { 
		type: Date,
		default: Date.now
	}
	
});

module.exports = UserData;