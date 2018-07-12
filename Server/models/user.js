const mongoose = require('mongoose')

const Schema = mongoose.Schema;


let userSchema = new Schema (
{
	userName :{
		type:String,
		unique : true
	},
	password :{
		type: String
	},
	email :{
		type:String,
		unique:true,
	},
	mobile :{
		type:Number,
		default:''
	},
	dob :{
		type:Date,
		default :''
	},
	createdOn : {
		type:Date,
		default:Date.now()
	},
	products:[]

})


mongoose.model('User',userSchema)

