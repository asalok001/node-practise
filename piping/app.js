var fs = require('fs');
// Creating a readable stream
var readStream = fs.createReadStream('input.txt');

// Creatiing a witable stream

var writeStram = fs.createWriteStream('output.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt

readStream.pipe(writeStram);
console.log('Prograam ended');