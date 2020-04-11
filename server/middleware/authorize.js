module.exports = (passport) =>
{
	const authorize = (role) =>
	{
		return [
			// first authenticate the user
			passport.authenticate('jwt', { session: false }),

			// authorize based on user role
			(req, res, next) =>
			{
				if (req.user.role !== role)
				{
					// user's role is not authorized
					return res.status(401).json({ message: 'Unauthorized' });
				}

				// authentication and authorization successful
				next();
			}
		];
	};

	return authorize;
};
