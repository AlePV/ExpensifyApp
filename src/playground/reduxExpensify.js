import {createStore, combineReducers} from "redux";
import uuid from "uuid";

// ({}) means that it implicitly returns an object



////////////////////////////// ACTIONS START //////////////////////////////


////////// ADD EXPENSE STARTS //////////
const addExpense = (
    /// parameters (set to defaults)
    {
        description = "",
        note = "",
        amount = 0,
        createdAt = 0
    } = {}
) => 
    /// calls the parameters
    ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
////////// ADD EXPENSE ENDS //////////



////////// REMOVE EXPENSE STARTS //////////
const removeExpense = ({id} = {}) => 
    ({
        type: "REMOVE_EXPENSE",
        id

});
////////// REMOVE EXPENSE ENDS //////////



////////// EDIT EXPENSE STARTS //////////
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

////////// EDIT EXPENSE ENDS //////////



////////// SET TEXT FILTER STARTS //////////
const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});
////////// SET TEXT FILTER ENDS //////////



////////// SORT BY DATE FILTER STARTS //////////
const sortByDate = () => ({ 
    type: "SORT_BY_DATE"
});
////////// SORT BY DATE FILTER ENDS //////////



////////// SORT BY AMOUNT FILTER STARTS //////////
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});
////////// SORT BY AMOUNT FILTER ENDS //////////



////////// SET START DATE FILTER STARTS //////////
const setStartDate = (startDate = undefined) => ({
    type: "SET_START_DATE",
    startDate
});
////////// SET START DATE FILTER ENDS //////////



////////// SET END DATE FILTER STARTS //////////
const setEndDate = (endDate = undefined) => ({
    type: "SET_END_DATE",
    endDate
});
////////// SET END DATE FILTER ENDS //////////


////////////////////////////// ACTIONS END //////////////////////////////



////////////////////////////// REDUCERS START //////////////////////////////

////////// EXPENSES REDUCER STARTS //////////
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        
        case "ADD_EXPENSE":
            return [
            ...state, //this is the original array -> which is set to []
            action.expense
            ];
        
        case "REMOVE_EXPENSE": 
            return state.filter(({id}) => {
                return id !== action.id;
            });
        
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return{
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        
        default:
            return state;
    }
};
////////// EXPENSES REDUCER ENDS //////////



////////// FILTERS REDUCER STARTS //////////
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
           return {
               ...state, // grabs value of current filter object
               text: action.text
           }

        case "SORT_BY_DATE":
           return {
               ...state, // grabs all the old values of the filters array
               sortBy: "date"
           }

        case "SORT_BY_AMOUNT":
           return {
               ...state,
               sortBy: "amount"
           }

        case "SET_START_DATE": 
            return {
                ...state,
                startDate: action.startDate
            }

        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }

        default:
        return state;
    }
};
////////// FILTERS REDUCER ENDS //////////

////////////////////////////// REDUCERS  END //////////////////////////////



/* TIMESTAMPS -- lets store tiezone independent time data
    January 1st, 1970 (unix epoch)
    timestamps start from that day
    in MILISECONDS 
*/

////////// GET VISIBLE EXPENSES STARTS //////////
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense .description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1; // most recent expense comes first
        } else if (sortBy === "amount") {
            return a.amount > b.amount ? -1 : 1;
        }
    });
};
////////// GET VISIBLE EXPENSES ENDS //////////



////////// STORE CREATION STARTS //////////
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// To track changes:
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: "Rent", amount: 100, createdAt: -1000})); 
const expenseTwo = store.dispatch(addExpense({description: "Coffee", amount: 200, createdAt: 1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter( "rent" ));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate());
 store.dispatch(sortByAmount()); // sort by property should get set equal to -- date or amount

// store.dispatch(setStartDate(200));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(300));


////////// STORE CREATION ENDS //////////



const demoState = {
    expenses: [{
        id: "Here goes the id",
        description: "Here goes the description",
        note: "Here goes the note",
        amount: 50000, // this is in pennies: just add two ceros at the end
        createdAt: 0
    }],

    filters : {
        text: "Filter by text",
        sortBy: "Sort by amount or date",
        startDate: undefined,
        endDate: undefined
    }
};


const user = {
    name: "Ale",
    age: 18
};

console.log({
    // age: 19, if I put it here, it wouldn't override anything -- 18 would show
    ...user, 
    location: "Miami",
    age: 24 // this overrides the previous age
});