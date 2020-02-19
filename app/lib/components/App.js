import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import Room from './Room';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={Room} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  )
}
