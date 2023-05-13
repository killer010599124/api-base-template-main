const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    
    productId : String,
    branchId : String,
    warehouseId : String,
    quantity : Number,
    loss : Number

});

module.exports = mongoose.model('Inventory', inventorySchema);