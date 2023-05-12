const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    number: Number,
    branchId : String,
    status : String,
    currentOrder : String,
});

module.exports = mongoose.model('Tables', tableSchema);