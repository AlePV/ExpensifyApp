import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";

export const Header = ({startLogout}) => (
    <header>
        <h1>Expensify</h1>
            <p> <NavLink to="/dashboard" activeClassName="isActive">Home</NavLink> </p>
            <p> <NavLink to="/create" activeClassName="isActive">Add Expense</NavLink> </p>
            <button onClick={startLogout}>Logout</button>
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