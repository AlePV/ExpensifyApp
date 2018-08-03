import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// used de-structuring to grab all the props \\//\\//
const ExpenseListItem = ({id, description, amount, createdAt}) => (
    
    <Link className="list-item" to={`/edit/${id}`} >

        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
        </div>

        <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")}</h3>

    </Link>
    
);

// on click we want to dispatch an action

export default ExpenseListItem;

// <Link to={`/edit/${id}`}>
//             '--> Not a static string because I want to inject the id value **REMEMBER the url of the edit expense page is /edit/id (some number)
//             '--> It is a template string with a javascript expression


// PUT EVERYTHING INSIDE THE LINK SECTION SO EVERYTHING I CAN CLICK

/*
The HTML <span> element is a generic inline container for phrasing content, 
which does not inherently represent anything. It can be used to group elements 
for styling purposes (using the class or id attributes), or because they share 
attribute values, such as lang. It should be used only when no other semantic element 
is appropriate. <span> is very much like a <div> element, but <div> is a block-level 
element whereas a <span> is an inline element.
*/