import { Rooms as RoomsConstants } from './types';
import axios from 'axios';
import * as requestActions from './requestActions';
import Logger from '../Logger';

const logger = new Logger('roomsActions');

export const roomsGetAll = () => (dispatch) =>
{
	axios.get('/api/rooms')
		.then((res) =>
		{
			logger.debug('rooms!!, %o', res.data);

			dispatch({
				type    : RoomsConstants.GETALL,
				payload : res.data
			});
		})
		.catch((err) =>
		{
			dispatch(requestActions.notify(
				{
					type : 'error',
					text : err.response
				}));
		});
};

export const changeName = (name) => (dispatch) =>
{
	axios.post('/api/rooms/name', name)
		.then((res) =>
		{
			dispatch(requestActions.notify(
				{
					text : res.data
				}));
		})
		.catch((err) =>
		{
			dispatch(requestActions.notify(
				{
					type : 'error',
					text : err.response
				}));
		});
};

export const roomsAddOne = (data) =>
{
	return {
		type    : RoomsConstants.ADDONE,
		payload : data
	};
};

export const roomsRemoveOne = (data) =>
{
	return {
		type    : RoomsConstants.REMOVEONE,
		payload : data
	};
};

export const roomsRemoveAll = () =>
{
	return {
		type : RoomsConstants.REMOVEALL
	};
};
