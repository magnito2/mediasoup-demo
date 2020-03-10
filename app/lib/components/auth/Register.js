import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, setUserLoading } from '../../redux/authActions';
import classnames from 'classnames';
import Logger from '../../Logger';

const logger = new Logger('Register');

class Register extends Component
{
	constructor()
	{
		super();
		this.state = {
			name      : '',
			email     : '',
			password  : '',
			password2 : '',
			errors    : {}
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
	}

	handleOnSubmit(e)
	{
		e.preventDefault();
		const newUser = {
			name      : this.state.name,
			email     : this.state.email,
			password  : this.state.password,
			password2 : this.state.password2
		};

		logger.debug(newUser);
		this.props.registerUser(newUser, this.props.history);
		this.props.setUserLoading();
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
							<input
								onChange={this.handleOnChange}
								value={this.state.email}
								error={errors.email}
								id='email'
								type='email'
								className={classnames('', {
									invalid : errors.email
								})}
								placeholder='Email'
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
	registerUser : PropTypes.func.isRequired,
	auth         : PropTypes.object.isRequired,
	errors       : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth   : state.auth,
	errors : state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser, setUserLoading }
)(withRouter(Register));
