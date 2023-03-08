import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function PrivateRoute({ component: Component, authToken, ...rest }) {
    const decoded = jwt_decode(authToken);
    return (
        <Route
            {...rest}
            render={(props) =>
                authToken && decoded.isAdmin ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}
const mapStateToProps = (state) => ({
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(PrivateRoute);
