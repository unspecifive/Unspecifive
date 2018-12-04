const mongoose      = require('mongoose');
const Listing    = require('../models/parkingLotSchema');
const User          = require('../models/userSchema');


exports.lotByCode = function(req, res, next, code) {
    Listing.findOne({code: code}, function(err, lot) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.parkingLot = lot;
            next();
        }
    })
};

exports.getLot = (req, res) => {
    Listing.findOne({code: req.parkingLot.code}, function(err, lot) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(lot);
        }
    })
};

exports.findAll = (req, res) => {
    Listing.find({},(err, lots) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(lots);
        }
    })
};

exports.getLotsByFilters = (req, res) => {
    var searchCriteria = {};
    var bod = req.body;
    if(bod.onlyNonFullLots) {
        searchCriteria['percentFull'] = {$lte: 99};
    }
    if(bod.decal) {
        searchCriteria['decals'] = bod.decal;
    }
    Listing.find(searchCriteria, (err, lots) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(lots);
        }
    });
};

exports.create = (req, res) => {
    Listing.findOne({name: req.body.name}, (err, lot) => {
        if(lot) {
            return res.status(409).json({message: 'Parking lot with this name already exists'});
        } else {
            if(!req.body.name ||
                !req.body.code ||
                !req.body.parkingRules ||
                !req.body.decals ||
                !req.body.percentFull ||
                !req.body.boundaryCoordinates ||
                !req.body.mapBoxInfo)
            {
                return res.status(500).send("Request is missing some parameters needed to create a full parking lot entry");
            }
            const pLot = new Listing({
                name: req.body.name,
                code: req.body.code,
                parkingRules: [],
                decals: req.body.decals,
                percentFull: req.body.percentFull,
                lastUpdated: new Date(),
                lastUpdatedByUser: req.user._id,
                boundaryCoordinates: req.body.boundaryCoordinates,
                mapBoxInfo: req.body.mapBoxInfo
            });
            pLot.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(pLot);
                }
            })
        }
    });
};


exports.updateFullness = (req, res) => {
    /*
    var updatedInfo = {
        percentFull: req.body.percentFull,
        lastUpdatedByUser: req.user._id,
        lastUpdated: new Date()
    };
    Listing.findOneAndUpdate({code: req.parkingLot.code}, updatedInfo, {new: true}, function (err, lot) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(lot);
        }
    });
    */
   console.log("Updating");
   var listing=new Listing(req.body);
   var date=new Date();
   console.log(date);
   Listing.findOneAndUpdate({"name":listing.name}, {"full":listing.full,"lastUpdated":date},function(err,listings){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.json(listings);
    }});
    
};

exports.list = function(req, res) {
    console.log("Here");
    Listing.find({},function(err,listings){
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else{
        res.json(listings);
      }
    }).sort({full:1});
  };