const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("User List");
});

router.post('/', (req, res) => {
    res.send("Create user");
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