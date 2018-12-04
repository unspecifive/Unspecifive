var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listingSchema = new Schema({
    name: {
        type: Number,
        required: true
    },
    
    color: {
        type: String,
        required: true,
    },
    fill: {
        type: String,
        required: true,
    },
    /*
    parkingRules: [{//map decal code to time period it is allowed
        decal: [{
            type: String,
            required: true
        }],
        startTime: {
            type: Number,
            required: true
        },
        endTime: {
            type: Number,
            required: true
        }
    }],
    decals: [String],
    */
    
    full: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    lastUpdatedByUser: {
        type: String,
        required: true
    },
    centerCoordinate: [Number],//[longitude, latitude]
    mapBoxInfo: {
        type : {type: String},
        properties : {
            name: String,
            fill: String,
            stroke: String
        },
        geometry: {
            type: {type: String},
            coordinates:[[[]]]
        }
    }
    
});


var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
