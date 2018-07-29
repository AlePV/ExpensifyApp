// Allows to render components in javascript code and assert something on what got rendered
import React from "react";
import {shallow} from "enzyme";
// import ReactShallowRenderer from "react-test-renderer/shallow";// shallow version does not include user interaction
import {Header} from "../../components/Header";


test("should render Header component correctly", () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();


    // expect(wrapper.find("h1").text()).toBe("Expensify");
    // const renderer = new ReactShallowRenderer;
    // // this creates a new instance of ReactShallowRenderer
    // renderer.render(<Header/>);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});



// returns renderedOutput of the JSX I put in 

// SNAPSHOTS --> allow to track changes to data overtime

// Can pass anything into startLogout --> so passed in an empty arrow function (that does nothing)


test("should call startLogout on button click", () => {
    const startLogout = jest.fn(); //This is a spy
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find("button").simulate("click");
    expect(startLogout).toHaveBeenCalled();
});