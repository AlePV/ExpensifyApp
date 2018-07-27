import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // provides store to all components of our application
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import {startSetExpenses} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./firebase/firebase";

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

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById("app"));
});