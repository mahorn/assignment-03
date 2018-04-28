"use strict"
// require two packages 
var fs = require('fs');
var csv2geojson = require('csv2geojson');
// use the fs.readFile()method to pull the file into the script and parse it as text
fs.readFile(__dirname + '/../data/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {
    if(err) throw err;
    // console.log(csvString)

    // convert to GeoJSON
    csv2geojson.csv2geojson(csvString, {
        latfield: 'LATITUDE',
        lonfield: 'LONGITUDE',
        delimiter: ','
    }, (err, geojson) => {

        if(err) throw err;

        console.log(geojson);

        // write  file
        fs.writeFile(__dirname + '/../data/austin-traffic-signals.json', JSON.stringify(geojson), 'utf-8', (err) => {
            
            if(err) throw err;

            console.log('done writting file');
        });
    })
});