import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, setUserLoading } from '../../redux/authActions';
import * as requestActions from '../../redux/requestActions';
import classnames from 'classnames';

import deepEqual from 'deep-equal-x';
import { isEmpty } from '../../utils';

import Logger from '../../Logger';
const logger = new Logger('Login');

class Login extends Component
{
	constructor()
	{
		super();
		this.state = {
			email    : '',
			password : '',
			errors   : { },
			isAuth   : false
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	componentDidUpdate(prevProps)
	{

		if (prevProps.auth.isAuthenticated)
		{
			this.props.onAuthenticated();
			this.props.history.push('/home'); // push user to room when they login
		}
	}

	static getDerivedStateFromProps(props, state)
	{
		if (props.errors && !isEmpty(props.errors) && !deepEqual(props.errors, state.errors))
		{
			return {
				errors : props.errors
			};
		}
		if (props.auth.isAuthenticated !== state.isAuth)
		{
			return {
				isAuth : props.auth.isAuthenticated
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
		const userData = {
			email    : this.state.email,
			password : this.state.password
		};

		this.props.onLoginUser(userData);
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
							<p className='message'><Link to='/' className='icon-left'>Go Back</Link></p>
						</div>
						<form className='login-form' noValidate onSubmit={this.handleOnSubmit}>
							<input
								onChange={this.handleOnChange}
								value={this.state.email}
								error={errors.email}
								id='email'
								type='email'
								placeholder='email'
								className={classnames('', {
									invalid : errors.email || errors.emailnotfound
								})}
							/>
							<span className='red-text'>
								{errors.email}
								{errors.emailnotfound}
							</span>
							<input
								onChange={this.handleOnChange}
								value={this.state.password}
								error={errors.password}
								id='password'
								type='password'
								className={classnames('', {
									invalid : errors.password || errors.passwordincorrect
								})}
							/>
							<span className='red-text'>
								{errors.password}
								{errors.passwordincorrect}
							</span>
							<button>login</button>
							<p className='message'>Not registered? <Link to='/register'>Register</Link></p>
						</form>
						{ loading && <div className='loading-overlay' /> }
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	onLoginUser     : PropTypes.func.isRequired,
	auth            : PropTypes.object.isRequired,
	errors          : PropTypes.object,
	history        	: PropTypes.object,
	onAuthenticated : PropTypes.func,
	onUserLoading   : PropTypes.func
};

const mapStateToProps = (state) => ({
	auth   : state.auth,
	errors : state.errors
});

const mapDispatchToProps = (dispatch) =>
{
	return {
		onAuthenticated : () =>
		{
			dispatch(requestActions.notify(
				{
					text : 'You are already signed in'
				}));
		},
		onLoginUser : (userData) =>
		{
			dispatch(loginUser(userData));
		},
		onUserLoading : () =>
		{
			dispatch(setUserLoading());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
