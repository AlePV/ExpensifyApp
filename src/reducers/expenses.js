////////// EXPENSES REDUCER STARTS //////////
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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