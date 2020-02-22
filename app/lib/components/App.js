import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import Room from './Room';
import Landing from './Landing';

const App = () =>
{

	return (
		<Router>
			<div className='app'>
				<Route exact path='/' component={Landing} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/room' component={Room}/>
			</div>
		</Router>
	);
};

export default App;
