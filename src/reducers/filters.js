import moment from "moment";

////////// FILTERS REDUCER STARTS //////////
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
};

// Changed the START and END DATE from undefined to the start of the current month to the end of the month 
// '--> This limist the expenses I see for only the month I am in
// START-DATE --> MOMENT().STARTOF("MONTH") 
//                  '--> Alone would be the current moment in time when the line runs
//                              '--> Marks the start date at the start of the month
// CHANGED THIS FILE ONLY TO CHANGE THESE DEFAULTS


export default (state = filtersReducerDefaultState, action) => {
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