const express = require("express");
const router = express.Router();


//Database
const screeninfo = require("../../models/theatre/theatrescreen");
const theatrerentedmovieinfo = require("../../models/theatre/theatremovie");
const movieinfo = require("../../models/theatre/movieinfo");
const movieshowinfo = require("../../models/theatre/movieshowdetails");

router.get("/", async function (req, res) {
    let screeninfoarr = [];
    let value = await screeninfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new screeninfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.Screens = [];
      let value = await newdocument.save();
      if (value.length != 0) {
        console.log("Inserted new theatre in screeninfo database");
        console.log("Created new Document");
        res.redirect("/tschedule");
      }
    } else {
      let screenarr = value[0]["Screens"];
      for (let i = 0; i < screenarr.length; i++) {
        screeninfoarr.push(screenarr[i]);
      }
    }
  
    let value2 = await theatrerentedmovieinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let currentmoviesinfo = [];
    let curractivemoviesinfo = [];
    let curractivemoviesid = [];
    if (value2.length == 0) {
      console.log("No movies in your Theatre!!!");
    } else {
      currentmoviesinfo = value2[0]["moviestatusinfo"];
      for (let i = 0; i < currentmoviesinfo.length; i++) {
        if (currentmoviesinfo[i]["status"] == "Active") {
          curractivemoviesid.push(currentmoviesinfo[i]["MovieId"]);
        }
      }
  
      for (let i = 0; i < curractivemoviesid.length; i++) {
        let value3 = await movieinfo.find({ MovieId: curractivemoviesid[i] });
        curractivemoviesinfo.push(value3[0]);
      }
    }
  
    let movieshowdetails = [];
    let value3 = await movieshowinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value3.length == 0) {
      let newdocument = new movieshowinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.showdetails = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in movieshowinfo database");
          console.log("Created new Document");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      movieshowdetails = value3[0]["showdetails"];
    }
    if (req.cookies.isTlogin)
      res.render("theatreschedule", {
        screeninfoarr: screeninfoarr,
        curractivemoviesinfo: curractivemoviesinfo,
        movieshowdetails: movieshowdetails,
      });
    else {
      res.redirect("/login");
    }
  });
  
  router.post("/getscreendetails", async function (req, res) {
    let value = await screeninfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let sname = req.body.screenname;
    let screeninfoarr = value[0]["Screens"];
    let obj;
    for (let i = 0; i < screeninfoarr.length; i++) {
      if (screeninfoarr[i]["screenname"] == sname) {
        obj = screeninfoarr[i];
        break;
      }
    }
  
    res.json(obj);
  });
  
  router.post("/editsavescreen", async function (req, res) {
    let esname = req.body.sname;
    let escapacity = req.body.scapacity;
    let esnumrows = req.body.snumrows;
    let esnumcols = req.body.snumcols;
    let eSA = req.body.editedSA;
    let oldsname = req.body.oldsname;
    let value = await screeninfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let screeninfoarr = [];
    screeninfoarr = value[0]["Screens"];
    for (let i = 0; i < screeninfoarr.length; i++) {
      if (screeninfoarr[i]["screenname"] == oldsname) {
        screeninfoarr[i]["screenname"] = esname;
        screeninfoarr[i]["screencapacity"] = escapacity;
        screeninfoarr[i]["numrows"] = esnumrows;
        screeninfoarr[i]["numcols"] = esnumcols;
        screeninfoarr[i]["originalseatarrangementarr"] = eSA;
        screeninfoarr[i]["userbookingseatarr"] = eSA;
        break;
      }
    }
  
    screeninfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          Screens: screeninfoarr,
        }
      )
      .then(() => {
        console.log("Updated in database");
        k = 1;
        res.json({ confirm: k });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/removescreen", async function (req, res) {
    let value = await screeninfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let sname = req.body.scrname;
    let screeninfoarr = value[0]["Screens"];
    let remainingscrarr = [];
    for (let i = 0; i < screeninfoarr.length; i++) {
      if (screeninfoarr[i]["screenname"] != sname) {
        remainingscrarr.push(screeninfoarr[i]);
      }
    }
  
    screeninfoarr = remainingscrarr;
  
    screeninfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          Screens: screeninfoarr,
        }
      )
      .then(() => {
        console.log("Deleted from database");
        k = 1;
        res.json({ confirm: k });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/getmoviedetails", async function (req, res) {
    let value = await movieinfo.find({ MovieName: req.body.mname });
    res.json(value[0]);
  });
  
  router.post("/addshow", async function (req, res) {
    let screenname = req.body.selectscreen;
    let mname = req.body.selectmovie;
    let duration = req.body.duration;
    let ampm = req.body.ampm;
    let showtime = req.body.showtime;
    let normalclassprice = req.body.normalclassprice;
    let premiumclassprice = req.body.premiumclassprice;
    let fromdate = req.body.fromdate;
    let todate = req.body.todate;
  
    let value2 = await movieinfo.find({ MovieName: mname });
    let movieid = value2[0]["MovieId"];
  
    let value = await movieshowinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let movieshowdetails = value[0]["showdetails"];
    let k = 0;
    let obj = {
      MovieId: movieid,
      MovieName: mname,
      duration: duration,
      screenname: screenname,
      showtime: showtime,
      ampm: ampm,
      pclassprice: premiumclassprice,
      nclassprice: normalclassprice,
      fromdate: fromdate,
      todate: todate,
    };
  
    for (let i = 0; i < movieshowdetails.length; i++) {
      if (
        movieshowdetails[i]["screenname"] == screenname &&
        movieshowdetails[i]["showtime"] == showtime &&
        movieshowdetails[i]["ampm"] == ampm &&
        (movieshowdetails[i]["fromdate"] == fromdate ||
          movieshowdetails[i]["todate"] == todate)
      ) {
        k = 1;
      }
    }
  
    if (k == 0) {
      movieshowdetails.push(obj);
      await movieshowinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            showdetails: movieshowdetails,
          }
        )
        .then(() => {
          console.log("Added show in database");
          res.redirect("/tschedule");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Already screen Scheduled...Cannot Add this show..");
      res.redirect("/tschedule");
    }
  });
  
  router.post("/removeshow", async function (req, res) {
    let removemname = req.body.removemname;
    let value = await movieshowinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let movieshowdetails = value[0]["showdetails"];
    let updatedmovieshowdetails = [];
    for (let i = 0; i < movieshowdetails.length; i++) {
      if (movieshowdetails[i]["MovieName"] != removemname) {
        updatedmovieshowdetails.push(movieshowdetails[i]);
      }
    }
  
    movieshowdetails = updatedmovieshowdetails;
    await movieshowinfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          showdetails: movieshowdetails,
        }
      )
      .then(() => {
        console.log("Removed show from database");
        res.json({
          confirm: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/getshowdetails", async function (req, res) {
    let value = await movieshowinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let movieshowdetails = value[0]["showdetails"];
    let obj;
    for (let i = 0; i < movieshowdetails.length; i++) {
      if (
        movieshowdetails[i]["MovieName"] == req.body.editmname &&
        movieshowdetails[i]["showtime"] + " " + movieshowdetails[i]["ampm"] ==
          req.body.editshowtime &&
        movieshowdetails[i]["fromdate"] == req.body.editfromdate &&
        movieshowdetails[i]["todate"] == req.body.edittodate
      ) {
        obj = movieshowdetails[i];
        break;
      }
    }
  
    res.json(obj);
  });
  
  router.post("/editsaveshowdetails", async function (req, res) {
    let screenname = req.body.editselectscreen;
    let mname = req.body.editselectmovie;
    let duration = req.body.editduration;
    let ampm = req.body.editampm;
    let showtime = req.body.editshowtime;
    let normalclassprice = req.body.editnormalclassprice;
    let premiumclassprice = req.body.editpremiumclassprice;
    let fromdate = req.body.editfromdate;
    let todate = req.body.edittodate;
  
    let value2 = await movieinfo.find({ MovieName: mname });
    let movieid = value2[0]["MovieId"];
  
    let value = await movieshowinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let movieshowdetails = value[0]["showdetails"];
    let obj = {
      MovieId: movieid,
      MovieName: mname,
      duration: duration,
      screenname: screenname,
      showtime: showtime,
      ampm: ampm,
      pclassprice: premiumclassprice,
      nclassprice: normalclassprice,
      fromdate: fromdate,
      todate: todate,
    };
  
    for (let i = 0; i < movieshowdetails.length; i++) {
      if (
        !(
          movieshowdetails[i]["MovieName"] == req.body.editmname &&
          movieshowdetails[i]["showtime"] + " " + movieshowdetails[i]["ampm"] ==
            req.body.editshowtime &&
          movieshowdetails[i]["fromdate"] == req.body.editfromdate &&
          movieshowdetails[i]["todate"] == req.body.edittodate
        )
      ) {
        movieshowdetails[i] = obj;
      }
    }
  
    await movieshowinfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          showdetails: movieshowdetails,
        }
      )
      .then(() => {
        console.log("Updated the show in database");
        res.redirect("/tschedule");
      })
      .catch((err) => {
        console.log(err);
      });
  });


    router.post("/addscreen", async function (req, res) {
    let k = 0;
    let arrangementarr = req.body.seatarr;
    let screenname = req.body.screenname;
    let screencapacity = req.body.screencapacity;
    let numrows = req.body.numrows;
    let numcols = req.body.numcols;
    let newscreenobj = {
      screenname: screenname,
      screencapacity: screencapacity,
      numrows: numrows,
      numcols: numcols,
      originalseatarrangementarr: arrangementarr,
      userbookingseatarr: arrangementarr,
    };
    let value = await screeninfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new screeninfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.Screens = [];
      let screensinfoarr = newdocument.Screens;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in screeninfo database");
          console.log("Created new Document");
        })
        .catch((err) => {
          console.log(err);
        });
  
      screensinfoarr.push(newscreenobj);
      screeninfo
        .updateOne(
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
          },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            Screens: screensinfoarr,
          }
        )
        .then(() => {
          console.log("Inserted seat arrangement in database");
          k = 1;
          res.json({ confirm: k });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let screensinfoarr = value[0]["Screens"];
      screensinfoarr.push(newscreenobj);
      screeninfo
        .updateOne(
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
          },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            Screens: screensinfoarr,
          }
        )
        .then(() => {
          console.log("Inserted seat arrangement in database");
          k = 1;
          res.json({ confirm: k });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  module.exports = router;
  