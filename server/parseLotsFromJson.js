var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./models/parkingLotSchema.js'),
    config = require('./config/config');

mongoose.connect(config.db.uri);

var lotsFile = fs.readFileSync("../client/lots.json", "utf-8");
var lots = JSON.parse(lotsFile);
for(var entryNum in lots['features']) {
    var entry = lots['features'][entryNum];
    var newLot = {};

    newLot.name = entry.properties.name;
    newLot.color = entry.properties.color;
    newLot.fill=entry.properties.fill;
    /*
    newLot.parkingRules = [];
    newLot.decals = [];
    if(entry.properties.fill) {
        newLot.decals.push(entry.properties.fill);
    } else if(entry.properties.stroke) {
        newLot.decals.push(entry.properties.stroke);
    }
    */
    newLot.full = 20;
    newLot.lastUpdated = new Date();
    newLot.lastUpdatedByUser = "5be9c9a9551ded151864fd0f";
    newLot.centerCoordinate = entry.geometry.coordinates[0][0];
    newLot.mapBoxInfo = entry;

    new Listing(newLot).save(function(err, listing){if(err) console.log(err)});
}
