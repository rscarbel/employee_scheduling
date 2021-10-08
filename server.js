const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/home', (req,res) => {
  res.render('home.ejs')
});

app.get('*', (req,res) => {
  res.redirect('/home')
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});