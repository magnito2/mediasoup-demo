import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, setUserLoading, clearError, clearErrors } from '../../redux/authActions';
import classnames from 'classnames';
import Logger from '../../Logger';

const logger = new Logger('Register');

class Register extends Component
{
	constructor()
	{
		super();
		this.state = {
			name            : '',
			email           : '',
			userType       	: 'student',
			admissionNumber : '',
			password        : '',
			password2       : '',
			errors          : {}
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps)
	{
		if (nextProps.errors)
		{
			this.setState({
				errors : nextProps.errors
			});
		}
	}

	handleOnChange(e)
	{
		this.setState({ [e.target.id]: e.target.value });
		if (e.target.id === 'userType')
		{
			if (e.target.value === 'teacher')
			{
				this.setState({ admissionNumber: '' });
			}
			else if (e.target.value === 'student')
			{
				this.setState({ email: '' });
			}
		}
		if (this.state.errors)
		{
			const patt = new RegExp(e.target.id);
			const keys = Object.keys(this.state.errors).filter((error) => patt.test(error));

			if (keys.length)
			{
				this.props.onClearError(keys[0]);
			}
		}
	}

	componentWillUnmount()
	{
		this.props.onClearErrors();
	}

	handleOnSubmit(e)
	{
		e.preventDefault();
		const newUser = {
			name            : this.state.name,
			email           : this.state.email,
			userType       	: this.state.userType,
			admissionNumber : this.state.admissionNumber,
			password        : this.state.password,
			password2       : this.state.password2
		};

		// logger.debug(newUser);
		this.props.onRegisterUser(newUser, this.props.history);
		this.props.onUserLoading();
	}

	render()
	{
		const { errors } = this.state;
		const { loading } = this.props.auth;

		return (
			<div data-component='Login'>
				<div className='login-page'>
					<div className='form'>
						<div className='home-link'>
							<p className='message'><Link to='/' className='icon-left'>Go Home</Link></p>
						</div>
						<form className='login-form' noValidate onSubmit={this.handleOnSubmit}>
							<span className='red-text'>
								{errors.generalError}
							</span>
							<input
								onChange={this.handleOnChange}
								value={this.state.name}
								error={errors.name}
								id='name'
								type='text'
								className={classnames('', {
									invalid : errors.name
								})}
								placeholder='Username'
							/>
							<span className='red-text'>
								{errors.name}
							</span>
							<select id='userType' value={this.state.userType} onChange={this.handleOnChange}>
								<option value='student'>Student</option>
								<option value='teacher'>Teacher</option>
							</select>
							<span className='red-text'>
								{errors.userType}
							</span>
							{this.state.userType === 'student' &&
								<>
									<input
										onChange={this.handleOnChange}
										value={this.state.admissionNumber}
										error={errors.admissionNumber}
										id='admissionNumber'
										type='text'
										className={classnames('', {
											invalid : errors.admissionNumber
										})}
										placeholder='Admission Number'
									/>
									<span className='red-text'>
										{errors.admissionNumber}
									</span>
								</>
							}
							<input
								onChange={this.handleOnChange}
								value={this.state.email}
								error={errors.email}
								id='email'
								type='email'
								className={classnames('', {
									invalid : errors.email
								})}
								placeholder={`Email ${this.state.userType === 'student'? ' *Optional': ''}`}
							/>
							<span className='red-text'>
								{errors.email}
							</span>
							<input
								onChange={this.handleOnChange}
								value={this.state.password}
								error={errors.password}
								id='password'
								type='password'
								className={classnames('', {
									invalid : errors.password
								})}
								placeholder='Password'
							/>
							<span className='red-text'>
								{errors.password}
							</span>
							<input
								onChange={this.handleOnChange}
								value={this.state.password2}
								error={errors.password2}
								id='password2'
								type='password'
								className={classnames('', {
									invalid : errors.password2
								})}
								placeholder='Confirm Password'
							/>
							<span className='red-text'>
								{errors.password2}
							</span>
							<button>create</button>
							<p className='message'>Already registered? <Link to='/login'>Sign In</Link></p>
						</form>
						{ loading && <div className='loading-overlay' /> }
					</div>
				</div>
			</div>
		);
	}
}

Register.PropTypes = {
	onRegisterUser : PropTypes.func.isRequired,
	onUserLoading  : PropTypes.func,
	auth           : PropTypes.object.isRequired,
	errors         : PropTypes.object.isRequired,
	onClearError   : PropTypes.func,
	onClearErrors  : PropTypes.func
};

const mapStateToProps = (state) => ({
	auth   : state.auth,
	errors : state.errors
});

const mapDispatchToProps = (dispatch) =>
{
	return {
		onRegisterUser : (userData, history) =>
		{
			dispatch(registerUser(userData, history));
		},
		onUserLoading : () =>
		{
			dispatch(setUserLoading());
		},
		onClearError : (errorKey) =>
		{
			dispatch(clearError(errorKey));
		},
		onClearErrors : () =>
		{
			dispatch(clearErrors());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Register));
