import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, modalHidden } from '../../redux/adminActions';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import deepEqual from 'deep-equal-x';

import PropTypes from 'prop-types';

import EditModal from './edit-modal';
import Pagination from '../Paginator';

import Logger from '../../Logger';
const logger = new Logger('Admin');

class Admin extends Component
{
	constructor()
	{
		super();
		this.state = {
			users          : [],
			editUser       : undefined,
			userTypeFilter : '',
			usersFilter    : '',
			pagination     : {
				currentPage  : 1,
				totalPages   : undefined,
				pageLimit    : 20,
				totalRecords : undefined
			}
		};

		this.handleShowModal = this.handleShowModal.bind(this);
		this.onHideModal = this.onHideModal.bind(this);
	}

	componentDidMount()
	{
		if (this.props.userType !== 'teacher')
		{
			this.props.history.push('/home');
		}
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

	onPageChanged = (data) =>
	{
		logger.debug(data);
		this.setState(
			{
				pagination : {
					...data,
					currentPage : data.currentPage > 0 ? data.currentPage : 1
				}
			}
		);
	}

	handleOnChange = (e) =>
	{
		this.setState({ [e.target.name]: e.target.value });
	}

	render()
	{
		const { editUser, userTypeFilter, usersFilter } = this.state;

		let { users } = this.state;

		if (userTypeFilter)
		{
			users = users.filter((u) =>
			{
				return (u.userType || '').includes(userTypeFilter);
			});
		}

		if (usersFilter)
		{
			users = users.filter((u) =>
			{
				return (u.name || '').includes(usersFilter) ||
					(u.email || '').includes(usersFilter) ||
					(u.admissionNumber || '').includes(usersFilter);
			});
		}

		const { currentPage, pageLimit } = this.state.pagination;
		const offset = (currentPage - 1) * pageLimit;
		const currentUsers = users.slice(offset, offset + pageLimit);

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
							<select
								id='users-type'
								name='userTypeFilter'
								onChange={this.handleOnChange}
							>
								<option value=''>All</option>
								<option value='student'>Students</option>
								<option value='teacher'>Teachers</option>
							</select>
							<span className='search-element'>
								<label htmlFor='users-filter'>Search</label>
								<input
									id='users-filter'
									name='usersFilter'
									placeholder='Search'
									value={this.state.usersFilter}
									onChange={this.handleOnChange}
								/>
							</span>
						</div>
						<div className='users-table'>
							<table>
								<thead>
									<tr>
										<th>S/N</th>
										<th>Name</th>
										<th>Type</th>
										<th>Email</th>
										<th>Admin No</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{
										currentUsers.map((user, index) =>
										{
											return (
												<tr key={`u-${index}`}>
													<td>{ index + offset + 1 }</td>
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
						{
							users.length && (
								<Pagination
									totalRecords={users.length}
									pageLimit={20}
									pageNeighbours={2}
									handlePageChanged={this.onPageChanged}
								/>
							)
						}
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
