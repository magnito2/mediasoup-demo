import { Admin } from '../types';

const isEmpty = require('is-empty');
const initialState = {
	users     : [],
	loading   : false,
	hideModal : {}
};

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case Admin.ALLUSERS:
			return {
				...state,
				users   : action.payload,
				loading : false
			};
		case Admin.CREATEUSER:
			return {
				...state,
				users   : [ ...state.users, action.payload ],
				loading : false
			};

		case Admin.UPDATEUSER:
			return {
				...state,
				users :
          [ ...state.users.filter((u) => u.id !== action.payload.id), action.payload ],
				loading   : false,
				hideModal : { id: action.payload.id }
			};
		case Admin.DELETEUSER:
			return {
				...state,
				users :
          [ ...state.users.filter((u) => u.id !== action.payload.id) ],
				loading   : false,
				hideModal : { id: action.payload.id }
			};
		case Admin.MODALHIDDEN:
			return {
				...state,
				hideModal : {}
			};
		default:
			return state;
	}
}
