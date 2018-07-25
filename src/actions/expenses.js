import uuid from "uuid";



////////// ADD EXPENSE STARTS //////////
export const addExpense = (
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
// This action generator takes an object with those four properties 


////////// REMOVE EXPENSE STARTS //////////
export const removeExpense = ({id} = {}) => 
    ({
        type: "REMOVE_EXPENSE",
        id

});
////////// REMOVE EXPENSE ENDS //////////



////////// EDIT EXPENSE STARTS //////////
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});
////////// EDIT EXPENSE ENDS //////////
