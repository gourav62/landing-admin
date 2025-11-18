const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  city: String,
  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Contact', ContactSchema);
