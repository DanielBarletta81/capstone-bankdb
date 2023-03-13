const express = require("express");

const { getPrivateData } = require("../controllers/privateControl");
const { protect } = require("../middleware/authControl");

const router = express.Router();

router.route("/").get(protect, getPrivateData);

module.exports = router;