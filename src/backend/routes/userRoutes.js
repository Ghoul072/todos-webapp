const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    res.send(await User.findAll());
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.errors[0].message });
    }
});

router.get('/:userId', (req, res) => {
    res.send(`Information for user with ID: ${req.params.userId}`);
});

router.put('/:userId', (req, res) => {
    res.send(`Update user with ID: ${req.params.userId}`);
});

router.delete('/:userId', (req, res) => {
    res.send(`Delete user with ID: ${req.params.userId}`);
});

module.exports = router;