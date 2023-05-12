const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitchensSchema = new Schema({
    ktype: String,
    branchId : String,
    products : String
});

module.exports = mongoose.model('Kitchens', kitchensSchema);