// Store the USER.UID in redux store --> to keep track of whether the user is or is not logged in


export default (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                uid: action.uid
            };
        
        case "LOGOUT":
            return {};

        default:
            return state;
    }
};

// Handles two things: 
// --> One for logging in
// --> One for logging out

// Provide a default STATE --> set it up as an object 
//                        '--> add a property inside it when the user is logged in
//                        '--> wipe it back to an empty object when the user logs out
// Why not store the user's id as the state ? --> store it on a property in case I want to store other things later on
// ACTION --> action that is getting dispatched
// Whan I pass in LOGIN I have to pass the uid along so I can set something
// SWITCH () --> switch from cases depending on the action type