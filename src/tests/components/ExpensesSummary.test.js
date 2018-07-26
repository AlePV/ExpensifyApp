import React from "react";
import {shallow} from "enzyme";
import {ExpensesSummary} from "../../components/ExpensesSummary";

test("should render correctly ExpensesSummary with 1 expense", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={500}/>);
    expect(wrapper).toMatchSnapshot();
});

test("should render correctly ExpensesSummary with 2 expenses", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={5000}/>);
    expect(wrapper).toMatchSnapshot();
});