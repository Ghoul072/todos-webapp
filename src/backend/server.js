const express = require('express');
const app = express();

const User = require('./models/user');
const Todo = require('./models/todo');

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const port = 5000;

app.use(express.json());

User.sync() // alter = true for development
    .then(() => {console.log('User model synced with database')})
    .catch((err) => {console.log(`Error syncing user model: ${err}`)});

Todo.sync() // alter = true for development
    .then(() => {console.log('ToDo model synced with database')})
    .catch((err) => {console.log(`Error syncing ToDo model: ${err}`)});

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log(`Listening on port ${port}`);
    } else {
        console.log(`Error connecting to port ${port}: ${error}`);
    }
});