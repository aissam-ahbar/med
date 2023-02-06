const fs = require('fs');
const brotli = require('brotli');
const request = require('request');

const url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/medecins/exports/json?lang=fr&timezone=Europe%2FBerlin';
const inputFile = 'large-file.txt';
const outputFile = 'large-file.txt.br';

const input = request(url);
const output = fs.createWriteStream(outputFile);

input.pipe(brotli.compressStream()).pipe(output);
