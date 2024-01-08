const User = require('../model/User');
const bcrypt = require('bcrypt');

const register = async(req, res) => {
    try{
        const { username, email, profile, password } = req.body;
        //Error handling
        if(!username || !email || !profile || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }
        //Check for username and email duplicate
        const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();
        if(duplicateUsername){
            return res.status(409).json({ message: 'Username already exists'});
        }
        const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec();
        if(duplicateEmail){
            return res.status(409).json({ message: 'Email already exists'});
        }
        // Check for password
        if(password.length < 6){
            return res.status(403).json({ message: 'Password must be at least 6 characters'})
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10) // salt rounds

        //Save newly registered user into database
        const newUser = { username, email, password:hashedPassword, profile }
        const user = await User.create(newUser)

        //validation
        if(user){
            return res.status(201).json({message: `User ${username} created successfully`});
        }else{
            return res.status(400).json({message: `Registration for ${username} failed`});
        }
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const login = async(req, res) => {
    return res.json('login route');
}

const getUser = async(req, res) => {
    return res.json('user route');
}

const updateUser = async(req, res) => {
    return res.json('update route');
}

const genOTP = async(req, res) => {
    return res.json('gen route');
}

const verifyOTP = async(req, res) => {
    return res.json('verify route');
}

const createResetSession = async(req, res) => {
    return res.json('session route');
}

const resetPassword = async(req, res) => {
    return res.json('password route');
}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    genOTP,
    verifyOTP,
    createResetSession,
    resetPassword }