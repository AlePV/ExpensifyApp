import React from "react";
import {connect} from "react-redux";
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from "../actions/filters";
import {DateRangePicker} from "react-dates";

// means this will have access to props.filters.text, and use that as the value of the input
// By changing a stateless function component to a REACT COMPONENT I need to change from {props.filters.text} --> to --> {this.props.filters.text}
export class ExpenseListFilters extends React.Component {
    // Use State to track something in this component
    // The FIVE props of <DateRangePicker/> are required to use it (know which to put because they come in their webpage)
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    // Going to get called by the React dates library
    // Called with an object that has a start date and an end date
    // '--> Had to de structure startDate and endDate because they are inside the same props.filter object (in the filters file)
    // '--> These two actions were created in the filters file before 
    // '--> Passed the new start date

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    };

    // FOCUSED-INPUT --> just call the state (the thing we are tracking ***check web)
    // ON-FOCUS-CHANGE --> calls new value and sets new value --> justo do it like this, how it says in the webpage ***check web

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate()
        } else if (e.target.value === "amount") {
            this.props.sortByAmount()
        }
    }

    render () {
        return (
            <div className="content-container">

                <div className="input-group">

                <div className="input-group__item">
                    <input 
                        type="text" 
                        placeholder="Search expenses"
                        className="text-input"
                        value={this.props.filters.text} 
                        onChange={this.onTextChange}
                    />
                </div>

                <div className="input-group__item">
                    <select
                        className="select" 
                        value={this.props.filters.sortBy} 
                        onChange={this.onSortChange}>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>

                <div className="input-group__item">
                    <DateRangePicker
                        startDate = {this.props.filters.startDate}
                        endDate = {this.props.filters.endDate}
                        onDatesChange = {this.onDatesChange}
                        focusedInput = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {() => false}
                        showClearDates = {true}
                    />
                </div>

                </div>

            </div>
        );
    }
}

// this is known as a CONTROLLED INPUT -- input where the value is controlled by javascript

// ^^^^^ it's a dropdown for users to pick how they want to sort their expenses (sortBy, from filters) 
// --> <select>   <option></option>   </select>
//  value="date" means the value we'll be using behind the scenes, while "Date" is the value the user sees
// e.target.value is what the user enters or types



// -----------------------------------> UNDERSTANDING (E) NOTES <-----------------------------------
// ONCHANGE HANDLER: every time the input changes = function fires
// (e) => means event argument - which we need to get value
// "target" => means input
// need to use "dispatch" to update the store ==> so keystrokes actually result in a change of input
// in dispatch - pass thing we want to do, the action object
// e.target.value => prints value we want to screen
// WHOLE FUNCTION READS AND WRITES TO STORE // last part dispatchs to change redux store



// -----------------------------------> DATE PICKER NOTES <-----------------------------------
// Allows you to pick the range of dates you want to see

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

// first ()            ^^ takes map state to props func
// second ()                   ^^^^^^^^^^ takes our component
// determine what we want off of the store



// <input type="text"/> ---> this, creates a user input (space where user can enter text )

//make sure input matches value in redux store --> so connect expenseListFilters to the store