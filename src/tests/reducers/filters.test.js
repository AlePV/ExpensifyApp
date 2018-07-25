import moment from "moment";
import filtersReducer from "../../reducers/filters";

// --------------------> TESTS THE FILTERS REDUCER DEFAULT STATE
test ("should setup default filter values", () => {
    const state = filtersReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
});


test("should set sortBy to amount", () => {
    const state = filtersReducer(undefined, {type: "SORT_BY_AMOUNT"});
    expect(state.sortBy).toBe("amount");
});
// Because it receives two params (state, action) --> returns ...state and sortby: "amount"

test("should set sortBy to date", () => {
    const currentState = {
        text: "",
        startDate: undefined,
        endDate: undefined,
        sortBy: "amount"
    };
    const action = {type: "SORT_BY_DATE"};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
    const state = filtersReducer(undefined, {type: "SET_TEXT_FILTER", text: "some text"});
    expect(state.text).toBe("some text");
});

test("should set startDate filter", () => {
    const state = filtersReducer(undefined, {type: "SET_START_DATE", startDate: moment()});
    expect(state.startDate).toEqual(moment());
});
// If I want to use MOMENT, need to put .toEqual !!!

test("should set endDate filter", () => {
    const state = filtersReducer(undefined, {type: "SET_END_DATE", endDate: 0});
    expect(state.endDate).toBe(0);
});