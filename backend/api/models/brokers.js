const mongoose = require("mongoose");
const schema = mongoose.Schema;

const brokerSchema = new schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    companyName: {
        type: String,
        required: true
    },
    percentageFee: {
        type: String,
        required: true
    },
    province: {
        type: String
    }
})

const Broker = mongoose.model("Broker", brokerSchema);

module.exports = Broker