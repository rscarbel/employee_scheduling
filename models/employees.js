const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  availability: {
    m: String,
    t: String,
    w: String,
    tr: String,
    f: String,
    sat: String,
    sun: String,
  }
},{timestamps:true})