const express = require("express");
const router = express.Router();


//Database
const theatresignupinfo = require("../../models/theatre/signup");
const userTinfo = require("../../models/theatre/abouttheatre");


router.get("/", async function (req, res){
    let value2 = await theatresignupinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let tname = value2[0]["tName"];
    if (req.cookies.isTlogin) {
      res.render("usertheatreinfo", { tname: tname });
    } else {
      res.redirect("/login");
    }
  });
  
router.post("/", async function (req, res) {
    let value = await userTinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let value2 = await theatresignupinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let tname = value2[0]["tName"];
    let imgurl1 = req.body.theatreimgurl1;
    let imgurl2 = req.body.theatreimgurl2;
    let imgurl3 = req.body.theatreimgurl3;
    let screentype = req.body.screentype;
    let snacks = req.body.snacks;
    let Ttype = req.body.Ttype;
    let sound = req.body.sound;
    let about = req.body.about;
  
    if (value.length == 0) {
      let usertinfo = new userTinfo();
      usertinfo["tReferenceNumber"] = req.cookies.currtheatrereffnum;
      usertinfo["tName"] = tname;
      usertinfo["imgurl1"] = imgurl1;
      usertinfo["imgurl2"] = imgurl2;
      usertinfo["imgurl3"] = imgurl3;
      usertinfo["screentype"] = screentype;
      usertinfo["snacks"] = snacks;
      usertinfo["Ttype"] = Ttype;
      usertinfo["sound"] = sound;
      usertinfo["about"] = about;
      usertinfo
        .save()
        .then(() => {
          console.log("Inserted a new document into Abouttheatre in database");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      value[0]["imgurl1"] = imgurl1;
      value[0]["imgurl2"] = imgurl2;
      value[0]["imgurl3"] = imgurl3;
      value[0]["screentype"] = screentype;
      value[0]["snacks"] = snacks;
      value[0]["Ttype"] = Ttype;
      value[0]["sound"] = sound;
      value[0]["about"] = about;
  
      await userTinfo
        .updateOne({ tReferenceNumber: req.cookies.currtheatrereffnum }, value[0])
        .then(() => {
          console.log("Updated User Movie theatre Info in database");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  router.post("/usertheatre/getinfo", async function (req, res) {
    let treffnum = req.body.treffnum;
    let value = await userTinfo.find({ tReferenceNumber: treffnum });
    if (value.length == 0) res.json({ k: 1 });
    else
      res.json({
        k: 0,
        tinfo: value[0],
      });
  });
  
  router.get("/usertheatre/getreffnum", function (req, res) {
    res.json({ treffnum: req.cookies.currtheatrereffnum });
  });

  module.exports = router;
  