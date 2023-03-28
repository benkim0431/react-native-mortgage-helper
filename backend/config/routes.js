const express = require('express');
const authRoutes = express.Router();
const publicRoutes = express.Router();
const auth = require('./auth');
const UserController = require('../api/controllers/UserController');
const BrokerController = require('../api/controllers/BrokerController');
const ClientController = require('../api/controllers/ClientController');
const ApplicationController = require('../api/controllers/ApplicationController');

publicRoutes.post("/login", UserController.login)
publicRoutes.post("/register", UserController.register)

authRoutes.use(auth);

//USER APIs
authRoutes.get("/user/:uuid", UserController.getByUuid);
authRoutes.get("/user/id/:userId", UserController.getByUserId);
authRoutes.delete("/user/:uuid", UserController.remove);
authRoutes.post("/user/:uuid", UserController.edit);

//BROKER APIs
authRoutes.put("/broker", BrokerController.add);
authRoutes.get("/broker/province/:province", BrokerController.getByProvince);
authRoutes.get("/broker/:userId", BrokerController.getByUserId);
authRoutes.delete("/broker/:userId", BrokerController.remove);
authRoutes.post("/broker/:userId", BrokerController.edit);

//CLIENT APIs
authRoutes.put("/client", ClientController.add);
authRoutes.get("/client/:userId", ClientController.getByUserId);
authRoutes.delete("/client/:userId", ClientController.remove);
authRoutes.post("/client/:userId", ClientController.edit);

//APPLICATION APIs
authRoutes.put("/application", ApplicationController.add);
authRoutes.get("/application/:applicationId", ApplicationController.getById);
authRoutes.get("/application/client/:clientId", ApplicationController.getByClientId);
authRoutes.get("/application/broker/:brokerId", ApplicationController.getByBrokerId);
authRoutes.post("/application/:applicationId", ApplicationController.edit);

exports.authRoutes = authRoutes;
exports.publicRoutes = publicRoutes;