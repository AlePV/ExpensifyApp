// This adds expenses from the userinterface
// Using the same re-usable component for AddExpense and EditExpense

import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {startAddExpense} from "../actions/expenses";

/* THIS IS THE ORIGINAL COMPONENT
const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense));
                props.history.push("/");
            }}
        /> 
    </div>
);

export default connect()(AddExpensePage);
*/

// ONSUBMIT = { (EXPENSE) => {CONSOLE.LOG(EXPENSE);}} --> The function gets called when the form is submitted with valid data
//                                                   '--> We get the expense object back (with all the properties on it - description, amount, note, createdAt)
//                                            '--> We call "expense" --> make sure to be shown in screen 
//                                            '--> This prints what the user typed

// --------------> This file needs to dispatch the given action to the redux store


// IMPORT {CONNECT} FROM "REACT-REDUX" --> This connects the component to the redux store, so it can dispatch
//                                    '--> Using this means that I have access to props.dispatch
// CONNECT()()
//         '--> I don't need anything from the state (first parenthesis)
//           '--> Pass component (second parenthesis)
// --> Try to dispatch an action
// IMPORT {ADDEXPENSE} --> It is an action generator that I already created
// PROPS.DISPATCH(ADDEXPENSE(EXPENSE)) --> Takes (expense) argument and pass it through

// --> Automate redirect (it doesn't do it without this function)

// PROPS.HISTORY.PUSH("/") --> Func to programarily change pages (automatic re-direct)
//                        '--> Does not go through entire page refresh, switches over using browser routing
//                     '--> Takes only one string: the path



// Ways to return your dispatcher functions, allowing you to abstract them away from the component itself

// NEW COMPONENT TO MAKE IT EASIER TO TEST

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push("/");
    };
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);