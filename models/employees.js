const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  availability: {
    monday: {type: Boolean, default: false},
    tuesday: {type: Boolean, default: false},
    wednesday: {type: Boolean, default: false},
    thursday: {type: Boolean, default: false},
    friday: {type: Boolean, default: false},
    saturday: {type: Boolean, default: false},
    sunday: {type: Boolean, default: false},
  }
},{timestamps:true});

module.exports = mongoose.model('Employee', employeeSchema)