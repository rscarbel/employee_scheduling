const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema ({
  companyName: { type: String, unique: true},
  employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}]
},{timestamps:true})

module.exports = mongoose.model('Company',companySchema)