const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    uuid: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    workNumber: {
        type: String
    },
    type: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User