const { validationResult } = require("express-validator");
const mongoose = require('mongoose');

const Reguser = require('../model/registeredUser');
const User = require("../model/user");



const getFormByUserID = async (req, res, next) =>{
  let userId = req.params.userId;
  let user_details;
  let ridArr;
  console.log("heuyuuuuuuuu", req.params)
  try{
    user_details = await Reguser.find({}, "-name, -email, -fname, -mname, -phno, -address");
  }catch(error){
    return res.status(404).json({message:"could not find user by provided user id"});
  }

  // if(!user_details)return res.status(404).json({ message: "could not find user by provided user id" });

  try {
    ridArr = await User.findOne({ _id: userId },"-name -email -phno -password -dob");
  } catch (error) {
    return res.status(404).json({ message: "could not find registered user by provided user id" });
  }
  console.log(user_details)
  
  res.status(201).json({ ridArr: ridArr, users: user_details});
}




const getFormDetails = async (req, res) =>{
  let formId = req.params.formId;
  console.log("Rohan Singh")
  console.log(req.params)
  let form_details;
  try {
    form_details = await Reguser.findOne({ _id: formId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "could not find place by provided user id" });
  }

  console.log(form_details)
  if (!form_details) {
    return res.status(404).json({ message: "No user places exist by this user id" });
  }
  res.status(201).json({users: form_details.toObject({ getters: true })});
}











const registerSignedUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ message: "can not register data without user input" });
  }
  console.log("Hellobaby")
  console.log(req.body);
  const { name, email, fname, mname, phno, address, training, uid, status } = req.body;
  // console.log(req.file.path);

  const createdform = new Reguser({
    name, email, fname, mname, phno, address, training, uid, aadhar: req.file.path,status
  });

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return res.status(400).json({ message: "Creating a place failed..." });
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
      user.ridArr.push(createdform);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (error) {
        console.log(error);
        return res
        .status(400)
        .json({ message: "Creating a place in failed in try-catch..." });
    }
    // console.log(user);//prints whole document.
    // console.log(createdform);
      res.status(201).json({ message: "Training registration request sent..." });
};

module.exports = { registerSignedUser, getFormByUserID, getFormDetails};
