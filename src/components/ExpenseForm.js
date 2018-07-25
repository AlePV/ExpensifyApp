// Using this re-usable component for AddExpense and EditExpense


import React from "react";
import moment from "moment";
import {SingleDatePicker} from "react-dates";



// const now = moment();
// console.log(now.format("MMMM D, YYYY"));

export default class ExpenseForm extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ""
        };
    }


    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };


    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(()=> ({note}));
    };


    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    };


    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}))
        }
    };


    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}))
    };


    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: "Please provide a description and an amount"}))
        } else {
            this.setState(() => ({error: ""}))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };


    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>

                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />

                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {() => false}
                    />

                    <textarea
                        placeholder="Add a note (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>

                    <button>Add Expense</button>

                </form>
            </div>
        )
    }
}


// PLACEHOLDER --> something to show in the input when there is no text typed by the user



// AUTOFOCUS --> makes sure that when we visit the page, automatically puts the cursor and the focus on the input
//          '--> can only do it one input at a time



// Use local component states to track changes --> only when user submits form, we'll do something with the info



// -----------------------------------> STATE NOTES <-----------------------------------
// VALUE={THIS.STATE.DESCRIPTION} --> sets value for this text input equal to the current state value --
//                               '--> but this creates a view-only input 
//                               '--> so we have to write onChange



// -----------------------------------> FUNCTION W/ STATE NOTES <-----------------------------------
// STATE = {DESCRIPTION: ""}  --> first set up default state (for the variable I want, in this case description)
// (e) --> need access to it because it is where the value lives
// CONST DESCRIPTION = E.TARGET.VALUE --> create a const called description = getting its value from what the user types
// THIS.SETSTATE(()=> ({ description })) --> passed inside an updater function and implicitly return an object
//                           '--> here I set {description} equals to the description variable from above
//                           '--> setting description (from my code) equals to what the user types
// -----> REPEATED THIS PROCESS FOR ON-NOTE-CHANGE <-----



// -----------------------------------> REGULAR EXPRESSIONS NOTES <-----------------------------------
// *** changed the type of input from "number" to "text" (line 43) --> so I can restrict the user to write only 2 decimal points
// REGULAR EXPRESSIONS --> A regular expression (regex or regexp for short) is a special text string for describing a search pattern.
// https://regex101.com/r/pqwNbY/1
// IF (AMOUNT.MATCH(/^\d*(\.\d{0,2})?$/)) {THIS.SETSTATE(() => ({AMOUNT}));} --> allows us to ensure that the number comes in a specific format
// We could set this ^^^ formula later, in the submit part --> BUT by doing this here, I ensure the user is not able to type anything else
// (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) --> means that if there is no amount or if it's a match: do what follows
//                                                  '--> Made a change so we don't allow the user to star with a decimal point
//                                                  '--> Made a change so the user can clear the input he wrote (because with the up ^^ change it didn't allow to delete)



// -----------------------------------> MOMENT NOTES <-----------------------------------
// CONST NOW = MOMENT() --> using part of the library "moment" * need to import it before
//                      '--> shows the functions "moment" has
// NOW.FORMAT("MMMM D, YYYY") --> prints the present day in the format of month day, year (Feb 5, 2018)
// CREATEDAT: MOMENT() --> starts at now --> when the user loads the page, that's the day it will show up
//                    '--> that's why createdAt is created with a new instance of moment



