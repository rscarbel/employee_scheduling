const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  companyName: String,
  availability: {
    monday: {type: Boolean, default: false},
    tuesday: {type: Boolean, default: false},
    wednesday: {type: Boolean, default: false},
    thursday: {type: Boolean, default: false},
    friday: {type: Boolean, default: false},
    saturday: {type: Boolean, default: false},
    sunday: {type: Boolean, default: false}
  },
  createdBy: {type: String, default: 'Admin'},
  lastEditedBy: {type: String, default: 'Admin'}
},{timestamps:true});

module.exports = mongoose.model('Employee', employeeSchema)