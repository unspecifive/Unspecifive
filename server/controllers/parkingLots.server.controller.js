
var mongoose = require('mongoose');

/* Create a parkingLot */
exports.create = function(req, res) {

  /* Instantiate a parkingLot */
  var parkingLot = new ParkingLot(req.body);


  /* Then save the parkingLot */
  parkingLot.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(parkingLot);
    }
  });
};

/* Show the current parkingLot */
exports.read = function(req, res) {
  /* send back the parkingLot as json from the request */
  res.json(req.parkingLot);
};

/* Update a parkingLot */
exports.update = function(req, res) {
  var parkingLot = req.parkingLot;
  parkingLot.code=req.body.code;
  parkingLot.name=req.body.name;
  if(req.body.coordinates){
    parkingLot.coordinates=req.body.coordinates;
  }
  if(req.body.address){
    parkingLot.address=req.body.address;
  }
  parkingLot.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(parkingLot);
    }
  });
};

/* Delete a parkingLot */
exports.delete = function(req, res) {
  var parkingLot=req.parkingLot;

  parkingLot.remove(function(err){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.json(parkingLot);
    }
  })
  
};

exports.list = function(req, res) {
  parkingLot.find({},function(err,parkingLots){
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.json(parkingLots);
    }
  }).sort({code:1});
};

/* 
  Middleware: find a parkingLot by its ID, then pass it to the next request handler. 

  Find the parkingLot using a mongoose query, 
        bind it to the request object as the property 'parkingLot', 
        then finally call next
 */
exports.parkingLotByID = function(req, res, next, id) {
  parkingLot.findById(id).exec(function(err, parkingLot) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.parkingLot = parkingLot;
      next();
    }
  });
};