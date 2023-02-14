const express = require('express');
const authRoutes = express.Router();
const publicRoutes = express.Router();
const auth = require('./auth');
const UserController = require('../api/controllers/UserController');
const BrokerController = require('../api/controllers/BrokerController');

publicRoutes.post("/login", UserController.login)
publicRoutes.post("/register", UserController.register)

authRoutes.use(auth);

//USER APIs
authRoutes.get("/user/:uuid", UserController.getByUuid);
authRoutes.delete("/user/:uuid", UserController.remove);
authRoutes.post("/user/:uuid", UserController.edit);

//BROKER APIs
authRoutes.put("/broker", BrokerController.add);
authRoutes.get("/broker/province/:province", BrokerController.getByProvince);
authRoutes.get("/broker/:userId", BrokerController.getByUserId);
authRoutes.delete("/broker/:userId", BrokerController.remove);
authRoutes.post("/broker/:userId", BrokerController.edit);


exports.authRoutes = authRoutes;
exports.publicRoutes = publicRoutes;
