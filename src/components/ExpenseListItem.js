import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// used de-structuring to grab all the props \\//\\//
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
    <Link to={`/edit/${id}`} >
        <h3>{description}</h3>
    </Link>
    <p>
        {numeral(amount / 100).format("$0,0.00")} 
            - 
        {moment(createdAt).format("MMMM Do, YYYY")}</p>
    </div>
);

// on click we want to dispatch an action

export default ExpenseListItem;

// <Link to={`/edit/${id}`}>
//             '--> Not a static string because I want to inject the id value **REMEMBER the url of the edit expense page is /edit/id (some number)
//             '--> It is a template string with a javascript expression