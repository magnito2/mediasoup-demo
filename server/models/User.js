const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Logging
const Logger = require('../lib/Logger');

const logger = new Logger('users-model');

// create Schema
const UserSchema = new Schema({
	name : {
		type     : String,
		required : true
	},
	admissionNumber : {
		type     : String,
		required : false,
		unique   : true,
		trim     : true,
		sparse   : true
	},
	userType : {
		type     : String,
		required : true
	},
	email : {
		type     : String,
		required : false,
		unique   : true,
		trim     : true,
		sparse   : true
	},
	password : {
		type     : String,
		required : true
	},
	role : {
		type     : String,
		required : false
	},
	date : {
		type    : Date,
		default : Date.now
	},
	active : {
		type    : Boolean,
		default : false
	}
});

UserSchema.pre('validate', function(next)
{

	if ('email' in this || 'admissionNumber' in this)
	{
		next();
	}
	else
	{
		next(new Error('Provide either Email or Admission Number'));
	}
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
