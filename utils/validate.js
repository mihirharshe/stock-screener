const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const StockModel = require('../models/stocks');

const validateUsername = async (username) => {
    let user = await UserModel.findOne({
        username: username
    })
    return user ? false : true;
}

const validateSymbol = async (symbol, id) => {
    let stock = await StockModel.findOne({
        name: symbol,
        userId: id,
    })
    return stock ? true : false;
}

const verifyJwt = async (token) => {
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (err) {
        console.log(err)
    }
}

// const userAuth = passport.authenticate("jwt", { session: false });


module.exports = { validateUsername, verifyJwt, validateSymbol };