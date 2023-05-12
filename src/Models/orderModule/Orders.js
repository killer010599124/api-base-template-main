const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    
    tableId : String,
    branchId : String,
    status : String,
    products : String
    
});

module.exports = mongoose.model('Orders', ordersSchema);