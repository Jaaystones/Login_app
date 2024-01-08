const User = require('../model/User')

const verifyUserMiddleware = (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up!' });
        }

        // Attach the user information to the request for further processing
        req.user = user;

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = verifyUserMiddleware;
