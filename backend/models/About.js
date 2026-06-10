const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    name: String,
    bio: String,
    skills: [String]
});

module.exports = mongoose.model('About', AboutSchema);
