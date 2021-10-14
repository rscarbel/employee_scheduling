const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = ({
  monday: Array,
  tuesday: Array,
  wednesday: Array,
  thursday: Array,
  friday: Array,
  saturday: Array,
  sunday: Array
});

module.exports = mongoose.model('schedule', scheduleSchema);