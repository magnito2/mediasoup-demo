const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateEditInput(data)
{
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.admissionNumber = !isEmpty(data.admissionNumber) ? data.admissionNumber : '';
	data.userType = !isEmpty(data.userType) ? data.userType : '';
	// Name checks
	if (Validator.isEmpty(data.name))
	{
		errors.name = 'Name field is required';
	}
	// userType checks
	if (Validator.isEmpty(data.userType))
	{
		errors.userType = 'User Type field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email))
	{
		if (data.userType === 'teacher') // A teacher must provide an email address, no admission number
		{
			errors.email = 'Email field is required';
		}
	}
	else if (!Validator.isEmail(data.email))
	{
		errors.email = 'Email is invalid';
	}
	// admissionNumber checks
	if (Validator.isEmpty(data.admissionNumber))
	{
		if (data.userType === 'student') // A teacher must provide an email address, no admission number
		{
			errors.admissionNumber = 'Admission Number field is required for students';
		}
	}
	else if (!Validator.isInt(data.admissionNumber, { min: 0, max: 100000000 }))
	{
		errors.admissionNumber = 'Invalid Admission Number';
	}

	return {
		errors,
		isValid : isEmpty(errors)
	};
};
