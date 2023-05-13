const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchesSchema = new Schema({
    location: String,
});

module.exports = mongoose.model('Branches', branchesSchema);