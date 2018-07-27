import uuid from "uuid";
import database from "../firebase/firebase";

// HOW IT WORKS
// --> component calls action generator (someone clicks a button that does an action, ex: add)
// --> action generator returns object
// --> component dispatches object
// --> redux store changes

// BUT -----> WITH ASYNCHRONOUS FUNCTIONS
// --> component calls action generator
// --> action generator returns function
// --> component dispatches function (?) --> redux needs module to do this (by default it doesn't let you dispatch a function)
// --> function runs --> has the ability to dispatch other actions and do whatever it wants
//                  '--> firebase code --> use firebase push to add something to the database
//                  '--> then, have the ability to dispatch another action 
//                               '--> a standard one that returns an object & that it will manipulate the redux store

////////// ADD EXPENSE STARTS //////////
export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});
////////// ADD EXPENSE ENDS //////////
// This action generator takes an object with those four properties 
//Takes in expense (no defaults) --> pass it through


////////// START ADD EXPENSE STARTS ////////// ---------------> ASYNCHRONOUS FUNC

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        return database.ref("expenses").push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// Function gets called internally by redux & gets called with "DISPATCH"
// (DISPATCH) --> gives access to dispatch, so I can use it inside the func (after whatever it is I'm doing)
//           '--> Fired at last --> after some code
// 1 --> write some data to firebase, waiting for that data to correctly sync
// 2 --> then use dispatch, to dispatch addExpense
// 3 --> making sure redux store reflects those changes as well
// (EXPENSE_DATA = {}) --> get some expense data, and if I don't --> set it equal to an empty object 
//                    '--> destructures the defaults
// .PUSH --> saves data to firebase
// .then ( dispatch ) --> dispatch action so the redux store changes

////////// START ADD EXPENSE ENDS ////////// <--------------- ASYNCHRONOUS FUNC



////////// REMOVE EXPENSE STARTS //////////
export const removeExpense = ({id} = {}) => 
    ({
        type: "REMOVE_EXPENSE",
        id

});
////////// REMOVE EXPENSE ENDS //////////



////////// EDIT EXPENSE STARTS //////////
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});
////////// EDIT EXPENSE ENDS //////////



////////// SET EXPENSES STARTS //////////
// -----> Changes REDUX STORE
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});
// Gets array from firebase and sets it


// -----> ASYNCHRONOUS ACTION --> fetches data from firebase
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref("expenses").once("value").then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };
};

// 1 --> Fetches all data once
// 2 --> Parse that data into an array
// 3 --> Dispatch SET_EXPENSES --> get expenses in the redux store

////////// SET EXPENSES ENDS //////////