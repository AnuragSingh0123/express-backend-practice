const fs = require("fs")
const util = require("util");


const readFilePromise = util.promisify(fs.readFile);

readFilePromise('file.txt', 'utf8')
.then(data => console.log(data))
.catch(err => console.log(err));

const obj = {name: "Anurag", age: 25};

console.log(util.inspect(obj));

console.log(process.argv);