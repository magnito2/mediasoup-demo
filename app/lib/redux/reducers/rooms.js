import { Rooms as RoomsConstants } from '../types';
import Logger from '../../Logger';

const logger = new Logger('rooms');

const initialState = [];

const rooms = (state = initialState, action) =>
{
	switch (action.type)
	{
		case RoomsConstants.GETALL:
		{
			logger.debug('Our rooms are %o', action.payload);
			const roomslist = action.payload;

			return roomslist;
		}

		case RoomsConstants.ADDONE:
		{
			const { room } = action.payload;

			return [ ...state, room ];
		}

		case RoomsConstants.REMOVEONE:
		{
			const { roomId } = action.payload;
			const newRooms = state.filter((room) => room.id !== roomId);

			return newRooms;
		}

		case RoomsConstants.REMOVEALL:
		{
			return [];
		}

		default:
			return state;
	}
};

export default rooms;
