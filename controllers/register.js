const UserModel = require('../models/users');
const StockModel = require('../models/stocks');
const { validateUsername } = require('../utils/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { verifyJwt } = require('../utils/validate')
const SECRET = process.env.SECRET

const userRegister = async (userDetails, res) => {
    try {
        let usernameNotTaken = await validateUsername(userDetails.username);
        if (!usernameNotTaken) {
            return res.status(401).json({
                success: false,
                message: `Username is already taken.`,
            });
        }
        let hashedPassword = bcrypt.hashSync(userDetails.password, 10)
        const newUser = new UserModel({
            username: userDetails.username,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: `You are successfully registered, redirecting to login page.`,
            user: {
                id: newUser._id,
                username: newUser.username
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Unable to create your account.`,
            error: err
        })
    }
}

const userLogin = async (userDetails, res) => {
    try {
        let user = await UserModel.findOne({
            username: userDetails.username
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: `Incorrect username`
            })
        }

        let isMatch = bcrypt.compareSync(userDetails.password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: `Incorrect password`
            })
        }
        const payload = {
            id: user._id,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })

        return res.status(200).json({
            success: true,
            message: `Successfully logged in.`,
            token: `Bearer ${token}`
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Unable to login into your account`,
            error: err
        })
    }
}

const userCheck = async (user) => {
    try {
        let foundUser = await UserModel.findOne({
            username: user.username
        });
        // console.log('foundUser', foundUser);
        return foundUser ? true : false
    } catch (err) {
        console.error(err);
    }
}

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
    // console.log(token);
    // console.log('symbol',symbol)
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
    userRegister,
    userLogin,
    userCheck,
    getStocks,
    addStocks,
    deleteStocks
}