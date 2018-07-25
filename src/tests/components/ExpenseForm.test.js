import React from "react";
import {shallow} from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

// Created a mock for the MOMENT library --> bc in the file, in the date, I choose an actual moment in time
// --> but every time I re run it is going to be different, since it is in another moment of time

test("should render ExpenseForm correctly with data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

// fetches the state and makes sure it is not an empty string

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    });
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {
        target: {value}
    });
    expect(wrapper.state("description")).toBe(value);
});
// at(0) is to find the first input --> no need to write at when there is only one value
// .SIMULATE (string with a name (submit, change, click), { object })

test("should set note on textarea change", () => {
    const value = "New note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
        target: {value}
    });
    expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
    const value = "23.50";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: {value}
    });
    expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
    const value = "23.508";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: {value}
    });
    expect(wrapper.state("amount")).toBe("");
});


// TEST SPIES --> mock functions --> fake functions created by Jest, which we can make assertions about them
// Allows to pass it in the component
// Allows to create submissions
// Allows me to check that everything went well

test("should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    // onSubmitSpy("Ale");
    // expect(onSubmitSpy).toHaveBeenCalledWith("Ale");
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    // Simulates form submission:
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    });
    // Assertions, what should have happened:
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test("should set new date on date change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onDateChange")(now);
    expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
    expect(wrapper.state("calendarFocused")).toEqual(focused);
});