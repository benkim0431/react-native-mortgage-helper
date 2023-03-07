const mongoose = require("mongoose");
const schema = mongoose.Schema;

const addressSchema = new schema({
  streetNumber: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  rentValue: {
    type: String
  },
  moveInDate: {
    type: String
  }
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
