const express = require("express");
const router = express.Router();

//Database
const contactusqueries = require("../../models/Admin/contactusqueries");
const theatreverification = require("../../models/Admin/theatreverification");
const theatresignupinfo = require("../../models/theatre/signup");
const userinfo = require("../../models/user/signup");


router.get("/", async function (req, res) {
  let msgobjarr = [];
  let theatreverificationarr = [];
  let value3 = await theatreverification.find({});
  for (let i = 0; i < value3.length; i++) {
    theatreverificationarr.push(value3[i]);
  }

  let value = await contactusqueries.find({});
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < value[i]["msginfo"].length; j++) {
      msgobjarr.push(value[i]["msginfo"][j]);
    }
  }
  if (msgobjarr.length != 0) msgobjarr.sort((a, b) => b.date - a.date);

  let value1 = await theatresignupinfo.find({});
  let tnum = value1.length;
  let value2 = await userinfo.find({});
  let unum = value2.length;
  if (req.cookies.isUserLogin)
    res.render("adminhomepage", {
      msgobjarr: msgobjarr,
      tnum: tnum,
      unum: unum,
      theatreverificationarr: theatreverificationarr,
    });
  else {
    res.redirect("/login");
  }
});

router.post("/accepttheatre", async function (req, res) {
  let temail = req.body.temail;
  let value4 = await theatreverification.find({ temail: temail });
  let subject = "Successful Theatre Registration in SAYS";
  let message =
    "Hello, Your Theatre Registered With MailId " +
    temail +
    " has been Verified and Accepted your Registration.Please Login and Complete the Remaining Procedures.Thank You";
  let newtheatre = new theatresignupinfo();
  newtheatre.tReferenceNumber = value4[0].tReferenceNumber;
  newtheatre.tName = value4[0].tName;
  newtheatre.temail = value4[0].temail;
  newtheatre.tNumber1 = value4[0].tNumber1;
  newtheatre.tNumber2 = value4[0].tNumber2;
  newtheatre.street = value4[0].street;
  newtheatre.city = value4[0].city;
  newtheatre.state = value4[0].state;
  newtheatre.pincode = value4[0].pincode;
  newtheatre.licensenum = value4[0].licensenum;
  newtheatre.LoginPassword = value4[0].LoginPassword;
  newtheatre.nearbyplace1 = value4[0].nearbyplace1;
  newtheatre.nearbyplace2 = value4[0].nearbyplace2;
  newtheatre.nearbyplace3 = value4[0].nearbyplace3;
  newtheatre.nearbyplace4 = value4[0].nearbyplace4;
  let k = await newtheatre.save();
  if (k) {
    console.log("Theatre Succesfully Accepted by Admin");
  }

  let l = await theatreverification.deleteOne({ temail: temail });
  if (l) {
    console.log("Theatre Succesfully Deleted from Verification DB");
  }

  if (k && l) {
    let mailtransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "contactsays123@gmail.com",
        pass: "hhbemttmmjnxzfri",
      },
    });

    let details = {
      from: "contactsays123@gmail.com",
      to: temail,
      subject: subject,
      text: message,
    };
    mailtransporter.sendMail(details, (err) => {
      if (err) console.log(err);
      else {
        console.log("Theatre Acceptance Email has been sent successfully!!!");
      }
    });
    res.json({ k: 1 });
  }
});

router.post("/rejecttheatre", async function (req, res) {
  let temail = req.body.temail;
  let subject = "Theatre Registration Declined By SAYS";
  let message =
    "Hello, Your Theatre Registered With MailId " +
    temail +
    " has been Rejected for some Reasons.For Further Enquiries,Please contact contactsays123@gmail.com.";
  let l = await theatreverification.deleteOne({ temail: temail });
  if (l) {
    console.log("Theatre Rejected by Admin!!!");
  }

  let mailtransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contactsays123@gmail.com",
      pass: "hhbemttmmjnxzfri",
    },
  });

  let details = {
    from: "contactsays123@gmail.com",
    to: temail,
    subject: subject,
    text: message,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) console.log(err);
    else {
      console.log("Theatre Rejection Email has been sent successfully");
    }
  });
  res.json({ k: 1 });
});

  module.exports = router;