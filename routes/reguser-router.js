const express = require("express");
const { check } = require("express-validator");

const {
  registerSignedUser,
  getFormByUserID,
  getFormDetails,
} = require("../controller/reguser-controller");
const fileUpload = require("../middleware/file-upload");
// const validateAuth = require("../middleware/auth-validate");

const router = express.Router();


// router.use(validateAuth);
router.get("/formlist/:userId/:formId", getFormDetails)
router.get("/formlist/:userId", getFormByUserID);

router.post("/", fileUpload.single("aadharimg"), [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("address").not().isEmpty(),
    check("fname").not().isEmpty(),
  ],
  registerSignedUser
);



module.exports = router;
