const fs = require('fs');
const zlib = require('zlib');
const request = require('request');

const city = 'Paris';
const url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/medecins/exports/json?lang=fr&refine=commune%3A%22' + city + '%22&timezone=Europe%2FBerlin';
const inputFile = 'large-file.txt';
const outputFile = 'large-file.txt.br';

console.log('Start reading & compressing ' + city);

request(url)
  .pipe(fs.createWriteStream(inputFile))
  .on('finish', () => {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);
    const brotli = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done compressing ' + city + ' 😎');
    });
  });

/**
const READ_FILE_NAME = 'large-file.txt.br';
const WRITE_FILE_NAME = 'datadec.json';
const readStream = fs.createReadStream(READ_FILE_NAME);
const writeStream = fs.createWriteStream(WRITE_FILE_NAME);
const brotli = zlib.createBrotliDecompress();
const stream = readStream.pipe(brotli).pipe(writeStream);

stream.on('finish', () => {
  console.log('Done decompressing 😎');
});

**/
