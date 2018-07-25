import React from "react";
import {shallow} from "enzyme";
import {ExpenseList} from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

// Expects the expenses prop --> expenses = {expenses}
//                                          ^^^^^^^^^^ this is the expenses dummy data

test("should render ExpenseList with expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});

// First time Snapshot is called, it never fails --> it creates a new Shanpshot file

test("should render ExpenseList with empty message", () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
});