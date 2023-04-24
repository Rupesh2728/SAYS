const express = require("express");
const router = express.Router();


const userinfo = require("../../models/user/signup");

router.get("/laptopprofilepage", function (req, res) {
    if (req.cookies.isUserLogin) res.render("laptopprofilepage");
    else res.redirect("/login");
  });


router.get("/profileeditpage", function (req, res) {
    const show_error = req.cookies.show_error;
    res.clearCookie("show_error");
    if (req.cookies.isUserLogin)
      res.render("profileeditpage", { error: show_error });
    else res.redirect("/login");
  });

  router.post("/profileeditpage/checklogin", function (req, res) {
    let User_ReferenceNumber = req.body.email;
    let profilepass = md5(req.body.password);
    let obj = {
      s: false,
    };
    userinfo
      .find({
        UserReferenceNumber: User_ReferenceNumber,
        profilePassword: profilepass,
      })
      .then((value) => {
        if (value.length == 0) {
          obj["s"] = false;
        } else {
          obj["s"] = true;
        }
        res.json(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.post("/profileeditpage", function (req, res) {
    let document = {};
    let User_ReferenceNumber = req.cookies.UserReferenceNumber;
    let email = req.body.email;
    let num = req.body.Mobile_Number;
    let Login_password = req.body.Login_password;
    let DOB = req.body.DOB;
    let gender = req.body.gender;
    let Profile_password = req.body.Profile_password;
    let CardName = req.body.Card_Name;
    let CardNum = req.body.Card_Number;
    let CVV = req.body.CVV;
    let Expiry = req.body.Expiry;
  
    const phoneRegex = /^\d{10}$/;
    const alphabetRegex = /^[a-zA-Z]+$/;
    const cardNumberRegex = /^\d{16}$/;
    const numbersRegex = /^[0-9]{3}$/;
    const numbersRegex2 = /^[0-9]{2}$/;
    let flag = false;
    let row;
  
    document.firstName = req.body.First_Name;
    document.lastName = req.body.Last_Name;
  
    let email_len = email.length;
  
    if (email_len < 10 && !flag) {
      res.cookie("show_error", "Email should be greater than length 10");
      flag = true;
      res.redirect("/profile/profileeditpage");
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
      res.redirect("/profile/profileeditpage");
    }
  
    document.email = email;
  
    if (!phoneRegex.test(num) && !flag) {
      res.cookie("show_error", "Enter correct Mobile number");
      flag = true;
      res.redirect("/profile/profileeditpage");
    }
  
    if (Login_password != "#########") {
      if (Login_password.includes("#")) {
        res.cookie(
          "show_error",
          "passwords should not contain # symbol for security"
        );
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
  
      if (Login_password.length < 8 && !flag) {
        res.cookie("show_error", "Login password should greater than length 8");
        flag = true;
        res.redirect("/profile/profileeditpage");
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
        res.redirect("/profile/profileeditpage");
      }
  
      document.LoginPassword = md5(Login_password);
    }
  
    if (Profile_password != "#########") {
      if (Profile_password.includes("#")) {
        res.cookie(
          "show_error",
          "passwords should not contain # symbol for security"
        );
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
      if (Profile_password.length < 8 && !flag) {
        res.cookie("show_error", "Profile password should greater than length 8");
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
      if (
        Profile_password.charAt(0) != Profile_password.charAt(0).toUpperCase() &&
        !flag
      ) {
        res.cookie(
          "show_error",
          "Profile password first character should be capital"
        );
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
  
      document.profilePassword = md5(Profile_password);
    }
  
    if (!alphabetRegex.test(CardName) && !flag) {
      res.cookie("show_error", "Enter correct Crad Holder Name");
      flag = true;
      res.redirect("/profile/profileeditpage");
    }
  
    document.cardName = CardName;
  
    if (!cardNumberRegex.test(CardNum) && !flag) {
      res.cookie("show_error", "Enter correct 16 digit Crad Number");
      flag = true;
      res.redirect("/profile/profileeditpage");
    }
    document.cardNumber = CardNum;
    if (CVV != "###") {
      if (!numbersRegex.test(CVV) && !flag) {
        res.cookie("show_error", "Enter correct CVV");
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
      document.CVV = md5(CVV);
    }
    if (Expiry != "##") {
      if (!numbersRegex2.test(Expiry) && !flag) {
        res.cookie("show_error", "Enter correct two digit expiry year");
        flag = true;
        res.redirect("/profile/profileeditpage");
      }
  
      document.expiry = md5(Expiry);
    }
    if (!flag) {
      ////update all details change userrefernceid if email changes (userrefernce id='s2021'+email);
      let tempUserReferenceNumber = req.cookies.UserReferenceNumber;
  
      if (req.cookies.UserReferenceNumber != "SAYSUSER" + email) {
        User_ReferenceNumber = "SAYSUSER" + email;
        res.cookie("UserReferenceNumber", User_ReferenceNumber);
      }
  
      document.UserReferenceNumber = User_ReferenceNumber;
      document.DOB = DOB;
      document.MobileNumber = num;
      document.Gender = gender;
      document.cardName = CardName;
      userinfo
        .updateOne({ UserReferenceNumber: tempUserReferenceNumber }, document)
        .then(() => {
          console.log("Inserted updated registration data in database");
          res.redirect("/profile/laptopprofilepage");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });


  router.get("/laptopprofilepage/getdetails", function (req, res) {
    userinfo
      .find({
        UserReferenceNumber: req.cookies.UserReferenceNumber,
      })
      .then((value) => {
        // console.log(value);
        res.json(value);
      })
      .catch((err) => {
        console.log(err);
      });
  });


module.exports = router;