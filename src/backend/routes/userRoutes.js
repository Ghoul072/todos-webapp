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
    };
});

router.get('/:userId', async (req, res) => {
    var foundUser = await User.findByPk(req.params.userId);
    if (!foundUser) {
        res.send({ error: 'User not found' })
    } else {
        res.send(foundUser);
    };
});

router.put('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.params.userId);
        await currentUser.update(req.body);
        res.status(201).json(currentUser);
    } catch (error) {
        res.status(400).json({ error: error.errors[0].message });
    };
});

router.delete('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.params.userId);
        if (!currentUser) {return res.status(404).json({ error: 'User not found' })};
        await currentUser.destroy();
        res.status(200).json({ message: 'User deleted successfully '});
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;