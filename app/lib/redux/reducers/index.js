import { combineReducers } from 'redux';
import room from './room';
import me from './me';
import producers from './producers';
import dataProducers from './dataProducers';
import peers from './peers';
import consumers from './consumers';
import dataConsumers from './dataConsumers';
import notifications from './notifications';
import authReducer from './authReducer';
import questions from './questions';
import rooms from './rooms';

const reducers = combineReducers(
	{
		room,
		me,
		producers,
		dataProducers,
		peers,
		consumers,
		dataConsumers,
		notifications,
		auth : authReducer,
		questions,
		rooms
	});

export default reducers;
