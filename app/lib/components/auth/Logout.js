import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRoomContext } from '../../RoomContext';
import { logoutUser } from '../../redux/authActions';
import Logger from '../../Logger';
const logger = new Logger('Logout');

class Logout extends Component
{
	constructor()
	{
		super();
		this.state = {
			errors : { }
		};
	}

	componentDidMount()
	{
		logger.debug('We got here');
		if (this.props.auth.isAuthenticated)
		{
			this.props.roomClient.close();
			this.props.logoutUser();
		}
		this.props.history.push('/'); // push user to room when they login
	}

	render()
	{
		return <h1>BYE, SEE YOU AGAIN</h1>;
	}

}

Logout.propTypes = {
	logoutUser : PropTypes.func.isRequired,
	auth       : PropTypes.object.isRequired,
	errors     : PropTypes.object,
	history   	: PropTypes.object,
	roomClient	: PropTypes.any
};

const mapStateToProps = (state) => ({
	auth   : state.auth,
	errors : state.errors
});

export default withRoomContext(connect(
	mapStateToProps,
	{ logoutUser }
)(Logout));
