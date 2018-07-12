const mongoose = require('mongoose')
const Prod = mongoose.model('Prod')
const express = require('express')
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib')
const check = require('../libs/checkLib')



let viewProducts = (req, res) => {
    Prod.find({ 'userName': req.params.username }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:view Products', 10)
            let apiResponse = response.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)

        } else if (check.isEmpty(result)) {
            logger.captureInfo(`No Product Found`, 'controller:view Products', 10)
            let apiResponse = response.generate(false, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.captureInfo(`Products Found`, 'controller:view Products', 10)
            let apiResponse = response.generate(false, 'Products Found', 200, result)
            res.send(apiResponse)
        }
    })

}

let createProduct = (req, res) => {
    let newProduct = new Prod({
        userName: req.body.username,
        title: req.body.title,
        code: req.body.code,
        stock: req.body.stock,
        expiry: req.body.expiry.split('T')[0],
        createdOn: Date.now()
    });

    newProduct.save((err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:create Products', 10)
            let apiResponse = response.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else {
            logger.captureInfo(` Product added successfully`, 'controller:create Products', 10)
            let apiResponse = response.generate(false, 'Product added successfully', 200, result)
            res.send(apiResponse)
        }
    })
}

let editProduct = (req, res) => {

    let options = req.body;

    Prod.update({ 'code': req.body.code }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:editProduct',10)
            let apiResponse = response.generate(true, 'Some error Occured!!', 500, err)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No Product Found!!','controller:editProduct',10)
            let apiResponse = response.generate(false, 'No Product Found', 404, err)
            res.send(apiResponse)
        } else {
            logger.captureInfo('Product edited Successfully !!','controller:editProduct',10)
            let apiResponse = response.generate(false, 'Product edited Successfully !!', 200, result)
            res.send(apiResponse)
        }
    });
}

let deleteProduct = (req, res) => {
    Prod.remove({ 'code': req.body.code},(err, result) => {
        console.log(req.body.code);
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:deleteProduct', 10)
            let apiResponse = response.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)

        } else if (check.isEmpty(result)) {
            logger.captureInfo(`No Product Found`, 'controller:deleteProduct', 10)
            let apiResponse = response.generate(false, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.captureInfo(`Product Deleted`, 'controller:deleteProduct', 10)
            let apiResponse = response.generate(false, 'Product Deleted', 200, result)
            res.send(apiResponse)
        }
    })

}

module.exports = {
    createProduct: createProduct,
    viewProducts: viewProducts,
    editProduct: editProduct,
    deleteProduct :deleteProduct
}