const express = require("express");
const router = express.Router();

const { registerNGO, getRegisteredNGObyUserId, getNGOFormDetails, getNGOlist } = require("../controller/ngo-controller");


router.post('/signup', registerNGO);
router.get("/formlist/ngolist", getNGOlist);
router.get('/formlist/:userId', getRegisteredNGObyUserId)
router.get("/formlist/:userId/:formId", getNGOFormDetails);
module.exports = router;

