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
    }
})

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application