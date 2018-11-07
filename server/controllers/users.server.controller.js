const mongoose = require('mongoose');
const User     = require('../models/userSchema');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');

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
                        }
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });

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
                    'secret_key',
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

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId, (err, result) => {
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