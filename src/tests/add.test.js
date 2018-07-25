// JEST --> allows to test applications (for errors the user might commit )
//     '--> When it searches for test-files it looks for files with the ".test.js" endings

const add = (a, b) => a + b;

test ("should add two numbers", () => {
    const result = add(3,4);
    expect(result).toBe(7);
})

/* EXPLANATION --> The first argument is the test name; 
the second argument is a function 
that contains the expectations to test. 
The third argument (optional) is timeout (in milliseconds) for specifying how long to wait before aborting. 
Note: The default timeout is 5 seconds.

Several things to make assertions about values in my test cases

Set up watch mode --> yarn test -- --watch (first -- would be for yarn, second -- for test)
'--> Watch tests file for changes
'--> When those files change
'--> When the files they import change

Write the same folders and files to create the test-files and make it easy to know where they are
*/

const generateGreeting = (name = "Anonymous") => `Hello ${name}`;

test ("should generate greeting from name", () => {
    const greetingMom = generateGreeting("Mom");
    expect(greetingMom).toBe("Hello Mom"); 
})

test ("should generate a default greeting", () => {
    expect(generateGreeting()).toBe("Hello Anonymous");
})