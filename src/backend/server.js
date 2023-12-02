const express = require('express');
const app = express();
const User = require('./models/user');
const Todo = require('./models/todo');
const port = 5000;

app.use(express.json());

User.sync({ alter: true }) // alter = true for development
    .then(() => {console.log('User model synced with database')})
    .catch((err) => {console.log(`Error syncing user model: ${err}`)});

Todo.sync({ alter: true }) // alter = true for development
    .then(() => {console.log('ToDo model synced with database')})
    .catch((err) => {console.log(`Error syncing ToDo model: ${err}`)});


app.get('/', (req, res) => {
    res.send("test");
});


app.listen(port, (error) => {
    if (!error) {
        console.log(`Listening on port ${port}`);
    } else {
        console.log(`Error connecting to port ${port}: ${error}`);
    }
});