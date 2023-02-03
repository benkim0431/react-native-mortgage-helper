const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

//Used to connect with mongo db using mongoose
const mongoose = require("mongoose");

//Add the dbUri that were exported in the config file
const {port, dbUri} = require('./config');
const app = require("./config/app");

//Connect with the mongodb database
mongoose.connect(dbUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    })
}).catch(err => {
    console.log(err);
});
