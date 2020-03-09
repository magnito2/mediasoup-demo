import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from '../utils';
import { setCurrentUser, logoutUser } from '../redux/authActions';
import store from '../redux/store';

import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout';
import Room from './Room';
import Landing from './Landing';
import Home from './Home';
import PrivateRoute from './auth/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken)
{
	// Set auth token header auth
	const token = localStorage.jwtToken;

	setAuthToken(token);

	// Decode token and get user info and exp
	const decoded = jwtDecode(token);

	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds

	if (decoded.exp < currentTime)
	{
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = './login';
	}
}

const App = () =>
{

	return (
		<Router>
			<div data-component='App'>
				<Route exact path='/' component={Landing} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Switch>
					<PrivateRoute exact path='/home' component={Home}/>
					<PrivateRoute exact path='/room' component={Room}/>
					<PrivateRoute exact path='/logout' component={Logout}/>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
