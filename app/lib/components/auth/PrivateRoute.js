import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component : Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
		{
			if (auth.isAuthenticated === true)
			{
				return <Component {...props} />;
			}
			else
			{
				return <Redirect to='/login'/>;
			}
		}}
	/>
);

PrivateRoute.propTypes = {
	auth      : PropTypes.object.isRequired,
	component : PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
	auth : state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
