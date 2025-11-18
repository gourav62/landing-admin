const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  image: String,
  name: {type: String, required: true},
  description: String,
  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Project', ProjectSchema);
