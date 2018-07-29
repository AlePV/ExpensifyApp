import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest 
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )} />
);
// renamed component with cap C because later I'm going to render it
// When destructuring objects --> use rest operator to get a variable called rest with all the things I didn't destructure
// ...rest --> gives me access to all the other stuff

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});
// bc I need to grab some values --> check if user is authenticated
// If UID exists --> I know the user is authenticated
// used !! to switch to boolean values (instead of strings or whatever value they were as)

export default connect(mapStateToProps)(PublicRoute);