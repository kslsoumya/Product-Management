const mongoose = require('mongoose')
const Schema = mongoose.Schema


let prodModel = new Schema({
    userName : {
        type:String,
        default:''
    },
    title :{
        type:String,
        unique:true
    },
    code :{
        type:String,
        default:'#fff'
    },
    stock :{
        type:Number,
        default:0
    },
    expiry :{
        type:Date
    },
    createdOn :{
        type:Date,
        default:Date.now()
    }
})

mongoose.model('Prod',prodModel);