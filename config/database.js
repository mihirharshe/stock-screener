const mongoose = require('mongoose');


const database = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connection with DB established`);
    }
    catch (err) {
        console.error(err);
        console.error("Unable to connect with Database")
    }
}

module.exports = database;