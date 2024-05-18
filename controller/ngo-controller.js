const mongoose = require("mongoose");

const Reguser = require("../model/registeredUser");
const User = require("../model/user");
const Ngo = require("../model/ngo");






const getRegisteredNGObyUserId = async (req, res) => {
  let userId = req.params.userId;
  
  let ngo_details;
  let nidArr;
  try {
    ngo_details = await Ngo.find({}, "-regno, -dob, -regAuth, -phno, -address, -ngoObj");
  } catch (error) {
    console.log(error)
    return res
    .status(404)
    .json({ message: "could not find place by provided user id" });
  }
  console.log("ngo_details");
  console.log(ngo_details);
  
  try {
    nidArr = await User.findOne({ _id: userId },"-name -email -phno -password -dob");
  } catch (error) {
    console.log(error);
    return res
    .status(404)
    .json({ message: "could not find place by provided user id" });
  }
  
  console.log("nidArr");
  console.log(nidArr);
  
  res.status(201).json({nidArr: nidArr.ngoIdArr, users: ngo_details.map((user) => user.toObject({ getters: true }))});
}




const getNGOFormDetails = async (req, res) =>{
  let formId = req.params.formId;
  console.log("Rohan Singh");
  console.log(req.params);
  let form_details;
  try {
    form_details = await Ngo.findOne({ _id: formId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "could not find place by provided user id" });
  }

  console.log(form_details);
  if (!form_details) {
    return res.status(404).json({ message: "No user places exist by this user id" });
  }
  res.status(201).json({ users: form_details.toObject({ getters: true }) });
}









const registerNGO = async (req, res, next) => {
  const { name, regno, dob, regAuth, phno, address, ngoObj, uid } = req.body;
  // console.log(req.body)
  let checkRegistered;
  try {
    checkRegistered = await Ngo.findOne({ regno: regno });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "NGO already registered. Try again" });
  }
  const createdform = new Ngo({
    name,
    regno,
    dob,
    regAuth,
    phno,
    address,
    ngoObj,
    uid
  });
  
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: "User with this id does not exist." });
  }
  if (!user) {
    return res
    .status(400)
    .json({ message: "User with this uid does not exist..." });
  }
  
    try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdform.save({ session: sess });
    user.ngoIdArr.push(createdform);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "NGO Registration failed..." });
  }
  console.log(user); //prints whole document.
//   console.log(createdform);
  res.status(201).json({ ngoform: createdform, message:"NGO registration request sent..." });
};

module.exports = { registerNGO, getRegisteredNGObyUserId, getNGOFormDetails };
