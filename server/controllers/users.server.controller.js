const mongoose = require('mongoose');
const User     = require('../models/userSchema');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const config   = require('../config/config.js');

exports.create = (req, res) => {
    // first find the user so it can check if email already exists
    User.findOne({email: req.body.email}, (err, user) => {
        if(user) {
            return res.status(409).json({
                message: 'Email already in use'
            });
        } else {
            // this ensures passwords are not stored in plaintext in the DB - a hash is stored instead
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    // create new user object
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                        parkingDecalCode: req.body.parkingDecalCode
                    });
                    // save newly created user
                    user.save((err, result) => {
                        if(err) {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        } else {
                          console.log(result);
                          res.status(201).json({
                              message: 'User created'
                          });
                        }

                    })
                }
            });
        }
    });
};

exports.login = (req, res) => {
    // find user so its hash can be used to compare with the plaintext password later
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(404).json({
                message: 'Authentication failed'
            });
        }
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // compares plaintext password with hash from db
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(err) {
                console.log(err)
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            if(isMatch) {
                // generate a token for the client upon successful log in
                const token = jwt.sign(
                    {
                    email: user.email,
                    userId: user._id
                    },
                    config.jwtKey,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Authentication succeeded',
                    token: token
                });
            }
            // Password was incorrect
            return res.status(401).json({
                message: 'Authentication failed'
            });
        });
    })
};

exports.authenticate_token = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send("Please provide a token to access this endpoint");
    } else {
        jwt.verify(token, config.jwtKey, function(err, body) {
            if(err) {
                res.status(500).send("Token was invalid, please login again to get a valid token");
            } else {
                User.findOne({_id: body.userId}, function(err, user) {
                    if(err) {
                        res.status(500).send(err);
                    } else {
                        req.user = user;
                        next();
                    }
                });
            }
        });
    }
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.user._id, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            message: 'User deleted'
        });
    });
};

exports.who_am_i = (req, res) => {
    res.status(200).json(req.user);
};
