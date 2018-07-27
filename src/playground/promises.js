const promise = new Promise((resolve, reject) => {
    resolve("This is my resolved data");
    // reject("Something went wrong")
});

promise.then((data) => {
    console.log(data);
    new Promise((resolve, reject) => {
        resolve("This is my other promise");
        // reject("Something went wrong")
    });
}).then((str) => {
    console.log("this runs too", str)
}).catch((error) => {
    console.log(error);
});


// -----------------------------------> PROMISE NOTES <-----------------------------------
// PROMISE --> does a long running task --> ex: request to server
//        '--> Does an asynchronous javascript
//        '--> Way to sync up our asynchronous operations
//        '--> I have a long asynchronous task --> I want to do something when it completes
//        '--> Takes an argument --> an arrow function
// When the task it has is done, it calls one of these functions:
// CAN ONLY CALL 1 - ONCE (the second time it is going to be ignored)
// RESOLVE --> called when things went well
//        '--> I can put an object that calls several things inside
// REJECT --> called, alerts that something went wrong
//       '--> .CATCH(() => {}) --> gets fired when promise rejects --> avoids having a JS error
//                     (error)'--> Has access to the data from above 
// IF THE PROMISE RESOLVES --> CALLS THEN()
// IF THE PROMISE REJECTS --> CALLS CATCH() 
// THIS CODE LIVES MOSTLY IN THE FIREBASE LIBRARY
// PROMISE.THEN() --> Lets me register a callback
//               '--> The callback fires only if the promise resolves
//         (data)--> it has access to any data that was passed in, in resolve
// When I resolve a promise I'm saying that the thing I wanted to happen, happened
// '--> Ex: I wanted to wrtie data --> the data was written
// ATTACH HANDLERS --> things to run when the promise resolves or rejects
// SET() returns a promise --> only attach then() or catch()

// The second .THEN() call is run if the first .then call is resolved
// You can chain more .then() calls
// ---> receives no params/arguments unless provided in the first .then call
// I can also return a promise --> which would be the resolved data from the func of above