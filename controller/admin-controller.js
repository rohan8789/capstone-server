const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../model/admin");

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
    console.log(existingAdmin);
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
    res.status(201).json({
        name: existingAdmin.name,
        adminId: existingAdmin.id,
        aadhar: existingAdmin.aadhar,
        adminToken: token,
        toggle:"admin",
    });
};

module.exports = { registerAdmin, loginAdmin };
