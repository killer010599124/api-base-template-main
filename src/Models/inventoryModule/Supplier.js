const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    
    name : String,
    contact : String

});

module.exports = mongoose.model('Supplier', supplierSchema);