import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <ProtectedRoute path="/home" component={Home} />
  </Switch>
);

export default Routes;
