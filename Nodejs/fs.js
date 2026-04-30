const fs = require('fs');
console.log("Start");

// // sync // blocking I/O
const data = fs.readFileSync('file.txt', 'utf-8');
console.log("File content:", data);

// // async // non-blocking I/O
fs.readFile('file.txt', 'utf8', (err, data) => {
    if(err) throw err;
    console.log("File Content:", data);
});

//if file exists - overwritten
// if not - created
// same writeFileSync available
fs.writeFile('file.txt', 'Hello Node.js', (err) => {
    if(err) throw err;
    console.log("File written successfully");
})

//append file
fs.appendFile('file.txt', 'The quick brown fox jumps over the lazy dog', (err)=> {
    if(err) throw err;
    console.log("content added");
})

//check if file exits
if(fs.existsSync('file.txt')) {
    console.log("File exits");
}

//delete
// fs.unlink('file.txt', (err) =>{
//     if(err) throw err;
//     console.log("File deleted");
// })


console.log("End");