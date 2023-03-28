const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clientSchema = new schema({
    userId: mongoose.Schema.Types.ObjectId,
    firstTimeBuyer: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    numberOfDependents: {
        type: String
    },
    currentAddress: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    passedAddresses: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}]
    // currentAddress: {type: String},
    // passedAddresses: [{type: String}]
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client