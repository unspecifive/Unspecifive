var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ParkingLot = require('./models/parkingLotSchema.js'),
    config = require('./config/config');

mongoose.connect(config.db.uri);

var lotsFile = fs.readFileSync("../client/lots.json", "utf-8");
var lots = JSON.parse(lotsFile);
for(var entryNum in lots['features']) {
    var entry = lots['features'][entryNum];
    var newLot = {};

    newLot.name = entry.properties.name.toString();
    newLot.code = entry.properties.name.toString();
    newLot.parkingRules = [];
    newLot.decals = [];
    if(entry.properties.fill) {
        newLot.decals.push(entry.properties.fill);
    } else if(entry.properties.stroke) {
        newLot.decals.push(entry.properties.stroke);
    }
    newLot.percentFull = Math.floor(Math.random()*(101));
    newLot.lastUpdated = new Date();
    newLot.lastUpdatedByUser = "5be9c9a9551ded151864fd0f";
    newLot.centerCoordinate = entry.geometry.coordinates[0][0];
    newLot.mapBoxInfo = entry;

    new ParkingLot(newLot).save(function(err, listing){if(err) console.log(err)});
}
