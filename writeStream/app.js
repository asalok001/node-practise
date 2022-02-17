var fs = require('fs');

var data = "Simple and ease learning";

// Create a writable stream
var writeStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writeStream.write(data, 'utf-8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writeStream.on('finish', function () {
    console.log('Write Completed');
});

writeStream.on('error', function (err) {
    console.log(err.stack);
});

console.log('Program ended');