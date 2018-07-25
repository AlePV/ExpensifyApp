////////// SET TEXT FILTER STARTS //////////
export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});
////////// SET TEXT FILTER ENDS //////////



////////// SORT BY DATE FILTER STARTS //////////
export const sortByDate = () => ({ 
    type: "SORT_BY_DATE"
});
////////// SORT BY DATE FILTER ENDS //////////



////////// SORT BY AMOUNT FILTER STARTS //////////
export const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});
////////// SORT BY AMOUNT FILTER ENDS //////////



////////// SET START DATE FILTER STARTS //////////
export const setStartDate = (startDate = undefined) => ({
    type: "SET_START_DATE",
    startDate
});
////////// SET START DATE FILTER ENDS //////////



////////// SET END DATE FILTER STARTS //////////
export const setEndDate = (endDate = undefined) => ({
    type: "SET_END_DATE",
    endDate
});
////////// SET END DATE FILTER ENDS //////////