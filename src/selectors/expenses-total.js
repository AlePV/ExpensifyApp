const selectExpensesTotal  = (expenses) => {
    if (expenses.length === 0) {
        return 0
    } else {
        return expenses
            .map((expense) => expense.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
    }
};

export default selectExpensesTotal;

// .MAP --> converts it to an array of numbers
//     '--> calls a func
//     '--> gets called with the individual item
//     '--> returns an array of numbers