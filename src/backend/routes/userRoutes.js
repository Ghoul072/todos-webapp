const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const Token = require('../models/token');

const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    res.send(await User.findAll());
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: {email} });
        if (!user) { return res.status(404).json('User not found') };

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) { return res.status(401).json('Invalid Password') };

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {'expiresIn': '15m'});
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {'expiresIn': '1h'});

        const token = await Token.findOne({ where: { userId: user.id } });
        if (token) {
            await token.update({ accessToken, refreshToken });
        }
        else {
            await Token.create({ accessToken, refreshToken, 'userId': user.id });
        }

        res.status(200).json({ accessToken, refreshToken });

    } catch { res.status(500).json({ 'error': 'Server Error' }) };
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.errors[0].message });
    };
});

router.get('/:userId', async (req, res) => {
    var foundUser = await User.findByPk(req.params.userId);
    if (!foundUser) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.send(foundUser);
    };
});

router.post('/refresh', async (req, res) => {
    try {
        const token = req.body.refreshToken;
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const userId = decoded.userId;

        const user = await User.findByPk(userId);
        if (!user) { return res.status(401).json({ 'error': 'Unauthorized - Invalid token' }) };

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {'expiresIn': '15m'});
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {'expiresIn': '1h'});

        const existingToken = await Token.findOne({ where: { userId: user.id } });
        if (existingToken) {
            await existingToken.update({ accessToken, refreshToken });
        }
        else {
            await Token.create({ accessToken, refreshToken, 'userId': user.id });
        }

        res.status(200).json({ accessToken, refreshToken });
    } catch { res.status(500).json({ 'error': 'Server Error' }) };
});

router.put('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.params.userId);
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (currentUser.id != req.userId) {
            return res.status(403).json({ error: 'Forbidden - Access Denied' });
        }

        await currentUser.update(req.body);
        res.status(201).json(currentUser);
    } catch (error) {
        res.status(400).json({ error: error.errors[0].message });
    };
});

router.delete('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.params.userId);
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' })
        };

        if (currentUser.id != req.userId) {
            return res.status(403).json({ error: 'Forbidden - Access Denied' });
        }

        await currentUser.destroy();
        res.status(200).json({ message: 'User deleted successfully '});
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;