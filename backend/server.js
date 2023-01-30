const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

//Used to connect with mongo db using mongoose
const mongoose = require("mongoose");

//Add the dbUri that were exported in the config file
const {port, dbUri} = require('./config');
const userRouter = require('./routes/users');

const app = express();

//This will allow us to use body message in post requisitions
app.use(express.json());
//All the cookies will be available in the app
app.use(cookieParser());
app.use(cors());

//Sets that every view that will be loaded, will be loaded from the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res)=> {
    res.status(200).render('index', {
        message: "Success"
    });
});

app.use("/api/users", userRouter);

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
