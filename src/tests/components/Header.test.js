// Allows to render components in javascript code and assert something on what got rendered
import React from "react";
import {shallow} from "enzyme";
// import ReactShallowRenderer from "react-test-renderer/shallow";// shallow version does not include user interaction
import Header from "../../components/Header";


test("should render Header component correctly", () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();


    // expect(wrapper.find("h1").text()).toBe("Expensify");
    // const renderer = new ReactShallowRenderer;
    // // this creates a new instance of ReactShallowRenderer
    // renderer.render(<Header/>);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});



// returns renderedOutput of the JSX I put in 

// SNAPSHOTS --> allow to track changes to data overtime