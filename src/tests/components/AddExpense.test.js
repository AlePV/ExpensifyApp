// beforeEach --> runs some code before each test case

// Takes SNAPSHOT

import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;

// onSubmit and history are mock functions
beforeEach(() => {
    addExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history = {history}/>)
});

test("should render AddExpense correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});