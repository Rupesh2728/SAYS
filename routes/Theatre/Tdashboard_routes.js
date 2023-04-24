const express = require("express");
const router = express.Router();

const theatrereviewdata = require("../../models/user/theatrereview");
router.get("/", async function (req, res) {
  let treviewsarr;
  let value = await theatrereviewdata.find({
    tReferenceNumber: req.cookies.currtheatrereffnum,
  });

  if(value.length!=0)
  treviewsarr = value[0]["review"];
  else{
    treviewsarr='';
  }

  if (req.cookies.isTlogin) {
    res.render("theatredashboard", { treviewsarr: treviewsarr });
  }

  else
    res.redirect("/login")
});

module.exports = router;