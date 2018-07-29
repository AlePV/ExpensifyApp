import React from "react";
import {connect} from "react-redux";
import {startLogin} from "../actions/auth";

export const LoginPage = ({startLogin}) => (

    <div>
        <button onClick={startLogin}>Login</button>
    </div>
       
);

const mapDispatchToProps = (dispatch) => ({
// implicitly return an object
    startLogin: () => dispatch(startLogin())
// startLogin prop dispatches the startLogin action
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
// Component doesn't need access to anything state related  --> NO mapStateToProps
// Since I want to dispatch startLogin --> mapDispatchToProps


// If someone is already logged in --> can view private info without needing to relog in every single time