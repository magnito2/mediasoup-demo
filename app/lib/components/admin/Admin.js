import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, modalHidden } from '../../redux/adminActions';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import deepEqual from 'deep-equal-x';

import PropTypes from 'prop-types';

import EditModal from './edit-modal';

import Logger from '../../Logger';
const logger = new Logger('Admin');

class Admin extends Component
{
	constructor()
	{
		super();
		this.state = {
			users    : [],
			editUser : undefined
		};

		this.handleShowModal = this.handleShowModal.bind(this);
		this.onHideModal = this.onHideModal.bind(this);
	}

	componentDidMount()
	{
		this.props.onGetUsers();
	}

	static getDerivedStateFromProps(props, state)
	{
		const returnState = {};

		if (!deepEqual(props.users, state.users))
		{
			returnState['users'] = props.users;
		}

		if (props.hideModal.hasOwnProperty('id'))
		{
			returnState['editUser'] = undefined;
		}

		return Object.entries(returnState) !== 0 ? returnState : null;
	}

	handleShowModal(user)
	{
		this.setState({ editUser: user });
	}

	onHideModal()
	{
		this.setState({ editUser: undefined });
		this.props.onModalHidden();
	}

	render()
	{
		const { users, editUser } = this.state;

		return (
			<div data-component='Admin'>
				<div className='navigation'>
					<div className='menu' id='navigation'>
						<ul>
							<li><a href='#'>Home</a></li>
							<li><a href='#'>Users</a></li>
							<li><a href='#'>Schools</a></li>
						</ul>
					</div>
					<p><a href='#navigation' id='access_nav' className='access_aid'>Skip to navigation</a></p>
				</div>
				<div className='container' id='content'>
					<div className='users-view'>
						<div className='users-filter'>
							<label htmlFor='users-type'>Type</label>
							<select id='users-type' name='users_type'>
								<option value='all'>All</option>
								<option value='students'>Students</option>
								<option value='teachers'>Teachers</option>
							</select>
						</div>
						<div className='users-table'>
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Type</th>
										<th>Email</th>
										<th>Admin No</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{
										users.map((user, index) =>
										{
											return (
												<tr key={`u-${index}`}>
													<td>{ user.name }</td>
													<td>{ user.userType}</td>
													<td>{ user.email }</td>
													<td>{ user.admissionNumber }</td>
													<td>
														<button onClick={() => this.handleShowModal(user)}>Edit</button>
													</td>
												</tr>
											);
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{ editUser &&
					<EditModal
						user={editUser}
						showModal
						hideModal={this.onHideModal}
					/> }
			</div>
		);
	}
}

Admin.propTypes =
{
	userId        : PropTypes.string.isRequired,
	history       : PropTypes.any.isRequired,
	userType      : PropTypes.string.isRequired,
	onGetUsers    : PropTypes.func.isRequired,
	onModalHidden : PropTypes.func,
	users         : PropTypes.any
};

const mapStateToProps = (state) => ({
	userId   	: (state.auth.user || {}).id,
	userType  : (state.auth.user || {}).userType,
	users     : state.admin.users,
	hideModal : state.admin.hideModal
});

const mapDispatchToProps = (dispatch) =>
{
	return {
		onGetUsers : () =>
		{
			dispatch(getUsers());
		},
		onModalHidden : () =>
		{
			dispatch(modalHidden());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
