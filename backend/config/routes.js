const express = require('express');
const authRoutes = express.Router();
const publicRoutes = express.Router();
const auth = require('./auth');
const UserController = require('../api/controllers/UserController');

publicRoutes.post("/login", UserController.login)
publicRoutes.post("/register", UserController.register)

authRoutes.use(auth);

//USER APIs
authRoutes.get("/user/:uuid", UserController.getByUuid);
authRoutes.delete("/user/:uuid", UserController.remove);
authRoutes.post("/user/:uuid", UserController.edit);

exports.authRoutes = authRoutes;
exports.publicRoutes = publicRoutes;
