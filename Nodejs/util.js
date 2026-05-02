// What is util used for?
// It contains helper functions for things like:
// Working with asynchronous code
// Debugging and formatting
// Converting callback-based functions to promises
// Checking types

const fs = require("fs")
const util = require("util");



// util.promisify() (very important)
// Converts callback-based functions into Promises.

const readFilePromise = util.promisify(fs.readFile);


// UTF-8 (Unicode Transformation Format – 8-bit) is a character encoding 
// system used to convert text (letters, symbols, emojis) into bytes so
//  computers can store and read it.

readFilePromise('file.txt', 'utf8')
.then(data => console.log(data))
.catch(err => console.log(err));


// util.inspect()
// Used for debugging objects in a readable way.

const obj = {name: "Anurag", age: 25};
console.log(util.inspect(obj));


// util.format()
// Works like printf in C — formats strings.

const name = "Anurag";
console.log(util.format("Hello %s!", name));