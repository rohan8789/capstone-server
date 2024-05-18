const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: { type: String, required: true },
  regno: { type: String, required: true, unique:true },
  dob: { type: String, required: true },
  regAuth: { type: String, required: true },
  phno: { type: String, required: true },
  address: { type: String, required: true },
  ngoObj: { type: String, required: true },
  uid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

ngoSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Ngo", ngoSchema);
