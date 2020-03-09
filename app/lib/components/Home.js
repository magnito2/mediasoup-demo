import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roomsGetAll } from '../redux/roomsActions';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import deepEqual from 'deep-equal-x';
import randomString from 'random-string';
import { isEmpty } from '../utils';

class Home extends Component
{
	constructor()
	{
		super();
		this.state = {
			rooms    : [],
			roomName : ''
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	componentDidMount()
	{
		this.props.roomsGetAll();
	}

	static getDerivedStateFromProps(props, state)
	{
		if (!isEmpty(props.rooms) && !deepEqual(props.rooms, state.rooms))
		{
			return {
				rooms : props.rooms
			};
		}

		return null;
	}

	handleOnChange(e)
	{
		this.setState({ [e.target.id]: e.target.value });
	}

	handleOnSubmit(e)
	{
		e.preventDefault();
		if (this.state.roomName)
		{
			// this.props.changeName(this.state.roomName);
			const roomId = randomString({ length: 8 }).toLowerCase();

			this.props.history.push(
				{
					pathname : '/room',
					search   : `?roomId=${roomId}`,
					state    : { roomName: this.state.roomName }
				});
		}
	}

	render()
	{
		const { rooms } = this.state;

		return (
			<div data-component='Home'>
				<div className='room-logout-wrapper'>
					<div className='room-logout'>
						<Link
							className='link'
							to='/logout'
						>
							Logout
						</Link>
					</div>
				</div>
				<div className='container'>
					<div className='room-list'>
						<h3>{rooms.length ? 'Choose a room to Join' : 'There is no active room'}</h3>
						<ul>
							{
								rooms.map((room, index) =>
								{
									return <li key={index}><a href={`/room?roomId=${room.id}`}>Room {room.name || room.id} by {room.displayName}</a></li>;
								})
							}
						</ul>
					</div>
					<div className='new-room'>
						<h3>Create a room</h3>
						<form className='create-form' noValidate onSubmit={this.handleOnSubmit}>
							<input
								onChange={this.handleOnChange}
								id='roomName'
								type='text'
								placeholder='name of class'
							/>
							<button>Create</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	rooms : state.rooms
});

export default connect(
	mapStateToProps,
	{ roomsGetAll }
)(Home);
