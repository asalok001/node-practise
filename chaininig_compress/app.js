const fs = require('fs');
const zlib = require('zlib');

// fs.createReadStream('input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('input.txt.gz'));

// console.log('File Compressed');

fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('output.txt'));

console.log('Decompressed');