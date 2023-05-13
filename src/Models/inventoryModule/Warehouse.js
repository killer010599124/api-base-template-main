const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    
    name : String,
    branchId : String

});

module.exports = mongoose.model('Warehouse', warehouseSchema);