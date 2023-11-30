const express = require('express');
const app = express();

const port = 5000;


app.get('/', (req, res) => {
    res.send("test");
});


app.listen(port, (error) => {
    if (!error) {
        console.log(`Listening on port ${port}`);
    } else {
        console.log(`Error connecting to port ${port}: ${error}`)
    }
});