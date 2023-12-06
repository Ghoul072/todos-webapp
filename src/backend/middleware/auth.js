const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ 'error': 'Unauthorized - No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).json({ 'error': 'Unauthorized - Invalid token' });
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error){ return res.status(401).json({ 'error': 'Unauthorized - Invalid token' }) };
}

module.exports(auth);