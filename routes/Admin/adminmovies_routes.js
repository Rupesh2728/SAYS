const express = require("express");
const router = express.Router();

//Database
const movieinfo = require("../../models/theatre/movieinfo");
const rentalmovieinfo = require("../../models/theatre/rentalmovieslist");



router.get("/", async function (req, res) {
  let rentalmoviearr = await movieinfo.find({});
  let value1 = await rentalmovieinfo.find({});
  let rentalmovieslocarr = [];
  for (let i = 0; i < value1.length; i++) {
    if (!rentalmovieslocarr.includes(value1[i]["city"])) {
      rentalmovieslocarr.push(value1[i]["city"]);
    }
  }
  if (req.cookies.isUserLogin)
    res.render("adminmovies", {
      rentalmoviearr: rentalmoviearr,
      rentalmovieslocarr: rentalmovieslocarr,
    });
  else {
    res.redirect("/login");
  }
});

router.post("/adminrentalmovieinfo", async function (req, res) {
  let mName = req.body.mName;
  let theatreimgurl = req.body.theatreimgurl;
  let lang = req.body.lang;
  let rd = req.body.rd;
  let duration = req.body.duration;
  let genre = req.body.genre;
  let locs = req.body.locs;
  let cn1 = req.body.cn1;
  let cimg1 = req.body.cimg1;
  let cn2 = req.body.cn2;
  let cimg2 = req.body.cimg2;
  let cn3 = req.body.cn3;
  let cimg3 = req.body.cimg3;
  let cn4 = req.body.cn4;
  let cimg4 = req.body.cimg4;
  let cn5 = req.body.cn5;
  let cimg5 = req.body.cimg5;
  let aboutmovie = req.body.about;
  let mid = "SAYS@" + mName;

  let value = await movieinfo.find({ MovieId: mid });
  if (value.length == 0) {
    let newdocument = new movieinfo();
    newdocument.MovieName = mName;
    newdocument.MovieId = mid;
    newdocument.imgurl = theatreimgurl;
    newdocument.releasedate = rd;
    newdocument.duration = duration;
    newdocument.genre = genre;
    newdocument.about = aboutmovie;
    newdocument.language = lang;
    let castobjarr = [
      {
        castname: cn1,
        castimg: cimg1,
      },

      {
        castname: cn2,
        castimg: cimg2,
      },

      {
        castname: cn3,
        castimg: cimg3,
      },

      {
        castname: cn4,
        castimg: cimg4,
      },

      {
        castname: cn5,
        castimg: cimg5,
      },
    ];

    newdocument.cast = castobjarr;
    let value2 = await newdocument.save();
    if (value2) {
      console.log("New Document Added to movie info with data");
    }
  }

  let locsarr = locs.split(",");
  for (let i = 0; i < locsarr.length; i++) {
    locsarr[i] =
      locsarr[i].charAt(0).toUpperCase() + locsarr[i].slice(1).toLowerCase();
  }

  let rentalarrobj = [];
  for (let i = 0; i < locsarr.length; i++) {
    let obj1 = {
      MovieId: mid,
      MovieName: mName,
      city: locsarr[i],
    };

    rentalarrobj.push(obj1);
  }

  let value3 = await rentalmovieinfo.insertMany(rentalarrobj);
  if (value3) {
    console.log("Rental movies inserted ");
  }

  res.redirect("/");
});

router.post("/adminremovemovie", async function (req, res) {
  let mName = req.body.moviename;
  let value1 = await movieinfo.find({ MovieName: mName });
  let mid = value1[0]["MovieId"];

  await movieinfo.deleteOne({ MovieId: mid });
  await rentalmovieinfo.deleteMany({ MovieId: mid });
  console.log("Movie Removed by Admin");
  res.redirect("/");
});

router.post("/getmovieinfo", async function (req, res) {
  let mname = req.body.mname;
  let value1 = await movieinfo.find({ MovieName: mname });
  let movieobj = value1[0];
  res.json(movieobj);
});

  module.exports = router;