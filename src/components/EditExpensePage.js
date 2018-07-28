// Using the same re-usable component for AddExpense and EditExpense


import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {startEditExpense, startRemoveExpense} from "../actions/expenses"; 

// ORIGINAL FILE -----> BEFORE CHANGING IT TO TEST IT EASIER
/*
const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
            <ExpenseForm 
                expense = {props.expense}
                onSubmit = {(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push("/");
                }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.expense.id}));
                props.history.push("/");
            } }>Remove</button>
        </div>
    );
};


const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};


export default connect(mapStateToProps)(EditExpensePage);
*/

// DIFFERENCE BETWEEN ADDEXPENSE & EDITEXPENSE --> AddExpense uses empty defaults
//                                            '--> EditExpense needs current values for an expense
//                                                 '--> So,to change this I need a single prop that gets passed to ExpenseForm
//                                                 '--> Conditional because if it doesn't exist, not entered by the user, I will stay with the default



// -----------------------------------> MAP-STATE-TO-PROPS NOTES <-----------------------------------
// CONST MAP-STATE-TO-PROPS = (STATE, PROPS) => { RETURN {EXPENSE} } 
//                                       '--> I want to be able to give the component the current expense object --> because it will EDIT it
//                               '--> STATE is where the expenses array lives
//                               '--> I'm searching for an expenses array whose an id matches this props.match.params.id
//                                    '--> I have access to it with the (props)
//                                    '--> Now, id is equal to the URL ID
//                               '--> Added one new prop: expense --> uses current props to search the expenses array
//                               '--> FIND ((EXPENSE) => {RETURN TRUE})
//                                        '--> allows us to search through an array looking for a single item
//                                        '--> We determine whether or not we found the correct item by returning TRUE from the callback
//                                        '--> Calls a function --> gets the individual item (expense)
//                                        '--> RETURN TRUE --> the first item it searches through will be considered a match (& that expense would get passed in here)
//                                                        '--> IF I return FALSE it would never find a match
//                                        EXPENSE.ID === PROPS.MATCH.PARAMS.ID --> Checks if the expense's id are equal, if they are, then we have a match 
//                                                                            '--> want to take that object and put it on the new prop EXPENSE



// React Router renders our Higher Order Component (HOC) --> The HOC passes the props through and allows us to add new ones

// Render ExpenseForm in the EditExpensePage --> ExpenseForm takes in a prop : OnSubmit
//                                          '--> Populate the fields with their existing values --> To do this: take expense and pass it down
//                                          '--> Define a new prop, an existing expense that we have to access to with {props.expense}

// EditExpensePage
// Editing the expense with the id of {props.match.params.id}
// Want to only use defaults if no expense was passed down
// If an expense is passed down, start & use those values



// -----------------------------------> PROPS.DISPATCH(EDIT-EXPENSE()) NOTES <-----------------------------------
// PROPS.DISPATCH(EDIT-EXPENSE(PROPS.EXPENSE.ID, EXPENSE))
//          '--> To call an already created action, need to starts with props.dispatch
//                     '--> Edit expense action takes two parameters: id and updates
//                                     '--> ID --> is stored in props.expense.id
//                                     '--> EXPENSE --> the updates are stored in the first argument (from above) 
//                                                 '--> because for the EditExpense page I stored the updates in a new prop called expense
//                                                 '--> It was stored in EXPENSE = {PROPS.EXPENSE}

// The param tries to get an id from an id variable (but we don't have it)
// '--> I changed this to ID: PROPS.EXPENSE.ID (which we have)


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };

    onRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push("/");
    };
    render() {
        return (
            <div>
            <ExpenseForm 
            expense = {this.props.expense}
            onSubmit = {this.onSubmit}
            />
            <button 
                onClick={this.onRemove}>Remove</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        startEditExpense: (expense, id) => dispatch(startEditExpense(expense, id)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);