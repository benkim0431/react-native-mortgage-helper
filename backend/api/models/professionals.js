const mongoose = require("mongoose");
const schema = mongoose.Schema;

const professionalsSchema = new schema({
  type: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  workNumber: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  }
});

const Professionals = mongoose.model("Professionals", professionalsSchema);

module.exports = Professionals;
