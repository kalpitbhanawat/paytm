const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:1234@cluster0.vhu4fyq.mongodb.net/paytm")


const UserSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minLength:6

    } 
    
})
const accountSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
    
})
const User=mongoose.model('User',UserSchema);
const Account = mongoose.model('Account', accountSchema);
module.exports={
    User,Account
}