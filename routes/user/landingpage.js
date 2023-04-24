const express = require("express");
const router = express.Router();
const premiumclients = require("../../public/js/homepage/premiumclients.js");

router.get("/", function (req, res) {
  res.render("homepagedup", { premiumclients: premiumclients });
});

module.exports = router;
