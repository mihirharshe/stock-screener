const mongoose = require('mongoose');

const database = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/MarketWatch", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connection with DB established`);
    }
    catch (err) {
        console.error("Unable to connect with Database")
    }
}

module.exports = database;