const mongoose = require('mongoose');
const { Schema } = mongoose
// const UserModel = require('./users')

const stockSchema = Schema({
        name: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
});

const StockModel = mongoose.model('Stock', stockSchema);

module.exports = StockModel;