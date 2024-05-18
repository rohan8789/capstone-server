const express = require("express");
const router = express.Router();

const { registerNGO, getRegisteredNGObyUserId, getNGOFormDetails } = require("../controller/ngo-controller");


router.post('/signup', registerNGO);
router.get('/formlist/:userId', getRegisteredNGObyUserId)
router.get("/formlist/:userId/:formId", getNGOFormDetails);

module.exports = router;

