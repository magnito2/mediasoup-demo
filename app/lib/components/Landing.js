import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component
{
	constructor()
	{
		super();
		this.state = {};
	}

	componentDidMount()
	{
		this.props.history.push('/home');
	}

	render()
	{
		return (
			<div data-component='Landing'>
				<h1>Hello world</h1>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth : state.auth
});

export default connect(
	mapStateToProps,
	{}
)(Landing);
