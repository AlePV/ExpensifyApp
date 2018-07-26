import ExpenseListItem from "../../components/ExpenseListItem";
import React from "react";
import {shallow} from "enzyme";
import expenses from "../fixtures/expenses";

test("should render ExpenseListItem with expenses", () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});
// .. spreads object, gets it out
// adding all its properties as props in ExpenseListItem



// FOR ACCEPTING CHANGES IN TESTS SNAPSHOTS —> PRESS “u”