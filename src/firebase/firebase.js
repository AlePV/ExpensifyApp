// I'mn going to connect to the data base

// * as --> takes all named exports and dumps them on a new variable called firebase
import * as firebase from "firebase";

// Connect to database (initialize firebase):

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();



const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// To Authenticate with Google



export {firebase, googleAuthProvider, database as default};

// ----------------------------------------------------------------------->

// database.ref().set({
//     name: "Ale",
//     age: 18,
//     stressLevel: 5,
//     job: {
//         title: "Software engineer",
//         company: "Facebook"
//     },
//     location: {
//         country: "Mexico",
//         city: "MTY"
//     }
// }).then(() => {
//     console.log("Data is saved");
// }).catch((e) => {
//     console.log("This failed", e);
// });
// when the syncing is successful run what is inside .then()

// database.ref("age").set(19);
// database.ref("location/city").set("Monterrey");

// database.ref("attributes").set({
//     height: 73,
//     weight: 150
// }).then(() => {
//     console.log("Second set call worked");
// }).catch((e) => {
//     console.log("Second error", e);
// });

// database.ref().update({
//     // name: "Mariale",
//     // age: null,
//     // "location/city": "Monterrey"
//     stressLevel: 9,
//     "job/company": "Amazon",
//     "location/city": "Seattle"

// });


// -----------> TO REMOVE DATA FROM THE DATABASE
// database.ref("age").remove()
//     .then(() => {
//         console.log("Remove succeeded")
//     })
//     .catch((e) => {
//         console.log("Remove failed", e)
//     });
// OR --> database.ref("age").set(null);


// -----------> TO FETCH DATA FROM THE DATABASE
// database.ref()
//     .once("value")
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log("Failed", e);
//     });
// --------> OR:

// const onValueChange = database.ref().on("value", (snapshot) => {
//     console.log(snapshot.val());
//     console.log("Fetched correctly");
// }, (e) => {
//     console.log("Fetching data failed", e)
// });

// database.ref().on("value", (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

// TO UNSUBSCRIBE:
// database.ref().off(onValueChange);

// <-----------------------------------------------------------------------



// -----------> LEARNING TO WORK WITH ARRAYS IN FIREBASE

// const notes = [{
//     id: "1",
//     title: "Note 1",
//     body: "Body 1"
// }, {
//     id: "2",
//     title: "Note 2",
//     body: "Body 2"
// }];


// database.ref("expenses").push({
//     description: "T-shirt",
//     note: "",
//     amount: 5000,
//     createdAt: 0
// });

// database.ref("expenses").push({
//     description: "supermarket",
//     note: "",
//     amount: 15000,
//     createdAt: 10
// });

// database.ref("expenses").push({
//     description: "rent",
//     note: "",
//     amount: 25000,
//     createdAt: 100
// });

// TO ACCESS ONE OF THEM SPECIFICALLY --> database.ref("expenses/-LINp9bkEdJAbzfx2G-r").update({ note: "new note"})

// My array is changed to an OBJECT_STYLE STRUCTURE --> going to be LIST-BASED DATA
// .PUSH --> firebase will create a new property on our reference and give a random value (a certain type of id)
//      '--> It is going to take what I write inside the () and set it inside the body
//      '--> Automatically generates an ID

// ------------------------> USING ONCE()
// database.ref("expenses")
//     .once("value")
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
    
//     console.log(expenses);
// });

// SUBSCRIPTION TO EXPENSES --> every time one expenses changes, it will print again in the const
// ------------------------> USING ON()
// database.ref("expenses").on("value", (snapshot) => {
//     const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
    
//     console.log(expenses);
// });

// -----------------------------------> TO CHANGE FROM THE OBJECT-STYLED STRUCTURE --> TO AN --> ARRAY 
// (BECAUSE MY REDUX STORE ONLY ACCPETS ARRAYS)
// .FOR_EACH --> iterating over all the snapshots
// CHILDSNAPSHOT --> mehtod from firebase that lets me take a snapshot (the data) of a child
// The goal is to add things on to expenses
// .PUSH({}) --> to push items into expenses (which is an array) --> push in an object
// A reference in firebase is to a specific location
// KEY --> gives access to the string (that is automatically generated by firebase to separate the objects of expenses)
// ID: CHILDSNAPSHOT.KEY --> access the string that is the id for a specific expense
// ...CHILDSNAPSHOT(VAL()) --> add on the other properties (spread them off, instead of taking them one by one)



// -----> CHILD_REMOVED <-----
// When a child is removed, a message (& with all the properties of the child) will appear on the console
// database.ref("expenses").on("child_removed", (snapshot) => {
//     console.log("One child was removed:", snapshot.key, snapshot.val())
// });

