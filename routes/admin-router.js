const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin, getAllNGOs, getRegisteredSignedUser, updateStatus, deleteNGO, updateRegStatus, deleteRegForm } = require("../controller/admin-controller");



router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);
router.get("/getngos", getAllNGOs);
router.get("/getrids", getRegisteredSignedUser);
router.get("/:ngoid", updateStatus);
router.delete("/:ngoid", deleteNGO);
router.get("/reg/:rid", updateRegStatus);
router.delete("/reg/:rid", deleteRegForm);
module.exports = router;
