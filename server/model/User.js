const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter a username'],
        unique: [true, 'Username already exists']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Password must be at least 6 characters'],
        unique: false
    },
    email:{
        type: String,
        required: [true, 'Please enter a email address'],
        unique: true
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    mobile:{ type: Number},
    address:{ type: String},
    profile:{ type: String},   

},
{ timestamps: true })

module.exports = mongoose.model('User', userSchema);