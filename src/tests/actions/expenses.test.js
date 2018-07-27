import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {startAddExpense, addExpense, editExpense, removeExpense} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
// Ceated the configuration so all the tests can create it with the same characteristics
// Need to create a mock/fake store to test the new things I changed (in the addExpense file) --> startAddExpense
// To test that things are added to the database of firebase and that they change the redux store



// To go out of a folder --> ../
// TOEQUAL --> checls that the properties inside of a {} or an [] are the same 
//        '--> because {} === {} is always going to be false

// ---------------------------> REMOVE EXPENSE TEST <---------------------------
test ("should setup remove expense action object", () => {
    const action = removeExpense({id : "123456"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123456"
    })
})

// TEST (" what the func should do ", () => { arrow func to give an example})


// ---------------------------> EDIT EXPENSE TEST <---------------------------
test ("should setup edit expense action object", () => {
    const action = editExpense("123456", {note: "New note"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123456",
        updates: {note: "New note"}
    })
})


// ---------------------------> ADD EXPENSE TEST <---------------------------

// --> Makes sure values get used
test ("should setup add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

// EXPECT.ANY(TYPE) --> Says it expects something from a certain type but not a specific value


// --> Makes sure default values get set up correctly if no value is passed in
// test ("should setup add expense action object with default values", () => {
//     expect(addExpense()).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             id: expect.any(String),
//             description: "",
//             note: "",
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })


// ---------------------------> ASYNCHRONOUS FUNCS TEST <---------------------------

test("should add expense to database and store", (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: "",
        amount: 0,
        note: "",
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});
// Default data of store --> empty object
// StartAddExpense takes in description, amount, note and createdAt --> to make things easier, created a const expenseData (with those 4 properties)
//                                                                 '--> just for testing purposes
// Test is only considered to be a success or a failure only after DONE is called 
// ^^^ Way to tell Jest that it is an asynchronous test 
// Asynchronous because I need to wait to see if changes were made to the firebase database to then perform an action (.then call)
// PROMISE CHAINING --> allows to attach .THEN() calls on to promises from elsewhere in my code

// .GET_ACTIONS --> gets all the actions that were dispatched to the store
// Used the database to test --> to make sure the data was stored and stored in the correct place


// --> USES DEFAULTS
test("should add expense with defaults to database and store", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "skirt",
        amount: 5000,
        note: "use it for school",
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});