const UserModel = require('../models/users');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getStocks = async (req, res) => {
    const token = (req.headers['authorization'])?.substring(7);
    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        const decoded = jwt.verify(token, SECRET);
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: `Invalid token`
            })
        }
        return res.status(200).json({
            success: true,
            stocks: user.stockList
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}

const addStocks = async (req, res) => {
    const token = (req.headers[`authorization`])?.substring(7);
    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        const decoded = jwt.verify(token, SECRET);
        await UserModel.updateOne(
            { _id: decoded.id },
            { $push: { stockList: req.body.symbol } }
        )

        return res.status(201).json({
            success: true,
            message: `Symbol successfully added`,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}

const deleteStocks = async (req, res) => {
    const token = (req.headers['authorization'])?.split(" ")[1]
    const symbol = (req.params.symbol)?.toUpperCase();
    try {
        if(!token) {
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        const decoded = jwt.verify(token, SECRET);
        const user = await UserModel.findById(decoded.id);
        if(!user.stockList.includes(symbol)) {
            return res.status(404).json({
                success: false,
                message: `Symbol not found`
            })
        }
        await UserModel.updateOne(
            { _id: decoded.id },
            { $pull: { stockList: { $in: [`${symbol}`] } }}
        );
        
        return res.status(200).json({
            success: true,
            message: `Symbol successfully deleted`
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err
        })
    }
}

module.exports = {
    getStocks,
    addStocks,
    deleteStocks
}