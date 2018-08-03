import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__container">
                <Link className="header__title" to="/dashboard">
                <h1>Expensify</h1>
                </Link>
                <button  className="login-button login-button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

// for the bold letters --> shows where you are
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);

// Create private state for user data --> Private Firebase Data
// '--> Change the firebase rules
// '--> user/userUid/expenses/idOfExpense