const express = require("express");
const router = express.Router();

//Database
const contactusqueries = require("../../models/Admin/contactusqueries");

router.get("/", async function (req, res) {
    const show_error_contactus = req.cookies.show_error_contactus;
    res.clearCookie("show_error_contactus");
  
    let value = await contactusqueries.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    if (value.length == 0) {
      let newdocument = new contactusqueries();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.msginfo = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new contactus query data in database");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    if (req.cookies.isUserLogin)
      res.render("contactus", { show_error_contactus: show_error_contactus });
    else res.redirect("/login");
  });

  router.post("/", async function (req, res) {
    let email = req.body.email;
    let message = req.body.message;
    let uname = req.body.uname;
    let flag = false;
  
    let email_len = email.length;
    if (email_len < 10 && !flag) {
      res.cookie(
        "show_error_contactus",
        "Email should be greater than length 10"
      );
      flag = true;
      res.redirect("/contactus");
    }
  
    let i = email_len - 1;
    let str = "";
  
    for (let j = 0; j < 10; j++) {
      str += email.charAt(i);
      i--;
    }
    str = str.split("").reverse().join("");
  
    if (str != "@gmail.com" && !flag) {
      res.cookie(
        "show_error_contactus",
        "Email should have domain as @gmail.com"
      );
      flag = true;
      res.redirect("/contactus");
    }
  
    message_check = message.trim();
  
    // Split the string into an array of words
    var wordsArr = message_check.split(/\s+/);
  
    // Check the length of the array
    if (wordsArr.length < 20 && !flag) {
      res.cookie("show_error_contactus", "message should be more than 20 words");
      flag = true;
      res.redirect("/contactus");
    }
  
    if (!flag) {
      res.cookie(
        "show_error_contactus",
        "Message sent successfully(Back to Home.........)"
      );
  
      const currentDate = new Date();
      const isoDate = currentDate.toISOString().slice(0, 10);
      console.log(isoDate);
  
      let obj = {
        UserReferenceNumber: req.cookies.UserReferenceNumber,
        mailid: email,
        name: uname,
        message: message,
        date: isoDate,
      };
      let value = await contactusqueries.find({
        UserReferenceNumber: req.cookies.UserReferenceNumber,
      });
      value[0]["msginfo"].push(obj);
      await contactusqueries.updateOne(
        { UserReferenceNumber: req.cookies.UserReferenceNumber },
        value[0]
      );
      res.redirect("/contactus");
    }
  });

  module.exports = router;