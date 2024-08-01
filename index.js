const express = require('express');
const app = express();
require('dotenv').config();
const todoRoutes = require('./routes/todo')
const bodyparser = require('body-parser')

const port = process.env.PORT || 3001;


app.use(bodyparser.json());

app.use('/todo',todoRoutes)

app.get('/', (req, res) => {
    res.send("hello world")  
})

app.listen(port, () => {
    console.log("surver is running on port 3000 or 3001");
})