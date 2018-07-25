// Just renders the component without props
// and creates a snapshot

import React from "react";
import {shallow} from "enzyme";
import PageNotFound from "../../components/PageNotFound";

test("should render PageNotFound", () => {
    const wrapper = shallow(<PageNotFound />);
    expect(wrapper).toMatchSnapshot();
});