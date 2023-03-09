const mongoose = require("mongoose");
const schema = mongoose.Schema;

const propertiesSchema = new schema({
  address: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    required: true
  },
  annualPropertyTaxes: {
    type: String
  },
  condoFees: {
    type: String
  }
});

const Properties = mongoose.model("Properties", propertiesSchema);

module.exports = Properties;
