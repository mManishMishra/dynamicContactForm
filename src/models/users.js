const mongoose = require("mongoose");
const validator = require("validator");



// Creating Schema = how data will be validated before storing in database
const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength : 3,
        maxlength : 26
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format");
            }
        }
    },
    phone:{ 
        type: Number
         },
    message:{
        type:String,
        required:true,
        minlength: 5
    },
    // },
    date: {
        type:Date,
        default:Date.now
    }
})

// Now we need to create a collection to use this schema on 
const User = mongoose.model("User" , userSchema);
module.exports = User ;