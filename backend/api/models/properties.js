const mongoose = require("mongoose");
const schema = mongoose.Schema;

const propertiesSchema = new schema({
  address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
  value: {
    type: String,
    required: true
  },
  annualPropertyTaxes: {
    type: String
  },
  condoFees: {
    type: String
  },
  monthlyPayment: {
    type: String
  }
});

const Properties = mongoose.model("Properties", propertiesSchema);

module.exports = Properties;
