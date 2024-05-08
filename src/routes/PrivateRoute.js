import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useSelector((state) => state.isLoggedIn);

    return <Route render={(props) => (isLoggedIn ? <Component {...props} {...rest} /> : <Redirect to="/login" />)} />;
};
export default PrivateRoute;

PrivateRoute.propTypes = {
    component: PropTypes.any
};
