const express = require("express");
const router = express.Router();


//Database
const movieinfo = require("../../models/theatre/movieinfo");
const moviereviewdata = require("../../models/user/Moviereview");
const userinfo = require("../../models/user/signup");


router.get("/", async (req, res) => {
    const mname = req.query.name;
    var movieobj;
    if (req.cookies.isUserLogin) {
      movieobj = await movieinfo.findOne({ MovieName: mname });
  
      let myobj2 = { movie: mname };
      let x = await moviereviewdata.find(myobj2);
      res.render("reviewpage", { movieobj: movieobj, reviewdata: x });
    } else res.redirect("/login");
  });


router.post("/", async (req, res) => {
    const mname = req.query.name;
    review1 = req.body.review;
    rating1 = req.body.rating;
  
    let userdata = await userinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
  
    let Person = userdata.firstName;
  
    let myobj1 = {
      movie: mname,
      criticname: Person,
      rating: rating1,
      reviewdesc: review1,
    };
    let reviewmodel = new moviereviewdata(myobj1);
    await reviewmodel.save();
    res.redirect("/reviews?name=" + mname);
  });

  module.exports = router;