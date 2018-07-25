// Just renders the component without props
// and creates a snapshot

import React from "react";
import {shallow} from "enzyme";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("should render ExpenseDashboardPage", () => {
    const wrapper = shallow(<ExpenseDashboardPage/>);
    expect(wrapper).toMatchSnapshot();
});