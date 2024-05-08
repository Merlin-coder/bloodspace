import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//local imports
import PrivateRoute from './PrivateRoute';
import LoginPage from '../Layout/auth/login/index';
import Dashboard from '../Layout/app';
import RemoteLoginPage from '../Layout/auth/remotelogin/remote-login';
import ConfigPage from '../Layout/auth/config/configpage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/remotelogin" component={RemoteLoginPage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/*" component={ConfigPage} />
        </Switch>
    );
};

export default Routes;
