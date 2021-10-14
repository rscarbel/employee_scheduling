const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true, minLength: 8, maxlength: 100},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  companyName: {type: String, required: true, immutable: true}}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);