const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    stockList: [String]
    
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;