const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexController);
app.use('/', usersController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});