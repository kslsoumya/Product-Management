const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')


let createUser = (req,res) =>{

	let newUser = new User ({

		userName : req.body.username,
		password : req.body.password,
		mobile : req.body.mobile,
		email : req.body.emailId,
		createdOn : Date.now(),
		dob : req.body.dob

	})

	newUser.save((err,result)=>{
		 if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:createUser',10)
            let apiResponse = response.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User Created Successfully!!', 200, result)
            res.send(apiResponse)
        }
	})

}

let loginUser = (req,res)=> {
	console.log(req.params.username)
	console.log(req.params.pwd)

	User.findOne({'userName':req.params.username},(err,result)=>{
		if(err) {
			 logger.captureerror(`Some Error Occured ${err}`, 'controller:createUser',10)
            let apiResponse = response.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)

		} else if(check.isEmpty(result)) {
			logger.captureInfo(`No user Found`, 'controller:loginUser',10)
            let apiResponse = response.generate(true, 'No user Found', 404, null)
            res.send(apiResponse)

		} else {
			if(result.password === req.params.pwd) {
			logger.captureInfo(`User Found`, 'controller:loginUser',10)
            let apiResponse = response.generate(false, 'User Found', 200, result)
            res.send(apiResponse)
			}
		}
	})


}




module.exports = {
	createUser : createUser,
	loginUser:loginUser
}