// -----------------------------------> DATE PICKER NOTES <-----------------------------------
// <SINGLEDATEPICKER/>--> new instance of SingleDatePicker --> only picks one date (the date at which the event was created)
// DATE --> moment object that represents where you want to start
// ONDATECHANGE --> provide a handler for when the user picks a new date
//             = {THIS.ONDATECHANGE}'--> function that is called when someone picks a new date in the calendar
// FOCUSED --> provide whether or not the input is focused
// ONFOCUSCHANGE --> provide a handler for when the React date's library needs to change that value
// ONDATECHANGE = (CREATEDAT) => { THIS.SETSTATE(() => ({CREATEDAT}))} --> I set the date for createdAt (by implicitly returning {createdAt})
//                    '--> This is the date we want --> mine is in the createdAt variable/object
// --> when the user interacts with the calendar, the third-party library tells you that it's going to close, what we do is provide a handler
// onFocusChange = ({focused}) => { this.setState(() => ({calendarFocused: focused}))}; --> destructured ({focus})
//                                                              '--> set equal the value that we have to the one that it's typed by the user
// NUMBER-OF-MONTHS --> I can determine how many months I want to show in the display
//                 '--> this is actually a function that is included in the redux-dates functions (see docs in safari page to see how it's written)
// IS-OUTSIDE-RANGE = {()=> FALSE-> makes every day available (even the ones before the present day (the day the user enters)
// When we set a SingleDatPicker we have to provide an initial value --> that's why we used MomentJS, to define the current or present day as the starter
//                                                                  '--> get current time in an object moment
//  if (createdAt) {this.setState(() => ({createdAt}))}
//          '--> this means that if there is a date, do the following / if not, don't do anything
//          '--> so the user cannot eliminate the date field completely 
//          '--> prevents the user from being able to clear the date field



// -----------------------------------> ON SUBMIT FUNC. NOTES <-----------------------------------
// ONSUBMIT={THIS.ONSUBMIT} --> this is an onSubmit handler for the form --> used an onSubmit prop on the <form>
//                         '--> on submit we are going to run some code
// ONSUBMIT = (E) => {E.PREVENT-DEFAULT()} --> For our FORMS it's crucial to provide the (e) 
//                             '--> because we need to call e.preventDefault() (which prevents the browser to do the full page refresh)
//                             '--> Allows us to handle it with JavaScript instead
// if (!this.state.description || !this.state.amount) {this.setState(() => ({error: "Please provide a description and an amount"}))} 
//              '-->            '-->                    if there is no description : print error message
//                              '-->          '-->      if there is no amount : print error message
// {this.state.error && <p>{this.state.error}</p>} --> means that if there es an error (if it exists) --> print what the error is
//                                                '--> with the conditional logic from before, if there is an error it will show up

// THIS.PROPS.ONSUBMIT({ DESCRIPTION: {THIS.STATE.DESCRIPTION}}) --> calls the function onSubmit with some data
//                                                              '--> which was created in the AddExpense file and pased on to here)
//                                                              '--> call it with an object with all of these properties
//                                                 '--> Description gets its value directly from the actual description
// AMOUNT: PARSEFLOAT(THIS.STATE.AMOUNT, 10) * 100 --> Takes string number and changes it to a float number 
//                                                '--> Keeps the decimal points, sets the base to ten & eliminates the cents with th *100
// CREATEDAT: THIS.STATE.CREATEDAT.VALUEOF() --> Used to get the time stamp --> because createdAt is in a moment object 
//                                          '--> so to take the moment object out --> use valueOf


// -----------------------------------> CONSTRUCTOR NOTES <-----------------------------------
// Changing from STATE = {} --> to CONSTRUCTOR() = {} --> allows to be used in both EditExpense (which needs the constructor) && AddExpense (which doesn't need it but works the same with it)
// CONSTRUCTOR (PROPS) { SUPER(); THIS.STATE = {}} 
//     '--> CONSTRUCTOR --> Special method for creating and initializing an object created within a class
//                     '--> If no constructor is defined, a default constructor is used
//                '--> Arguments it takes
//                         '--> SUPER --> calls the constructor of a parent class
// -----> DESCRIPTION: PROPS.EXPENSE ? PROPS.EXPENSE.DESCRIPTION : ""
//                                            '--> Check if props.expense exists
//                                                         '--> If it does exist --> start the description value at the same value (as it is, the one the user entered)
//                                                         '--> If it doesn't exist --> start it off as an empty string
// -----> NOTE --> uses the same process ^^^
// -----> AMOUNT --> / 100 because it is a digit with cents (& I don't want the cents)
//              '--> .TO-STRING --> to convert the number to a string (because it's what the component uses)
// -----> CREATED-AT --> Creates an instance of moment at a specific point in time
//                  '--> Need to pass the time stamp in (in my case it is stroed at props.expense.createdAt)