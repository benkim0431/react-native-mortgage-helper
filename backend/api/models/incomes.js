const mongoose = require("mongoose");
const schema = mongoose.Schema;

const incomeSchema = new schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  businessType: {
    type: String,
  },
  businessName: {
    type: String,
  },
  businessAddress: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
  // businessAddress: {type: String},
  jobTitle: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  paymentType: {
    type: String
  },
  amount: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  }
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
