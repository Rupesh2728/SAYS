const express = require("express");
const md5 = require("md5");
const router = express.Router();

//Database
const theatresignupinfo = require("../../models/theatre/signup");
let nearbyplaces = require("../../public/js/theatredashboard/nearbyplaces.js");
  
  
router.get("/", function (req, res) {
    theatresignupinfo
      .find({ tReferenceNumber: req.cookies.currtheatrereffnum })
      .then((value) => {
        let n = nearbyplaces.length;
        for (let i = 0; i < n; i++) {
          let a = i + 1;
          let k = "nearbyplace" + a;
  
          nearbyplaces[i].pname = value[0][k];
        }
        if (req.cookies.isTlogin)
          res.render("theatreprofilepage", { nearbyplaces: nearbyplaces });
        else res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  
  
router.get("/teditprofile", function (req, res) {
    const show_error = req.cookies.show_error;
    res.clearCookie("show_error");
    if (req.cookies.isTlogin)
      res.render("theatreeditprofilepage", { error: show_error });
    else res.redirect("/login");
  });
  
  router.post("/teditprofile", function (req, res) {
    let document = {};
    let TheatreReferenceNumber = req.cookies.currtheatrereffnum;
    let Theatre_Name = req.body.Theatre_Name;
    let email = req.body.Theatre_EmailID;
    let num1 = req.body.Contact_Number1;
    let num2 = req.body.Contact_Number2;
    let street = req.body.Street;
    let City = req.body.City;
    let State = req.body.State;
    let Pincode = req.body.pincode;
    let License_Number = req.body.License_Number;
    let Login_password = req.body.Login_Password;
    let nearbyplace1 = req.body.nearbyplace1;
    let nearbyplace2 = req.body.nearbyplace2;
    let nearbyplace3 = req.body.nearbyplace3;
    let nearbyplace4 = req.body.nearbyplace4;
  
    const phoneRegex = /^\d{10}$/;
    const pincoderegex = /^[1-9][0-9]{5}$/;
    var License_Numberregex = /^\w{6}$/;
  
    let flag = false;
    let row;
  
    let email_len = email.length;
  
    if (email_len < 10 && !flag) {
      res.cookie("show_error", "Email should be greater than length 10");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
  
    let i = email_len - 1;
    let str = "";
  
    for (let j = 0; j < 10; j++) {
      str += email.charAt(i);
      i--;
    }
    str = str.split("").reverse().join("");
  
    if (str != "@gmail.com" && !flag) {
      res.cookie("show_error", "Email should have domain as @gmail.com");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
  
    if (!phoneRegex.test(num1) && !flag) {
      res.cookie("show_error", "Enter correct Mobile number");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
  
    if (!phoneRegex.test(num2) && !flag) {
      res.cookie("show_error", "Enter correct Mobile number");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
    if (!pincoderegex.test(Pincode) && !flag) {
      res.cookie("show_error", "Enter correct pinicode number");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
    if (!License_Numberregex.test(License_Number) && !flag) {
      res.cookie("show_error", "Enter correct License Number of length 6");
      flag = true;
      res.redirect("/tprofile/teditprofile");
    }
    if (Login_password != "#########") {
      if (Login_password.includes("#")) {
        res.cookie(
          "show_error",
          "passwords should not contain # symbol for security"
        );
        flag = true;
        res.redirect("/tprofile/teditprofile");
      }
      if (Login_password.length < 8 && !flag) {
        res.cookie("show_error", "Login password should greater than length 8");
        flag = true;
        res.redirect("/tprofile/teditprofile");
      }
      if (
        Login_password.charAt(0) != Login_password.charAt(0).toUpperCase() &&
        !flag
      ) {
        res.cookie(
          "show_error",
          "Login password first character should be capital"
        );
        flag = true;
        res.redirect("/tprofile/teditprofile");
      }
      document.LoginPassword = Login_password;
    }
  
    if (!flag) {
      let tempTheatreReferenceNumber = req.cookies.currtheatrereffnum;
  
      if (req.cookies.currtheatrereffnum != "SAYSUser" + email) {
        TheatreReferenceNumber = "SAYSTheatre" + email;
        res.cookie("currtheatrereffnum", TheatreReferenceNumber);
      }
      if (req.cookies.currtheatrecity != City) {
        res.cookie("currtheatrecity", City);
      }
  
      let a = [
        TheatreReferenceNumber,
        Theatre_Name,
        email,
        num1,
        num2,
        street,
        City,
        State,
        Pincode,
        License_Number,
        nearbyplace1,
        nearbyplace2,
        nearbyplace3,
        nearbyplace4,
      ];
      document.tReferenceNumber = a[0];
      document.tName = a[1];
      document.temail = a[2];
      document.tNumber1 = a[3];
      document.tNumber2 = a[4];
      document.street = a[5];
      document.city = a[6];
      document.state = a[7];
      document.pincode = a[8];
      document.licensenum = a[9];
      document.nearbyplace1 = a[10];
      document.nearbyplace2 = a[11];
      document.nearbyplace3 = a[12];
      document.nearbyplace4 = a[13];
  
      theatresignupinfo
        .updateOne({ tReferenceNumber: tempTheatreReferenceNumber }, document)
        .then(() => {
          console.log("Inserted updated registration data in database");
          res.clearCookie("show_error");
          // console.log(req.cookies.currtheatrereffnum + " " + req.cookies.currtheatrecity);
          res.redirect("/tprofile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });


  router.get("/getdetails", function (req, res) {
    theatresignupinfo
      .find({ tReferenceNumber: req.cookies.currtheatrereffnum })
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;