const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
const User = require("../models/users");

async function register(req, res) {
  try {
    let existingUser = await User.findOne({
      uuid: req.body.uuid.toString().trim(),
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    let user = new User({
      uuid: req.body.uuid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      workNumber: req.body.workNumber,
      photoURL: req.body.photoURL,
    });

    user
      .save()
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  //For now, the token will never expire.
  // We can implement tokens that are renewed from time to time
  try {
    let user = await User.findOne({ uuid: req.body.uuid.toString().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not registered." });
    }

    const userObj = { uuid: req.body.uuid.trim(), device: req.body.device };
    const token = jwt.sign(userObj, secret);
    res.status(200).json({ message: "Logged In", token });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

async function getByUuid(req, res) {
  try {
    let user = await User.findOne({ uuid: req.params.uuid.toString().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

async function getByUserId(req, res) {
  try {
    let user = await User.findOne({ _id: req.params.userId.toString().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

async function remove(req, res) {
  try {
    let user = await User.findOne({ uuid: req.params.uuid.toString().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let result = await User.deleteOne({ uuid: req.params.uuid.trim() });
    return res.status(200).json({ message: "User deleted.", result });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

async function edit(req, res) {
  try {
    let user = await User.findOne({ uuid: req.params.uuid.toString().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }

    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }

    if (req.body.workNumber) {
      user.workNumber = req.body.workNumber;
    }

    if (req.body.photoURL) {
      user.photoURL = req.body.photoURL;
    }

    if (req.body.type) {
      user.type = req.body.type;
    }

    if (req.body.photoURL) {
      user.photoURL = req.body.photoURL;
    }

    user
      .save()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

exports.register = register;
exports.login = login;
exports.getByUuid = getByUuid;
exports.getByUserId = getByUserId;
exports.remove = remove;
exports.edit = edit;
