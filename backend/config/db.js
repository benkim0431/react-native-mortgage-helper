//Used to connect with mongo db using mongoose
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");


//Add the dbUri that were exported in the config file
const {dbUri, nodeEnv} = require('./config');
const app = require('./app');

function connect() {
    return new Promise((resolve, reject) => {
        //Connect with the mongodb database
        mongoose.connect(dbUri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }).then((res, err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function close(){
    return mongoose.disconnect();
}

module.exports = { connect, close }