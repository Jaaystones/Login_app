const User = require('../model/User');
const bcrypt = require('bcrypt');
const genToken = require('../controller/genToken');

const register = async(req, res) => {
    try{
        const { username, email, firstName, lastName, profile, password } = req.body;
        //Error handling
        if(!username || !email || !firstName || !lastName || !profile || !password){
            return res.status(400).json({ message: 'All Asterick fields are required' });
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
        const newUser = { username, email, password:hashedPassword, profile, firstName, lastName }
        const user = await User.create(newUser)

        //validation
        if(user){
            return res.status(201).json({message: `User ${username} created successfully`, username, email, firstName, lastName, profile});
        }else{
            return res.status(400).json({message: `Registration for ${username} failed`});
        }
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Error handling
        if (!username) {
            return res.status(401).json({ message: 'Username is required' });
        }
        if (!password) {
            return res.status(401).json({ message: 'Password is required' });
        }

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up!' });
        }

        // Check password
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a token
        const token = genToken(user._id);

        // Set cookie if password is valid
        if (passwordIsValid) {
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
                sameSite: "none",
                secure: true,
            });
        }

        // Return success message
        if (user && passwordIsValid) {
            return res.status(200).json({ message: 'Login successful', username: user.username });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const getUser = async(req, res) => {
    try{
        //find user based on the params
        const username = req.params.username;
        // Find user by ID in the database
        const user = await User.findOne({username});

        // Check if user exists
        if (user){
            // Destructure user object to extract required fields
            const { _id, username, email, firstName, lastName, address, profile} = user;

            // Return user details in the response
            return res.status(200).json({ message:"Successful",
                _id,
                username,
                email,
                firstName,
                lastName,
                address,
                profile });
        } else {
            // If user is not found, return an error message
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        // Handle any potential errors during execution
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.params._id;
        const { username, email, firstName, lastName, address, profile } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Update only the provided fields
        if (username !== undefined) {
            user.username = username;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (firstName !== undefined) {
            user.firstName = firstName;
        }
        if (lastName !== undefined) {
            user.lastName = lastName;
        }
        if (address !== undefined) {
            user.address = address;
        }
        if (profile !== undefined) {
            user.profile = profile;
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Return the updated user details in the response
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
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
    verifyOTP,
    createResetSession,
    resetPassword }