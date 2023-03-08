import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, user, ...rest }) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
}
const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ProtectedRoute);
