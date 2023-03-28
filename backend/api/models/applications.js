const mongoose = require("mongoose");
const schema = mongoose.Schema;

const applicationSchema = new schema({
    clientId: mongoose.Schema.Types.ObjectId,
    brokerId: mongoose.Schema.Types.ObjectId,
    lastModified: {
        type: String,
        required: true
    },
    visualizedBy: {
        type: [String],
    },
    status: {
        type: String,
        required: true
    },
    totalValue: {
        type: String,
        required: true
    },
    downPaymentValue: {
        type: String
    },
    province: {
        type: String
    },
    intendedUseOfProperty: {
        type: String
    },
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    assets: [{type: mongoose.Schema.Types.ObjectId, ref: "Assets"}],
    incomes: [{type: mongoose.Schema.Types.ObjectId, ref: "Income"}],
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: "Properties"}],
    professionals: [{type: mongoose.Schema.Types.ObjectId, ref: "Professionals"}]
    // address: {type: String},
    // assets: [{type: String}],
    // incomes: [{type: String}],
    // properties: [{type: String}],
    // professionals: [{type: String}]
})

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application