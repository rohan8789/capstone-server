const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const registeredUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  phno: {type: String, required: true},
  address: { type: String, required: true },
  aadhar: { type: String, required: true },
  training: {type: String, required: true},
  uid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

registeredUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Reguser", registeredUserSchema);
