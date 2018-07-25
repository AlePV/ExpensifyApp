import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import HelpPage from "../components/HelpPage";
import EditExpensePage from "../components/EditExpensePage";
import AddExpensePage from "../components/AddExpensePage";
import PageNotFound from "../components/PageNotFound";

const AppRouter = () => (
    <BrowserRouter> 
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;

//BrowserRouter only accepts one thing: if you want to add more add a wrapping <div></div>

// Switch goes in order to check which Route the user is calling, and if it finds it, it stops

//Client side server/routing: does not full refresh the complete page, does not go to the server