import axios from 'axios';
import { setAuthToken } from '../utils';
import jwtDecode from 'jwt-decode';
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING,
	STOP_LOADING,
	CLEAR_ERROR,
	CLEAR_ERRORS
} from './types';

// import Logger from '../Logger';
// const logger = new Logger('Auth-Actions');

// Set logged in user

export function setCurrentUser(decoded)
{
	return {
		type    : SET_CURRENT_USER,
		payload : decoded
	};
}

// Register User
export const registerUser = (userData, history) => (dispatch) =>
{
	axios
		.post('/api/users/register', userData)
		.then(() =>
		{
			history.push('/login');
			dispatch({
				type : STOP_LOADING
			});
		}) // re-direct to login on successful register
		.catch((err) =>
		{
			if (typeof err.response.data === 'string')
			{
				dispatch({
					type    : GET_ERRORS,
					payload : { generalError: 'Server Error!' }
				});
			}
			else
			{
				dispatch({
					type    : GET_ERRORS,
					payload : err.response.data
				});
			}
		}
		);
};

// Login - get user token
export const loginUser = (userData) => (dispatch) =>
{

	axios
		.post('/api/users/login', userData)
		.then((res) =>
		{
			// Save to localStorage// Set token to localStorage
			const { token } = res.data;

			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwtDecode(token);
			// Set current user

			dispatch(setCurrentUser(decoded));
			location.reload();
		})
		.catch((err) =>
		{
			if (typeof err.response.data === 'string')
			{
				dispatch({
					type    : GET_ERRORS,
					payload : { generalError: 'Server Error!' }
				});
			}
			else
			{
				dispatch({
					type    : GET_ERRORS,
					payload : err.response.data
				});
			}
		});
};

// User loading
export const setUserLoading = () =>
{
	return {
		type : USER_LOADING
	};
};

// Log user out
export const logoutUser = () => (dispatch) =>
{
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};

// Clear errors
export const clearError = (errorKey) =>
{
	return {
		type    : CLEAR_ERROR,
		payload : errorKey
	};
};

// Clear errors
export const clearErrors = () =>
{
	return {
		type : CLEAR_ERRORS
	};
};
