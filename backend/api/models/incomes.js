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
  businessCountry: {
    type: String,
  },
  businessAddress: mongoose.Schema.Types.ObjectId,
  jobTitle: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  paymentType: {
    type: String
  },
  moveInDate: {
    type: String
  },
  incomeValue: {
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
