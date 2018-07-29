import React from "react";
import {shallow} from "enzyme";
import {LoginPage} from "../../components/LoginPage";

test("should render LoginPage correctly", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on button click", () => {
    const startLogin = jest.fn(); //This is a spy // creates spy
    const wrapper = shallow(<LoginPage startLogin={startLogin} />); // pass it in to LoginPage
    wrapper.find("button").simulate("click"); // clicks the button
    expect(startLogin).toHaveBeenCalled(); // expects the spy to have been called
});