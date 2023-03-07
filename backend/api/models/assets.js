const mongoose = require("mongoose");
const schema = mongoose.Schema;

const assetsSchema = new schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  value: {
    type: String,
    required: true
  },
  includedInDownPayment: {
    type: String
  }
});

const Assets = mongoose.model("Assets", assetsSchema);

module.exports = Assets;
