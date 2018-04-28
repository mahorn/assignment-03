"use strict"

var fs = require('fs');

var rawData = fs.readFileSync(__dirname + '/../data/cartocolors.json');

// console.log(rawData);

var data = JSON.parse(rawData);

// console.log(data);

var outputData = {'Emrld' : data['Emrld']};

// console.log(outputData);

fs.writeFileSync(__dirname + '/../data/emrldcolors.json' , JSON.stringify(outputData));

console.log('data/emrldcolors.json written to file!');