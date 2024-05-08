import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//local imports
import PrivateRoute from './PrivateRoute';
import LoginPage from '../Layout/auth/login/index';
import Dashboard from '../Layout/app';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/*" component={LoginPage} />
        </Switch>
    );
};

export default Routes;
