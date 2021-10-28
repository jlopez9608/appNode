const mongoose = require('mongoose');
const util = require('util');
const debuggin = util.debuglog('dev');

const dbConnection = async  ()=>{

    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        debuggin('Database online');
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    dbConnection
}