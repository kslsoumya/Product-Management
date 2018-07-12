const express = require('express');
const app =express()

const appConfig = require('../config/appConfig')
const  userController = require('../controllers/userController')
const prodController = require('../controllers/prodController')

let setRouter=(app) =>{
	const baseUrl = appConfig.apiVersion;

app.post(`${baseUrl}/signup`,userController.createUser)

app.get(`${baseUrl}/login/:username/:pwd`,userController.loginUser)

app.get(`${baseUrl}/view/:username`,prodController.viewProducts);

app.post(`${baseUrl}/add_product`,prodController.createProduct);

app.put(`${baseUrl}/update_product`,prodController.editProduct);

app.post(`${baseUrl}/delete_product`,prodController.deleteProduct);


}

module.exports ={
	setRouter : setRouter
}
