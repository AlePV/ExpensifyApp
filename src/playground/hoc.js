// HOC means Higher Order Component -- component (HOC) that renders another component (1,2,3...) 

/* Allows to:
- reuse code
- render hijacking
- prop manipulation
- abstract state
*/

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p> The info is: {props.info}</p> 
    </div>
);



////////// HOC COMPONENT STARTS //////////
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p> This is private info</p>}
            <WrappedComponent  {...props} /> 
        </div>
    ); // used ...props -- to pass props to their children
};

const AdminInfo = withAdminWarning(Info);
// Will have access to redux store
////////// HOC COMPONENT ENDS //////////


const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Not authenticated</p>}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info = "Here are the details" />, document.getElementById("app"));
// ReactDOM.render(<AdminInfo isAdmin={false} info = "Here are the details" />, document.getElementById("app"));


// regular arrow function () => {};
// component arrow function () => ();