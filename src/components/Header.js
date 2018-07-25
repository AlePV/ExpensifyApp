import React from "react";
import {NavLink} from "react-router-dom";


const Header = () => (
    <header>
        <h1>Expensify</h1>
            <p> <NavLink to="/" activeClassName="isActive" exact={true}>Home</NavLink> </p>
            <p> <NavLink to="/create" activeClassName="isActive">Add Expense</NavLink> </p>
            <p> <NavLink to="/help" activeClassName="isActive">Help</NavLink> </p>
    </header>
);

export default Header;