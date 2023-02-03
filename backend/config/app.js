require('dotenv/config');
const express = require('express');
const { authRoutes, publicRoutes} = require('./routes');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use("/hown/api", authRoutes);
app.use("/hown/public", publicRoutes);
app.use(bodyParser.json());

module.exports = app;