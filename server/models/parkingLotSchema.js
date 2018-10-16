var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var parkingLotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    parkingRules: [{//map decal code to time period it is allowed
        decal: [{
            type: String,
            required: true
        }],
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    }],
    percentFull: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    boundaryCoordinates: [{//list of coordinate points which define the boundary
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }]
});


var ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;
