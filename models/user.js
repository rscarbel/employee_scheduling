const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true, minLength: [8, 'Must be at least {VALUE} digits long'], maxlength:[100,'Must be fewer than {VALUE} characters long'], match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/,'The password must begin with a letter\nThe password must contain at least 1 lowercase letter.\nThe password must contain at least 1 uppercase letter.\nThe password must contain at least 1 number.\nThe password must contain at least one special character.\nThe password must be at least 8 characters long.']},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  companyName: {type: String, required: true, immutable: true}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);