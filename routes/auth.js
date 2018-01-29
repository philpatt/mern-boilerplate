require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
// var expressJWT = require('express-jwt'); //<-- for protecting routes on back-end
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  //First, try and find the user
  User.findOne({ email: req.body.email}, function(err, user){
  	if(!user || !user.password){
  		return res.status(404).send({ error:true, message:'user not found!'});
  	}
  	var passwordMatch = bcrypt.compareSync(req.body.password, user.password);
  	if(passwordMatch){
		//good to go password
		var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24 //expire in 24 hours
		});
		res.send({ user: user, token: token});
  	}
  	else{
  		//Bad password
  		res.status(401).send({error: true, message: 'nice try HACKER, password is wrong!!'})
  	}
  })
});


// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
	//todo: FIRST check if user already exists
  console.log('/auth/signup post route', req.body);
  User.findOne({ email: req.body.email },function(err, user){
  	if(user){
  		return res.status(400).send({ error: true, message: 'user already exists!!'});
  	} 
  	else {
  		User.create(req.body, function(err, user){
  			if(err){
  				return res.status(503).send({error:true, message:'Database error: '+ err.message });
  			}
  			else {
  				//make a token and send it to the caller
  				var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
  					expiresIn: 60 * 60 * 24 //expire in 24 hours
  				});
  				res.send({ user: user, token: token});
  			}
  		});
  	}
  });
});
// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  var token = req.body.token || req.query.token;
  if(!token){
  	return res.status(418).send({error:true, message:'You must be a teapot'});
  }
	//get the user from the token
	jwt.verify(token, process.env.JWT_SECRET, function (err, user){
		if(err){
			return res.status(500).send({ error: true, message: "JWT verification error -" + err});
		}
			//find the user if no error by using the ID from the JWT
		User.findById({ 
			'_id': user._id
		},
		function(err, user){
			if(err){
				return res.status(500).send({error: true, message:'database error -' +err.message});
			}
			else if (!user){
				return res.status(404).send({error: true, message: 'user unable to be ofund from token'});
			}
			//renew token
			var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 24 //expire in 24 hours
			});
			res.send({ user: user, token: token});
		})
	});
});

module.exports = router;
