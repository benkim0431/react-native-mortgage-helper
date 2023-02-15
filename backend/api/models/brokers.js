const mongoose = require("mongoose");
const schema = mongoose.Schema;

const brokerSchema = new schema({
    userId: mongoose.Schema.Types.ObjectId,
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