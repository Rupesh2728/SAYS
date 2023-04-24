const express = require("express");
const router = express.Router();


//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatrereviewdata = require("../../models/user/theatrereview");
const userinfo = require("../../models/user/signup");

router.get("/", async (req, res) => {
  if (req.cookies.isUserLogin) {
    const tno = req.query.tref;
    let value = await theatresignupinfo.findOne({ tReferenceNumber: tno });
    let tname = value.tName;
    let review2 = await theatrereviewdata.find({ tReferenceNumber: tno });
    res.render("theatrereview", { tname: tname, reviewdata: review2 });
}
});


  router.post("/", async (req, res) => {
    const tno = req.query.tref;
    const review1 = req.body.review;
    const rating1 = req.body.rating;
  
    let userdetails = await userinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
  
    let myobj2 = {
      tReferenceNumber: tno,
      review: {
        username: userdetails.firstName,
        usermailid: userdetails.email,
        rating: rating1,
        reviewdesc: review1,
      },
    };
    let theatrereviewmodel = new theatrereviewdata(myobj2);
    await theatrereviewmodel.save();
  
    res.redirect("/treviews?tref=" + tno);
  });

  module.exports = router;