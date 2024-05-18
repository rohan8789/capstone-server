const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phno: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true, minlength: 6 },
  ridArr: [{ type: mongoose.Types.ObjectId, required: true, ref: "Reguser" }],
  ngoIdArr: [{ type: mongoose.Types.ObjectId, required: true, ref: "Ngo" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
