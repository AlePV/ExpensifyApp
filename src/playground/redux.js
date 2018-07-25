import {createStore} from "redux";

// Previous setState syntax -----
// this.setState((prevState) => {
//     return prevState;
// })

////////////////////////////////// {count: 0} == this is the default state object


// ACTION GENERATORS = functions that return action objects

// use the payload = {} , so if I don't type anything it doesn't return an error (because it would be undefined)
const incrementCount = ({incrementBy = 1} = {}) => {
    return {
        type: "INCREMENT",
        incrementBy: incrementBy 
    };
}

const decrementCount = ({decrementBy = 1} = {}) => {
    return {
        type: "DECREMENT",
        decrementBy
    };
}

const resetCount = () => {
    return {
        type: "RESET"
    };
}

const setCount = ({count}) => {
    return {
        type: "SET",
        count: count
    };
}

// BEFORE DESTRUCTURING the function was:
/* const incrementCount = (payload = {}) => {
        return {
            type: "INCREMENT",
            incrementBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
        }
} */



////////// REDUCER STARTS //////////

/* REDUCER:
    Pure functions (only do things with inputs of the function, doesn't include global variables)
    - Only uses STATE and ACTION
    Never modify state or action 
*/
const countReducer = (state = {count: 0}, action) => {
    
    switch (action.type) {
        
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };

        case "SET":
            return {
                count: action.count
            };

        case "RESET":
            return {
                count: 0
            };

        default:
        return state;

    }

}
////////// REDUCER ENDS //////////

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});
// This watches for changes // Does whatever is inside when the state changes

////////// ACTION CALLS START //////////
store.dispatch(incrementCount({incrementBy: 3 }));

store.dispatch(incrementCount());


store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 100}));

unsubscribe();
////////// ACTION CALLS END //////////


// getState() gets the object or value out

// TRACKS CHANGING DATA OVER TIME
// ACTION = object that gets sent to store; describes type of action we want to take; they change the state over time