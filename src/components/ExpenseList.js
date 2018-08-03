import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

// UNCONNECTED
// <h1>ExpenseList</h1> --> I DELETED THIS
export const ExpenseList = (props) => (
    <div className="content-container"> 

    <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
    </div>

    <div className="list-body">
        {
            props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No expenses</span>
                </div>
            ) : (
                props.expenses.map ((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense}/>
                })
            )
        }
    </div>

    </div>
    //                            ^^^ always need to put key by default
    //                                               ^^^ I spread expense, so I can have access to any of the characteristics it has inside
    //              ^^^^ .map returns to screen each individual item of an array :: needs an instance of it, which is store in "ExpenseListItem"
    // {props.filters.text}
);

// info that we want our component to access from the store -- & first the store state

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
        // Instead of writing the below info, write this ^^^^ which passes the visibleExpenses 
        // func (so I only see the ones I have stated before), which is sorted and filtered
        // expenses: state.expenses,
        // filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseList);

// THIS SYNTAX IS NOT THAT COMMON
/*
const ConnectedExpenseList = connect((state) => {
    return {
        expenses: state.expenses
    };
})(ExpenseList);

export default ConnectedExpenseList;
*/ 


// maps store state to component props