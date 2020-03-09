const initialState = [];

import { Questions } from '../types';

const questions = (state = initialState, action) =>
{
	switch (action.type)
	{
		case Questions.RAISE:
		{
			const { peerId } = action.payload;

			return [ ...state.filter((peer) => peer.peerId !== peerId), { peerId, status: 'AWAITING-RESPONSE' } ];
		}

		case Questions.RAISED:
		{
			const { peerId, displayName } = action.payload;

			return [ ...state.filter((peer) => peer.peerId !== peerId), { peerId, displayName, status: 'RAISED' } ];
		}

		case Questions.ACCEPT:
		case Questions.ACCEPTED:
		{
			const { peerId } = action.payload;

			return [ ...state.filter((peer) => peer.peerId !== peerId), { peerId, status: 'ACCEPTED' } ];
		}

		case Questions.REJECT:
		case Questions.REJECTED:
		case Questions.CANCEL:
		case Questions.CANCELLED:
		case Questions.END:
		case Questions.ENDED:
		{
			const { peerId } = action.payload;

			return [ ...state.filter((peer) => peer.peerId !== peerId) ];
		}

		default:
			return state;
	}
};

export default questions;
