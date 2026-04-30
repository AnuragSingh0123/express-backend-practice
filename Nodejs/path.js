const path = require('path');

console.log(path.basename('/user/text/file.txt'));
console.log(path.dirname('/user/text/file.txt'));
console.log(path.extname('/user/text/file.txt'));


const fullPath = path.join(__dirname,'files','file.txt');
console.log(fullPath);


console.log(path.resolve('file.txt'));