import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
// All of the test cases filter the expenses, so I created dummy data to use in these test cases:




// TEXT FILTER
test ("should filter by text value", () => {
    const filters = {
        text: "e",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});
// I only wrote {text: "e"}, the other three are the default values
// PASSED --> with the filters "E" and SORT-BY-DATE 
// '--> the third expense from the array, the credit card = expenses[2] is first
// '--> the second expense from the array, the rent = expenses[1] is second
// '--> the first array should not show, gum = expenses[0] because gum does not con tain the letter "E"



// START DATE FILTER
test ("should filter by start date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

// 1st --> pass filters in
// 2nd --> pass it in, (do the result const)
// 3rd --> make assertion (expect().toEqual())
// VALUE OF --> Gets the timestamp back (changes moment to a number)

// END DATE
test ("should filter by end date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(0).add(2, "days")
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]])
});

// filters out items created 2 days after moment(0)
// FILTERS BY ELIMINATING THE THIRD OBJECT, AND JUST PUTTING THE OTHER TWO IN THE ORDER IN WHICH THEY ARE



// SORT BY DATE 
test ("should sort by date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
});
// SORTS BY PUTTING THE MOST RECENT DAY FIRST, THEN THE SECOND MOST RECENT, THEN THE LAST ONE


// SORT BY AMOUNT
test ("should sort by amount", () => {
    const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
// SORTS BY PUTTING THE HIGHEST AMOUNT FIRST, THEN THE SECOND HIGHEST, THEN THE LOWEST

//     const result = selectExpenses(expenses, filters) --> means it calls the function SELECT-EXPENSES (Which is the big default func of the selectors expenses file)
// and takes the dummy expenses and filters I created in this file to do the test