const fs = require('fs');

// Async read

fs.readFile('input.txt', function (err, data) {
    if (err) {
        console.log(err);
    }
    console.log("async read : " + data.toString());
});


// Sync Read

const data = fs.readFileSync('input.txt');
console.log("sync Read : " + data.toString());
console.log("Program Ended");