const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Get all ToDos");
});

router.post('/', (req, res) => {
    res.send('Create new todo');
});

router.get('/:todoId', (req, res) => {
    res.send(`Get ToDo with ID: ${req.params.todoId}`);
});

router.put('/:todoId', (req, res) => {
    res.send(`Edit todo with ID: ${req.params.todoId}`);
});

router.delete('/:todoId', (req, res) => {
    res.send(`Delete todo with ID ${req.params.todoId}`);
});

module.exports = router;