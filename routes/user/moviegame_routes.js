const express = require("express");
const router = express.Router();

//Database
const mgamestatus = require("../../models/user/moviegamestatus");
const quizleaderboard = require("../../models/user/quizleaderboard");
const userinfo = require("../../models/user/signup");
const questions = require("../../models/user/moviegamequestions");


router.get("/", async function (req, res) {
    let value1 = await mgamestatus.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    if (value1.length == 0) {
      let newdocument = new mgamestatus();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.played = false;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new document in moviegamestatus database");
        })
        .catch((err) => {
          console.log(err);
        });
  
      isplayed = false;
    }
  
    let value4 = await userinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    let fname = value4[0]["firstName"];
    let email = value4[0]["email"];
    let value2 = await quizleaderboard.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    if (value2.length == 0) {
      let newdocument = new quizleaderboard();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.firstName = fname;
      newdocument.email = email;
      newdocument.points = 0;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new document in moviegamestatus database");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (req.cookies.isUserLogin) 
    res.render("moviegame");
    else {
      res.redirect("/login");
    }
  });

  router.get("/getques", async function (req, res) {
    let qarr = [];
    for (let i = 1; i <= 5; i++) {
      let k = i;
      let quesid = "SAYS@q" + k;
      let value = await questions.find({ quesid: quesid });
      qarr.push(value[0]);
    }
    res.json(qarr);
  });
  
  router.post("/addgamescore", async function (req, res) {
    let userscore = req.body.points;
    let userid = req.cookies.UserReferenceNumber;
    let value = await quizleaderboard.find({ UserReferenceNumber: userid });
    value[0]["points"] = userscore;
  
    await quizleaderboard
      .updateOne({ UserReferenceNumber: userid }, value[0])
      .then(() => {
        console.log("Updated the UserScore in database");
        res.json({ k: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/getleaderboard", async function (req, res) {
    let value = await quizleaderboard.find({});
    value.sort((a, b) => b.points - a.points);
    res.json(value);
  });
  
  router.get("/getplayed", async function (req, res) {
    let value1 = await mgamestatus.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    let isplayed;
    if (value1.length == 0) {
      let newdocument = new mgamestatus();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.played = false;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new document in moviegamestatus database");
        })
        .catch((err) => {
          console.log(err);
        });
  
      isplayed = false;
    } else {
      isplayed = value1[0]["played"];
    }
  
    res.json({ isplayed: isplayed });
  });
  
  router.post("/getplayed", async function (req, res) {
    let value1 = await mgamestatus.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    let isplayed = req.body.isplayed;
    value1[0]["played"] = isplayed;
  
    await mgamestatus
      .updateOne(
        { UserReferenceNumber: req.cookies.UserReferenceNumber },
        value1[0]
      )
      .then(() => {
        console.log("Updated the isplayed variable in database");
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

  module.exports = router;