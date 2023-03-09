const mongoose = require("mongoose");
const schema = mongoose.Schema;

const applicationSchema = new schema({
    clientId: mongoose.Schema.Types.ObjectId,
    brokerId: mongoose.Schema.Types.ObjectId,
    lastModified: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    totalValue: {
        type: String,
        required: true
    },
    downPaymentPercentage: {
        type: String
    },
    province: {
        type: String
    },
    intendedUseOfProperty: {
        type: String
    },
    address: mongoose.Schema.Types.ObjectId,
    assets: [mongoose.Schema.Types.ObjectId],
    incomes: [mongoose.Schema.Types.ObjectId],
    properties: [mongoose.Schema.Types.ObjectId],
    professionals: [mongoose.Schema.Types.ObjectId]
})

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application