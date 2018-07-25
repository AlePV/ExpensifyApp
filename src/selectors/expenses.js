import moment from "moment";


////////// GET VISIBLE EXPENSES STARTS //////////
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true ;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true ;
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


// To compare two dates --> go to QUERY section in the ***web 
// Need to chqnge the >= or <= because we are no longer using numbers, instead we are using moment

// --> 1: check if there is a start date
// --> 2: if there is no start date, the "startDayMatch" will always return true --> which will not filter
// --> 3: if there is a start date, check if it is the same or before the createdAt value 
// '--> created a new moment to save the createdAt moment
// '--> also provided a string to put the unit: to check if it is the same year, month, day, etc.