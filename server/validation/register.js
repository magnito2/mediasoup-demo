const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data)
{
	const errors = {};
	// Convert empty fields to an empty string so we can use validator functions

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.admissionNumber = !isEmpty(data.admissionNumber) ? data.admissionNumber : '';
	data.userType = !isEmpty(data.userType) ? data.userType : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';
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
	// Password checks
	if (Validator.isEmpty(data.password))
	{
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.password2))
	{
		errors.password2 = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 }))
	{
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.password2))
	{
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,
		isValid : isEmpty(errors)
	};
};
