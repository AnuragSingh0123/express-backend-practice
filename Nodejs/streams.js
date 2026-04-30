
const fs = require('fs');

const stream = fs.createReadStream('file.txt', 'utf8');

stream.on('data', chunk => {
    console.log("Chunk:",chunk);
})

stream.on('end', ()=>{
    console.log('File reading complete');
})