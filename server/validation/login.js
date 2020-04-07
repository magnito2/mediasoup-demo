const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data)
{
	const errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	data.admissionNumber = !isEmpty(data.admissionNumber) ? data.admissionNumber : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.userType = !isEmpty(data.userType) ? data.userType : '';

	// UserType checks
	if (Validator.isEmpty(data.userType))
	{
		errors.userType = 'User Type is required';
	}

	// Email checks
	if (Validator.isEmpty(data.email))
	{
		if (data.userType === 'teacher')
		{
			errors.email = 'Email field is required for a teacher';
		}
	}
	else if (!Validator.isEmail(data.email))
	{
		errors.email = 'Email is invalid';
	}

	// Admission number checks
	if (Validator.isEmpty(data.admissionNumber))
	{
		if (data.userType === 'student')
		{
			errors.admissionNumber = 'admissionNumber is required for a student';
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

	return {
		errors,
		isValid : isEmpty(errors)
	};
};
