import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // provides store to all components of our application
import AppRouter, {history} from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import {startSetExpenses} from "./actions/expenses";
import {login, logout} from "./actions/auth";
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import {firebase} from "./firebase/firebase";

const store = configureStore();

// store.dispatch(addExpense({description: "Water bill", amount: 4500, createdAt: 0}));
// store.dispatch(addExpense({description: "Gas bill", amount: 0, createdAt: 1000}));
// store.dispatch(addExpense({description: "Rent", amount: 109500, createdAt: 0}));


// store.dispatch(setTextFilter("bill"));
// setTimeout(() => {
//     store.dispatch(setTextFilter("water"));
// }, 3000); // after 3 secs, call this function

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));


let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};
// To render only a single time

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });

        if(history.location.pathname === "/") {   // if user is in the login page
            history.push("/dashboard");            // --> redirect them to the dashboard
        }
    } else {
        // console.log("User logged out");
        store.dispatch(logout());
        renderApp();
        history.push("/");
        // render application --> then redirect to login page
    }
}); // DEFINES WHAT WE DO WHEN WE LOG IN & OUT
// Redirect to dahsboard when logged in & fetch the expenses
// Runs callback function when the authentication state is changed
// if there is a user (which means the user is logged in), else (which means the user logged out)
// Dif. beacuse other components are registered to a route
// Get history API outside of the context of a component --> make changes to appRouter
// Use HISTORY --> allws to navigate users between pages
// HISTORY.PUSH("/") --> push takes the path you are trying to go to --> in this case the login page
//                  '--> Navigates users between pages
// HISTORY.LOCATION --> stores current location
// LOGIN & LOGOUT FUNCS have to be inside of the onAuthStateChanged --> 
// '--> bc if they were to be dispatched by startLogin & startLogout they would be only called when the user explicitly asks or enters somewhere
// '--> need to be inside bc this function is called when the user FIRST LOGGED IN