const express = require('express');
const router = express.Router();
const keys = require('../../../config').database;

// Load User model
const User = require('../../../models/User');

// Logging
const Logger = require('../../../lib/Logger');

const logger = new Logger('admin-users-route');

const validateEditUser = require('../../../validation/editUsers');
// @route get api/admin/users
// @desc get all users
// @access Public

router.get('/', (req, res) =>
{

	User.find().then((users) =>
	{
		const resp = users.map((user) =>
		{
			return {
				id              : user.id,
				name            : user.name,
				userType        : user.userType,
				email           : user.email,
				admissionNumber : user.admissionNumber,
				active          : user.active
			};
		});

		res.json(resp);
	});
});

// @route put api/admin/users
// @desc edit a user
// @access Public
router.put('/', (req, res) =>
{
	const { errors, isValid } = validateEditUser(req.body);

	if (!isValid)
	{
		return res.status(400).json(errors);
	}

	const { id } = req.body;

	if (!id || !id.match(/^[0-9a-fA-F]{24}$/))
	{
		return res.status(404).json({ invalidId: 'Invalid Id field' });
	}

	logger.debug(req.body);

	User.init().then(() =>
	{
		User.findOneAndUpdate({ _id: id },
			{
				name            : req.body.name,
				email           : req.body.email,
				admissionNumber : req.body.admissionNumber,
				userType        : req.body.userType,
				active          : req.body.active
			}, { new: true })
			.then((user) =>
			{
				res.json({
					name            : user.name,
					email           : user.email,
					admissionNumber : user.admissionNumber,
					userType        : user.userType,
					id              : user.id,
					active          : user.active
				});
			})
			. catch((error) =>
			{
				logger.error(error);

				const field = error.message.match(/index: (.*?)_/)[1];

				if (field && error.message.includes('duplicate key error'))
				{
					return res.status(400).json({ [field]: `${field} Already taken` });
				}

				return res.status(400).json({ generalError: 'Server Error!, report to admin' });
			});
	});
});

// @route delete api/admin/users
// @desc delete a user
// @access Public
router.delete('/', (req, res) =>
{
	const { userId } = req.body;

	if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/))
	{
		return res.status(404).json({ invalidId: 'Invalid Id field' });
	}

	User.findOneAndDelete({ _id: userId }).then((user) =>
	{
		logger.debug('%o', user);

		return res.json({
			id              : user.id,
			name            : user.name,
			userType        : user.userType,
			admissionNumber : user.admissionNumber,
			email           : user.email
		});
	})
		.catch((error) =>
		{
			logger.error(error);

			return res.status(400).json({ error: error.message });
		});
});

module.exports = router;
