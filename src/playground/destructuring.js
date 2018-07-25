console.log("DESTRUCTURING IS RUNNING");

const person = {
    name: "Ale",
    age: 18,
    location: {
        city: "Mty",
        temp: 35
    }
}

// console.log(`${person.name} is ${person.age}`);
// So we don't have to put person. something, we do this:

// const name = person.name;
// const age = person.age;

const {name: firstName = "Anonymous", age} = person;
//   ^^^^ vars I want to take out from      ^^^^the  object
// you can set a DEFAULT 
console.log(`${firstName} is ${age}`);

// if (person.location.city && person.location.temp) {
//     console.log(`It's ${person.location.temp} in ${person.location.city} `);
// }
// ^^^^^^^^^^^^ no longer need to do this,,, instead, did the below code 


const {city, temp: temperature} = person.location;


// grabs the object "temp" and creates a new temperature const (a way to rename the var)

if (city && temperature) {
    console.log(`It's ${temperature} in ${city} `);
}


const book = {
    title: "Ego is the enemy",
    author: "Ryan Holiday",
    publisher: {
        name: "Penguin"
    }
}

const {name: publisherName = "Self-Published"} = book.publisher;

console.log(publisherName);

console.log("----------");

/////////////// ARRAY DESTRUCTURING ///////////////

const address = ["Privada Tuxtepec 203", "Col. Lomas del Valle", "SPGG", "NL"];

// console.log(`You are in ${address[2]} in the city of ${address[3]}`);
// Use this instead:

const [street, col, county, state = "Unknown"] = address;
// ^^^^^^ puts it by order

// If I only want thr numbers in between: 
// const [, col, county,] = address;

console.log(`You are in ${county} in the state of ${state}`);

const item = ["Coffee", "$2.00", "$2.50", "$3.00"];

const [coffee, , mediumPrice] = item;

console.log(`The medium ${coffee} costs ${mediumPrice}`);