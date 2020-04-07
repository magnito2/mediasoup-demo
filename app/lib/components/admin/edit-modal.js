import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, modalHidden } from '../../redux/adminActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Logger from '../../Logger';
const logger = new Logger('Admin-Edit');

class EditModal extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			userId         	: this.props.user.id,
			name            : this.props.user.name,
			admissionNumber : this.props.user.admissionNumber,
			email           : this.props.user.email,
			userType       	: this.props.user.userType,
			showModal       : this.props.showModal
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.handleHideModal = this.handleHideModal.bind(this);
		this.handleOnDelete = this.handleOnDelete.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.node = React.createRef();
	}

	handleHideModal()
	{
		this.props.hideModal();
	}

	handleOnChange(e)
	{
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name === 'userType')
		{
			if (e.target.value === 'teacher')
			{
				this.setState({ admissionNumber: '' });
			}
		}
	}
	handleOnDelete(e)
	{
		e.preventDefault();
		const accept = confirm('Do you want to delete?');

		if (accept)
		{
			this.props.onDeleteUser(this.state.userId);
		}
	}

	handleOnSubmit(e)
	{
		e.preventDefault();
		const { userId } = this.state;

		const userData = {
			email           : this.state.email,
			name            : this.state.name,
			admissionNumber : this.state.admissionNumber,
			userType        : this.state.userType,
			id              : userId
		};

		logger.debug(userData);
		this.props.onUpdateUser(userData);

	}

	handleOnClick(e)
	{
		if (this.node.current.contains(e.target))
		{
			return;
		}
		this.handleHideModal();
	}

	componentWillUnmount()
	{
		document.removeEventListener('mousedown', this.handleOnClick, false);
		this.props.onModalHidden();
	}

	componentDidMount()
	{
		document.addEventListener('mousedown', this.handleOnClick, false);
	}

	render()
	{
		return (
			<div className={classnames('modal', this.state.showModal ? 'show' : '')}>
				<span className='close' onClick={this.handleHideModal}>&times;</span>
				<div className='modal-content' ref={this.node}>
					<h2>Edit</h2>
					<form className='edit-form' noValidate onSubmit={this.handleOnSubmit}>
						<select name='userType' value={this.state.userType} onChange={this.handleOnChange}>
							<option value='teacher'>Teacher</option>
							<option value='student'>Student</option>
						</select>
						<input
							type='text'
							name='name'
							placeholder='name'
							value={this.state.name}
							onChange={this.handleOnChange}
						/>
						{this.state.userType === 'student' &&
							<input
								type='text'
								name='admissionNumber'
								placeholder='Admission Number'
								value={this.state.admissionNumber}
								onChange={this.handleOnChange}
							/>
						}
						<input
							type='email'
							name='email'
							placeholder={`Email ${this.state.userType === 'student' ? ' *Optional' : ''}`}
							value={this.state.email}
							onChange={this.handleOnChange}
						/>
						<button type='submit'>Submit</button>
					</form>
					<button name='delete' className='delete-button' onClick={this.handleOnDelete}>Delete</button>
				</div>
			</div>
		);
	}
}

EditModal.propTypes =
{
	user          : PropTypes.object.isRequired,
	showModal     : PropTypes.bool.isRequired,
	hideModal     : PropTypes.func.isRequired,
	onUpdateUser  : PropTypes.func.isRequired,
	onDeleteUser  : PropTypes.func.isRequired,
	onModalHidden : PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
{
	return {
		onUpdateUser : (userData) =>
		{
			dispatch(updateUser(userData));
		},
		onDeleteUser : (userId) =>
		{
			dispatch(deleteUser(userId));
		},
		onModalHidden : () =>
		{
			dispatch(modalHidden());
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(EditModal);
