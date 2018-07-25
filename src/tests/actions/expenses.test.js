import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

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
    const expenseData = {
        description: "Rent",
        amount: 109500,
        createdAt: 1000,
        note: "New rent bill"
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

// EXPECT.ANY(TYPE) --> Says it expects something from a certain type but not a specific value


// --> Makes sure default values get set up correctly if no value is passed in
test ("should setup add expense action object with default values", () => {
    expect(addExpense()).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: "",
            note: "",
            amount: 0,
            createdAt: 0
        }
    })
})