// Different operating systems (Windows, Linux, macOS) use different
//  path formats, so path module makes your code cross-platform safe.


const path = require('path');



console.log(path.basename('/user/text/file.txt'));
console.log(path.dirname('/user/text/file.txt'));
console.log(path.extname('/user/text/file.txt'));


// path.join() (MOST USED)
// Joins path segments safely.
// const path = require("path");
// const filePath = path.join("folder1", "folder2", "file.txt");
// console.log(filePath);
// Output (depends on OS):
// Linux/macOS: folder1/folder2/file.txt
// Windows: folder1\folder2\file.txt


// What is __dirname?
// __dirname is a Node.js global variable that gives the:
// absolute path of the current file’s folder

const fullPath = path.join(__dirname,'files','file.txt');
console.log(fullPath);


// Now: How path.resolve('file.txt') works
// console.log(path.resolve('file.txt'));
// Important idea:
// path.resolve() uses the current working directory (CWD), not __dirname.
// What is current working directory?
// It is the folder where you ran the Node command.

console.log(path.resolve('file.txt'));

// Concept	          Uses	                                   Meaning
// __dirname	    file location	                    where the code file is located
// process.cwd()	runtime location	                where you ran node
// path.resolve()	uses cwd if no absolute path given	builds absolute path


// __dirname (fixed location)
// console.log(__dirname);
// Always gives the absolute path of the current file’s folder
// Example:
// /Users/anurag/project/utils
// Does NOT depend on where you run the command
// Always consistent
// path.resolve() (dynamic location)
// console.log(path.resolve('file.txt'));
// Depends on current working directory (CWD)
// If you run:
// cd /Users/anurag/project
// node utils/app.js
// Output:
// /Users/anurag/project/file.txt
// But if you run:
// cd /Users/anurag
// node project/utils/app.js
// Output becomes:
// /Users/anurag/file.txt
// Depends on where you run node