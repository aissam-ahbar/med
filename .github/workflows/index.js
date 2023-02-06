const fs = require('fs');
const brotli = require('brotli');
const request = require('request');

const url = 'http://example.com/large-file.txt';
const inputFile = 'large-file.txt';
const outputFile = 'large-file.txt.br';

request(url)
  .pipe(fs.createWriteStream(inputFile))
  .on('finish', () => {
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);
  
    input.pipe(brotli.compressStream()).pipe(output);
  });