// // -----> CHILD_CHANGED <-----
// // When a child is changed, a message (& with all the properties of the child) will appear on the console
// database.ref("expenses").on("child_changed", (snapshot) => {
//     console.log("One child was changed:", snapshot.key, snapshot.val())
// });

// // -----> CHILD_ADDED <-----
// // When a child is added, a message (& with all the properties of the child) will appear on the console
// database.ref("expenses").on("child_added", (snapshot) => {
//     console.log("One child was added:", snapshot.key, snapshot.val())
// });
// Fires one time for all of the data already at that location
// Re-runs for all new expenses



// -----------------------------------> FIREBASE NOTES <-----------------------------------
// CRUD --> create, read, update and delete
// Firebase accepts or can work with numbers, strings, booleans, any data type.
// FIREBASE.DATABASE() --> this is the database method that gives me access to all the database related features
//                   '--> NEVER pass an argument inside --> always ()
// .REF() --> reference to somewhere in our database (like the area where we store users, or where we store expenses)
//       '--> without no arguments inside the () --> references to the root of my database
//       '--> gives reference to a specific part in my database
// .SET() --> lets me provide the data I want to set
//       '--> need to provide key value pairs
//       '--> Sets the value for that reference
//       '--> Doesn't need an object inside it ({}) --> it can have any data type inside
//  ***  '--> If I have two --> it is going to wipe the original reference value and set it equal to the new value
//  ***  '--> To REWRITE or chsnge something that's already written --> need to call set in a SPECIFIC LOCATION in the database
//       '--> EX: database.ref("age").set(19); database.ref("location/city").set("Monterrey");

// PROMISES --> allow to do something after a long running task completes (like setting data in the database)
// SET() returns a promise --> only attach then() or catch()
// .THEN(() => { }) --> Runs when the promis/action from before resolved (SUCCEEDED)
// .CATCH(() => { }) --> Runs when the promis/action from before rejected (FAILED)
//                  '--> (e) --> represents the error
// REFERENCE *** WEB --> things that objects can do

// .REMOVE() --> Removes data from the database
// .SET(NULL) --> Removes data from the database

// TO EFFICIENTLY UPDATE DATA --> do not use .set()
// .UPDATE --> to efficiently update data (when I want to udpate more than one data)
//        '--> Updates multiple things in one shot
//        '--> Gets called with an object
//        '--> Can ADD new things (just type them)
//        '--> Can REMOVE things --> setting the value : NULL
//        '--> To udpate child location --> ex: "location/city": "Monterrey" (use " bc it has /")
//        '--> Accepts promise --> can use .then() & .catch()

// TO FETCH OR GET DATA FROM THE DATABASE
// .REF() --> without arguments, fetched all the data
//       '--> with arguments, fetches specific data (the one I want) --> EX: .ref("location/city")
// ONCE("VALUE") --> to fetch a single time
//              '--> Returns a promise --> use that promise to do something when the data comes back or when there's an error fetching the data
//          '--> Takes only one argument --> takes the event type 
//          '--> To fetch all of the data at a specific reference "value"
//          '--> If the data changes I am not going to be notified
// .THEN((snapshot) => { snapshot.val() }) --> I get an argument back 
//           '--> Data that I requested before
//           '--> On SNAPSHOT I have access to my data
//                           '--> SNAPSHOT.VAL() --> allows me to extract the object
//                                           '--> Function I call with NO arguments
//                                           '--> RETURNS the data I requested
// .CATCH(() => { }) --> shows the error
// ALL OF THIS FETCHES THE ENTIRES DATABASE'S DATA AND LOGS IT TO THE SCREEN

// So the SERVER can notify ME of CHANGES
// .ON("VALUE") --> allows to listen for something over and over again
//        '--> Allows to get the value back initially and every time it changes
// (snapshot) ... --> To run some code when the value comes back --> pass in a callback function --> which runs on data changes
// It reruns if data changes
//               '--> It is the SUCCESS CALLBACK
// .OFF() --> cancels all subscriptions on that reference
//       '--> The change doesn't appear to you but the data in the database DID change
//       '--> We don't get notified of the changes after we unsubscribe
//       '--> Get notified when there is an error also
// 1st func: SUCCESS HANDLER
// 2nd func: FAILURE HANDLER


// HOW TO STRUCT ARRAY DATA IN FIREBASE
// Firebase does not support arrays

// .FOR_EACH --> lets me iterate over every single item




// A DataSnapshot contains data from a Database location.
/* Any time you read data from the Database, you receive the data as a DataSnapshot. 
A DataSnapshot is passed to the event callbacks you attach with on() or once(). 
You can extract the contents of the snapshot as a JavaScript object by calling the val() method. 
Alternatively, you can traverse into the snapshot by calling child() to return child snapshots 
(which you could then call val() on). */

// -----------> AUTHENTICATION
// PROVIDER --> Way to provide authentication
//         '--> Ex: Google, Twitter, Facebook