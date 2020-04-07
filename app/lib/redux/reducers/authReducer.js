import {
	SET_CURRENT_USER,
	USER_LOADING,
	GET_ERRORS,
	STOP_LOADING,
	CLEAR_ERRORS
} from '../types';

const isEmpty = require('is-empty');
const initialState = {
	isAuthenticated : false,
	user            : {},
	loading         : false
};

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated : !isEmpty(action.payload),
				user            : action.payload,
				loading         : false
			};
		case USER_LOADING:
			return {
				...state,
				loading : true
			};

		case STOP_LOADING:
			return {
				...state,
				loading : false
			};
		case GET_ERRORS:
			return {
				...state,
				loading : false
			};
		default:
			return state;
	}

}
