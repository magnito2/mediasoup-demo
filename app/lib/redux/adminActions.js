import axios from 'axios';
import {
	GET_ERRORS,
	Admin
} from './types';

// Get All Users
export const getUsers = () => (dispatch) =>
{
	axios
		.get('/api/admin/users')
		.then((res) =>
		{
			dispatch({
				type    : Admin.ALLUSERS,
				payload : res.data
			});
		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err.response.data
			})
		);
};

// Create a user
export const createUser = (userData) => (dispatch) =>
{

	axios
		.post('/api/admin/users', userData)
		.then((res) =>
		{
			dispatch({
				type    : Admin.CREATEUSER,
				payload : res.data
			});

		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err.response.data
			})
		);
};

// Update a user
export const updateUser = (userData) => (dispatch) =>
{

	axios
		.put('/api/admin/users', userData)
		.then((res) =>
		{
			dispatch({
				type    : Admin.UPDATEUSER,
				payload : res.data
			});

		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err.response.data
			})
		);
};

// Delete a user
export const deleteUser = (userId) => (dispatch) =>
{
	axios
		.delete('/api/admin/users', { data: { userId } })
		.then((res) =>
		{
			dispatch({
				type    : Admin.DELETEUSER,
				payload : res.data
			});

		})
		.catch((err) =>
			dispatch({
				type    : GET_ERRORS,
				payload : err.response.data
			})
		);
};

// Modal modalHidden
export const modalHidden = () => (dispatch) =>
{
	dispatch({
		type : Admin.MODALHIDDEN
	});
};
