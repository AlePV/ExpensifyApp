import expenses from "../fixtures/expenses";
import expensesReducer from "../../reducers/expenses";

test("should set default state", () => {
    const state = expensesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    }; // these are the two params
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id does not exist", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
// referenced the complete expenses array (bc it was unchanged)

test("should add an expense", () => {
    const action = {
        type: "ADD_EXPENSE",
        expense: {
            id: "4",
            description: "T-shirt",
            note: "",
            amount: 5000,
            createdAt: 1000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates: {amount: 122000}
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(122000);
});

test("should not edit an expense with a different id", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: "-5",
        updates: {amount: 122000}
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// Testing reducers / funcs & components is different
// Test COMPONENTS DIFFERENTLY

test("should set expenses", () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});