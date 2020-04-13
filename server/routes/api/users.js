const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config').database;
// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');

// Logging
const Logger = require('../../lib/Logger');

const logger = new Logger('users-route');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) =>
{
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation

	if (!isValid)
	{
		return res.status(400).json(errors);
	}

	logger.debug(`Email is ${req.body.email}`);

	User.findOne({
		$or : [
			{ $and: [ { email: { '$exists': true, '$ne': '' } }, { email: req.body.email } ] },
			{ $and: [ { admissionNumber: { '$ne': '' } }, { admissionNumber: req.body.admissionNumber } ] }
		]
	}).then((user) =>
	{
		if (user)
		{
			if (user.email && user.email === req.body.email)
			{
				return res.status(400).json({ email: 'Email already exists' });
			}
			else if (user.admissionNumber && user.admissionNumber === req.body.admissionNumber)
			{
				return res.status(400).json({ admissionNumber: 'Admission Number already exists' });
			}
		}
		else
		{
			logger.debug('Creating a new user, %o', req.body);
			const newUser = new User({
				name            : req.body.name,
				admissionNumber : req.body.admissionNumber || undefined,
				userType        : req.body.userType,
				email           : req.body.email || undefined,
				password        : req.body.password
			});
			// Hash password before saving in database

			bcrypt.genSalt(10, (err, salt) =>
			{
				bcrypt.hash(newUser.password, salt, (errIn, hash) =>
				{
					if (errIn) throw errIn;
					newUser.password = hash;
					newUser
						.save()
						.then((userIn) => res.json({
							name            : userIn.name,
							admissionNumber : userIn.admissionNumber,
							email           : userIn.email,
							id              : userIn.id,
							userType        : userIn.userType
						}))
						.catch((errIn2) =>
						{
							logger.error(errIn2);

							const field = errIn2.message.match(/index: (.*?)_/)[1];

							if (field && errIn2.message.includes('duplicate key error'))
							{
								return res.status(400).json({ [field]: `${field} Already taken` });
							}

							return res.status(400).json({ generalError: 'Server Error!, report to admin' });
						});
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) =>
{
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation

	if (!isValid)
	{
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const admissionNumber = req.body.admissionNumber;
	const password = req.body.password;

	// Find user by email
	User.findOne({ $or :
		[
			{ $and: [ { email }, { userType: 'teacher' } ] },
			{ $and: [ { admissionNumber: { '$ne': '' } }, { admissionNumber }, { userType: 'student' } ] }
		]
	}).then((user) =>
	{
		// Check if user exists
		if (!user)
		{
			if (email)
			{
				return res.status(404).json({ emailnotfound: 'Email not found' });
			}
			else if (admissionNumber)
			{
				return res.status(404).json({ admissionNumbernotfound: 'Admission Number not found' });
			}
		}

		// Check user account is activated
		if (!user.active)
		{
			return res.status(404).json({ generalError: `Hi ${user.name}, Your account has not been activated, contact your teacher or admin` });
		}
		// Check password
		bcrypt.compare(password, user.password).then((isMatch) =>
		{
			if (isMatch)
			{
				// User matched
				// Create JWT Payload
				const payload = {
					id       : user.id,
					name     : user.name,
					userType : user.userType,
					role     : user.role
				};
				// Sign token

				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn : 31556926 // 1 year in seconds
					},
					(err, token) =>
					{
						res.json({
							success : true,
							token   : `Bearer ${ token}`
						});
					}
				);
			}
			else
			{
				return res
					.status(400)
					.json({ passwordincorrect: 'Password incorrect' });
			}
		});
	});
});

module.exports = router;
