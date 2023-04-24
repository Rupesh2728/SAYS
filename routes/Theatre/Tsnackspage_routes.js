const express = require("express");
const router = express.Router();

//database
const snackinfo = require("../../models/theatre/snackinfo");

router.post("/removesnack", async function (req, res) {
    let sname = req.body.rsname;
    let category = req.body.rscategory;
    let indexToRemove;
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let snackinfoobj = value[0];
    let snackarr = [];
    let newsnackarr = [];
    snackarr = snackinfoobj["snackarr"];
    for (let i = 0; i < snackarr.length; i++) {
      if (snackarr[i].SnackName != sname || snackarr[i].category != category) {
        newsnackarr.push(snackarr[i]);
      }
    }
  
    snackarr = newsnackarr;
    snackinfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          snackarr: snackarr,
        }
      )
  
      .then(() => {
        console.log("Removed the snack from Snack Info!!!");
        res.redirect("/tsnackspage");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/", async function (req, res) {
    let snackinfoarr = [];
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new snackinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.snackarr = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let snackinfoobj = value[0];
      let arr = snackinfoobj["snackarr"];
      for (let i = 0; i < arr.length; i++) {
        snackinfoarr.push(arr[i]);
      }
    }
    if (req.cookies.isTlogin)
      res.render("theatresnackspage", { snackinfoarr: snackinfoarr });
    else res.redirect("/login");
  });
  
  router.post("/addsnack", async function (req, res) {
    let flag = 0;
    let convertstr = function (str) {
      let words = str.split(" ");
      let capitalized = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ); // capitalize the first letter of each word and convert the rest of the letters to lowercase
      let result = capitalized.join(" ");
      return result;
    };
  
    let sname = convertstr(req.body.sname);
    let scategory = convertstr(req.body.category);
    let sprice = req.body.price;
    let simgurl = req.body.snackimg;
    console.log(sname);
    console.log(scategory);
    console.log("Hello addsnack");
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new snackinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.snackarr = [];
      let snackarr = newdocument.snackarr;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
  
      let snewobj = {
        SnackName: sname,
        category: scategory,
        price: sprice,
        imgurl: simgurl,
      };
  
      snackarr.push(snewobj);
  
      snackinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            snackarr: snackarr,
          }
        )
        .then(() => {
          console.log("Inserted new snack data in snackinfo database");
          res.redirect("/tsnackspage");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let snackarr = value[0]["snackarr"];
      for (let i = 0; i < snackarr.length; i++) {
        if (snackarr[i].SnackName == sname && snackarr[i].category == scategory) {
          flag = 1;
        }
      }
  
      let snewobj = {
        SnackName: sname,
        category: scategory,
        price: sprice,
        imgurl: simgurl,
      };
  
      if (flag == 0) {
        snackarr.push(snewobj);
        snackinfo
          .updateOne(
            { tReferenceNumber: req.cookies.currtheatrereffnum },
            {
              tReferenceNumber: req.cookies.currtheatrereffnum,
              snackarr: snackarr,
            }
          )
          .then(() => {
            console.log("Inserted new snack data in snackinfo database");
            res.redirect("/tsnackspage");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Already Snack Present in your Theatre");
        res.redirect("/tsnackspage");
      }
    }
  });


  let olddetails = {
    oldsname: "",
    oldscategory: "",
  };
  
  router.post("/editsavesnack/olddetails", function (req, res) {
    let oldsname = req.body.oldsname;
    let oldscategory = req.body.oldscategory;
    olddetails = {
      oldsname: oldsname,
      oldscategory: oldscategory,
    };
  
    return;
  });
  
  router.post("/editsavesnack", async function (req, res) {
    let flag = 0;
    let sname = req.body.esname;
    let scategory = req.body.escategory;
    let sprice = req.body.esprice;
    let simgurl = req.body.esimgurl;
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
  
    let snackarr = value[0]["snackarr"];
    for (let i = 0; i < snackarr.length; i++) {
      if (snackarr[i].SnackName == sname && snackarr[i].category == scategory) {
        flag = 1;
      }
    }
  
    if (flag == 0) {
      for (let i = 0; i < snackarr.length; i++) {
        if (
          snackarr[i].SnackName == olddetails.oldsname &&
          snackarr[i].category == olddetails.oldscategory
        ) {
          snackarr[i].SnackName = sname;
          snackarr[i].category = scategory;
        }
      }
  
      snackinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            snackarr: snackarr,
          }
        )
        .then(() => {
          console.log("Inserted new snack data in snackinfo database");
          res.redirect("/tsnackspage");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.redirect("/tsnackspage");
    }
  
    return;
  });
  
  router.post("/getsnackdetails", function (req, res) {
    let sname = req.body.sname;
    let scategory = req.body.category;
    snackinfo
      .find({ tReferenceNumber: req.cookies.currtheatrereffnum })
      .then((value) => {
        let obj = value[0];
        let obj2;
        let snackarr = obj["snackarr"];
        for (let i = 0; i < snackarr.length; i++) {
          if (
            snackarr[i].SnackName == sname &&
            snackarr[i].category == scategory
          ) {
            obj2 = snackarr[i];
          }
        }
        res.json(obj2);
      });
  });

  module.exports = router;