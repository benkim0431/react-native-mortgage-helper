const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    firstNname: {
        type: String,
        required: true
    },
    lastNname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    workNumber: {
        type: String
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User