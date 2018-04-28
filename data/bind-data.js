"use strict"

const fs = require('fs');
const csvParse = require('csv-parse');

// request first file
fs.readFile(__dirname + "/../data/austin-council-districts.json", 'utf-8', (err, geojson) => {
    
    if (err) throw err;
    // nested call for the second (could use Promise or async solution)
    fs.readFile(__dirname + "/../data/austin-traffic-signals.csv", 'utf-8', (err, csvString) => {

        if (err) throw err; // stop the script if error

        // parse the CSV file from text to array of objects
        csvParse(csvString, {
            columns: true
        }, (err, csvData) => {

            bindData(JSON.parse(geojson), csvData);
        });
    })
});

function bindData(geojson, csvData) {

    // loop through the features
    geojson.features.forEach((feature) => {

        // set variable to 0
        let count = 0;

        // loop through the array of CSV data objects
        csvData.forEach((row) => {

            // if IDs match
            if (feature.properties.council_di === row.COUNCIL_DISTRICT) {

                // increment the count for that feature
                count++
            }
        });

        // when done looping, add the count as a feature property
        feature.properties.count = count;
    });

    // done with data bind
    writeFile(geojson);
}

function writeFile(geojson) {
    
    fs.writeFile(__dirname + '/../data/austin-districts-counts.json', JSON.stringify(geojson), 'utf-8', function (err) {

        if (err) throw err;

        console.log('File all done. Great success!');
    })
}