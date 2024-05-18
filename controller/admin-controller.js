const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

const Admin = require("../model/admin");
const Reguser = require("../model/registeredUser")
const Ngo = require("../model/ngo");


const deleteRegForm = async(req, res) =>{
    const rid = req.params.rid;
    console.log(rid);
    let reg_details;
    try {
      reg_details = await Reguser.findById(rid).populate("uid");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong while deleting plsce" });
    }
    console.log("HELLLLOOOOO babyyyy");
    console.log(reg_details);
    if (!reg_details) {
      return res.status(400).json({ message: "Could not find NGO to reject by this id" });
    }

    try {
      const sess = await mongoose.startSession();
      await sess.withTransaction(async () => {
        await Reguser.deleteOne({ _id: rid }); // No need for session argument
        reg_details.uid.ridArr.pull(rid);
        await reg_details.uid.save(); // No need for session argument
      });
      sess.commitTransaction();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Could not reject NGO form..." });
    }
}


const updateRegStatus = async (req, res) =>{
    const rid = req.params.rid;
    console.log(rid);
    let details;
    try {
      details = await Reguser.findOne({ _id: rid });
    } catch (err) {
      console.log(err);
    }
    details.status = "Accepted";
    try {
      await details.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error while saving application status to database" });
    }
    return res.status(200).json({ message: "Registration for training program accepted" });
}



const deleteNGO = async (req, res) =>{
    const ngo_id = req.params.ngoid;
    console.log(ngo_id)
    let ngo_details;
    try {
       ngo_details = await Ngo.findById(ngo_id).populate("uid");
    } catch (error) {
        console.log(error)
      return res
        .status(500)
        .json({ message: "Something went wrong while deleting plsce" });
    }
    console.log("HELLLLOOOOO babyyyy")
    console.log(ngo_details)
    if(!ngo_details){
         return res.status(400).json({ message: "Could not find NGO to reject by this id" });
    }

    try {
      const sess = await mongoose.startSession();
      await sess.withTransaction(async () => {
        await Ngo.deleteOne({ _id: ngo_id }); // No need for session argument
        ngo_details.uid.ngoIdArr.pull(ngo_id);
        await ngo_details.uid.save(); // No need for session argument
      });
      sess.commitTransaction();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Could not reject NGO form..." });
    }
    console.log('hii');
    // console.log(place);
    res.status(200).json({ message: "NGO form rejected..." });

}


const updateStatus = async (req, res, next) =>{
    console.log(req.params);
    const ngoid = req.params.ngoid;
    let details;
    try{
        details = await Ngo.findOne({_id:ngoid});
    }catch(err){
        console.log(err);
    }
    details.status="Accepted";
    try{
        await details.save();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error while saving details to database"});
    }
    return res.status(200).json({message:"NGO Registration accepted"});
}







const getAllNGOs = async (req, res, next) =>{
    let ngoArr;
    try {
      ngoArr = await Ngo.find({}, '-regno -dob -phno -address -ngoObj');
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "can not find user..." });
    }

    if (!ngoArr) {
      return res.status(500).json({ message: "can not find user" });
    }
    
    return res.status(201).json({ngoArr:ngoArr});
}


const getRegisteredSignedUser = async (req, res, next) =>{
    let regArr;
    try{
        regArr = await Reguser.find({}, '-email -fname -mname -phno -address -aadhar');
    }catch(err){
        console.log(err);
      return res.status(500).json({ message: "can not find user..." });
    }
    console.log('fcuk offfff')
    console.log(regArr)
    if(!regArr){
      return res.status(500).json({ message: "can not find user..." });
    }
    // console.log(regArr)
    return res.status(201).json({regArr:regArr});
}




const registerAdmin = async (req, res) => {
    const { name, aadhar, password, repassword } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ aadhar: aadhar });
    } catch (err) {
        return res.status(500).json({ message: "Sign-up failed. Try again..." });
    }
    
    if (existingAdmin) {
        return res.status(422).json({ message: "User already registered, Login instead" });
    }
    
    if (password !== repassword){
        return res.status(404).json({ message: "Re-entered password did not match..." });
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({ message: "password encryption failed" });
    }
    const createdAdmin = new Admin({
        name, //as good as name: name
        aadhar,
        password: hashedPassword,
    });
    try {
        await createdAdmin.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to insert user details to db..." });
    }

    let token;
    try {
        token = jwt.sign(
        { userId: createdAdmin.id, aadhar: createdAdmin.aadhar },
        "rohansingh",
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        message: "Something went wrong while token creation in signup...",
        });
    }
    console.log("WE are here");
    res.status(201).json({
        message: "Registration Successful, Please Login...",
        userId: createdAdmin.id,
        aadhar: createdAdmin.aadhar,
        token: token,
    });
};

const loginAdmin = async (req, res, next) => {
    const { aadhar, password } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ aadhar: aadhar });
    } catch (err) {
        return res.status(500).json({ message: "Login failed..." });
    }
    if (!existingAdmin) {
        return res.status(403).json({ message: "User does not exist in our database" });
    }
    console.log("Hello Baby");
    // console.log(existingAdmin);
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingAdmin.password);
    } catch (err) {
        return res.status(500).json({ message: "Invalid credientials" });
    }
    if (!isValidPassword) {
        return res.status(403).json({ message: "Invalid credientials" });
    }



    let token;
    try {
        token = jwt.sign(
        { AdminId: existingAdmin.id, aadhar: existingAdmin.aadhar },
        "rohansingh",
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        message: "Something went wrong while token creation in login...",
        });
    }
    console.log("Hello rohan you are here...");
    return res.status(201).json({name: existingAdmin.name, adminId: existingAdmin.id, aadhar: existingAdmin.aadhar,adminToken: token,toggle:"admin"});
};

module.exports = { registerAdmin, loginAdmin, getAllNGOs, getRegisteredSignedUser, updateStatus, deleteNGO, updateRegStatus, deleteRegForm };
