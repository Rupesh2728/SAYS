const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    const show_error = req.cookies.show_error;
    res.clearCookie("show_error");
  
    res.render("Signup", { show_error: show_error });
  });

  router.post("/", function (req, res) {
    let email = req.body.email;
    let num = req.body.Mobile_Number;
    let Login_password = req.body.Login_password;
    let Profile_password = req.body.Profile_password;
    let CardName = req.body.Card_Name;
    let CardNum = req.body.Card_Number;
    let CVV = req.body.CVV;
    let Expiry = req.body.Expiry;
    let DOB = req.body.DOB;
    let gender = req.body.gender;
  
    //
    const phoneRegex = /^\d{10}$/;
    const alphabetRegex = /^[a-zA-Z]+$/;
    const cardNumberRegex = /^\d{16}$/;
    const numbersRegex = /^[0-9]{3}$/;
    const numbersRegex2 = /^[0-9]{2}$/;
    let flag = false;
    let row;
  
    let email_len = email.length;
  
    if (email_len < 10 && !flag) {
      res.cookie("show_error", "Email should be greater than length 10");
      flag = true;
      res.redirect("/Signup");
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
      res.redirect("/Signup");
    }
  
    if (!phoneRegex.test(num) && !flag) {
      res.cookie("show_error", "Enter correct Mobile number");
      flag = true;
      res.redirect("/Signup");
    }
  
    if (Login_password.includes("#")) {
      res.cookie(
        "show_error",
        "passwords should not contain # symbol for security"
      );
      flag = true;
      res.redirect("/Signup");
    }
    if (Login_password.length < 8 && !flag) {
      res.cookie("show_error", "Login password should greater than length 8");
      flag = true;
      res.redirect("/Signup");
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
      res.redirect("/Signup");
    }
  
    if (Profile_password.includes("#")) {
      res.cookie(
        "show_error",
        "passwords should not contain # symbol for security"
      );
      flag = true;
      res.redirect("/Signup");
    }
  
    if (Profile_password.length < 8 && !flag) {
      res.cookie("show_error", "Profile password should greater than length 8");
      flag = true;
      res.redirect("/Signup");
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
      res.redirect("/Signup");
    }
  
    if (!alphabetRegex.test(CardName) && !flag) {
      res.cookie("show_error", "Enter correct Crad Holder Name");
      flag = true;
      res.redirect("/Signup");
    }
  
    if (!cardNumberRegex.test(CardNum) && !flag) {
      res.cookie("show_error", "Enter correct 16 digit Crad Number");
      flag = true;
      res.redirect("/Signup");
    }
  
    if (!numbersRegex.test(CVV) && !flag) {
      res.cookie("show_error", "Enter correct CVV");
      flag = true;
      res.redirect("/Signup");
    }
    if (!numbersRegex2.test(Expiry) && !flag) {
      res.cookie("show_error", "Enter correct two digit expiry year");
      flag = true;
      res.redirect("/Signup");
    }
  
    if (!flag) {
      userinfo.find({ email: email }).then((value) => {
        if (value.length != 0) {
          res.cookie("show_error", "Email already registered");
          res.redirect("/Signup");
        } else {
          let UserReferenceNumber = "SAYSUSER" + email;
  
          let a = [
            UserReferenceNumber,
            req.body.First_Name,
            req.body.Last_Name,
            DOB,
            email,
            num,
            gender,
            md5(Login_password),
            md5(Profile_password),
            CardName,
            CardNum,
            md5(CVV),
            md5(Expiry),
          ];
  
          let b = [
            "UserReferenceNumber",
            "firstName",
            "lastName",
            "DOB",
            "email",
            "MobileNumber",
            "Gender",
            "LoginPassword",
            "profilePassword",
            "cardName",
            "cardNumber",
            "CVV",
            "expiry",
          ];
  
          let registration = new userinfo();
  
          for (let i = 0; i < b.length; i++) {
            registration[b[i]] = a[i];
          }
  
          registration
            .save()
            .then(() => {
              console.log("Inserted Signup data in database");
              res.clearCookie("show_error");
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  });

module.exports = router;