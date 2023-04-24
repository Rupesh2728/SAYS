const express = require("express");
const router = express.Router();


//Database
const theatresignupinfo = require("../../models/theatre/signup");
const movieinfo = require("../../models/theatre/movieinfo");
const rentalmovies = require("../../models/theatre/rentalmovieslist");
const theatrerentedmovieinfo = require("../../models/theatre/theatremovie");



router.get("/gettreffnum", function (req, res) {
    res.json(req.cookies.currtheatrereffnum);
  });
  
  router.get("/gettheatredetails", function (req, res) {
    theatresignupinfo
      .find({ tReferenceNumber: req.cookies.currtheatrereffnum })
      .then((value) => {
        let obj = value[0];
        res.json(obj);
      });
  });
  
  router.post("/getmoviedetails", function (req, res) {
    movieinfo.find({ MovieName: req.body.mname }).then((value) => {
      let obj = value[0];
      res.json(obj);
    });
  });
  
  router.get("/", async function (req, res) {
    let rentalmoviearr = [];
    let activemoviearr = [];
    let inactivemoviearr = [];
  
    let value1 = await rentalmovies.find({ city: req.cookies.currtheatrecity });
  
    if (value1.length == 0) {
      console.log("No Rental movies in that Area!!!");
    } else {
      for (let i = 0; i < value1.length; i++) {
        let mid = value1[i]["MovieId"];
        let value2 = await movieinfo.find({ MovieId: mid });
        rentalmoviearr.push(value2[0]);
      }
    }
  
    let value3 = await theatrerentedmovieinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
  
    let msarr = [];
    if (value3.length == 0) {
      let newdocument = new theatrerentedmovieinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.moviestatusinfo = [];
      msarr = newdocument.moviestatusinfo;
    } else {
      msarr = value3[0]["moviestatusinfo"];
  
      for (let i = 0; i < msarr.length; i++) {
        let obj = msarr[i];
  
        if (obj["status"] == "Active") {
          let value4 = await movieinfo.find({ MovieId: obj["MovieId"] });
          let obj1 = value4[0];
          activemoviearr.push(obj1);
        } else {
          let value5 = await movieinfo.find({ MovieId: obj["MovieId"] });
          let obj2 = value5[0];
          inactivemoviearr.push(obj2);
        }
      }
    }
    if (req.cookies.isTlogin)
      res.render("moviedashboard", {
        rentalmoviearr: rentalmoviearr,
        activemoviearr: activemoviearr,
        inactivemoviearr: inactivemoviearr,
      });
    else {
      res.redirect("/login");
    }
  });
  
  router.post("/rental", async function (req, res) {
    let movietitle = req.body.movietitle;
    let tname = req.body.tname;
    let temail = req.body.temail;
    let rentaldays = req.body.rentaldays;
    let rentaldate = req.body.rentaldate;
    let movieid;
  
    let value1 = await movieinfo.find({ MovieName: movietitle });
    movieid = value1[0]["MovieId"];
  
    let arrofobj = [];
    let value2 = await theatrerentedmovieinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value2.length == 0) {
      let newdocument = new theatrerentedmovieinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.moviestatusinfo = [];
      let valuex = await newdocument.save();
      if (valuex) {
        console.log("Inserted new theatre in tmoviesinfo database");
      }
  
      let moviestatusobj = {
        MovieId: movieid,
        status: "Inactive",
        rentaldays: rentaldays,
        rentaldate: rentaldate,
      };
  
      arrofobj.push(moviestatusobj);
  
      await theatrerentedmovieinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            moviestatusinfo: arrofobj,
          }
        )
        .then(() => {
          console.log(
            "Inserted updated rented movie data in tmovieinfo database"
          );
          res.redirect("/tmdashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      arrofobj = value2[0]["moviestatusinfo"];
      let moviestatusobj = {
        MovieId: movieid,
        status: "Inactive",
        rentaldays: rentaldays,
        rentaldate: rentaldate,
      };
  
      arrofobj.push(moviestatusobj);
  
      theatrerentedmovieinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            moviestatusinfo: arrofobj,
          }
        )
        .then(() => {
          console.log(
            "Inserted updated rented movie data in tmovieinfo database"
          );
          res.redirect("/tmdashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  router.post("/addmovie", async function (req, res) {
    let moviename = req.body.moviename;
    let status = req.body.moviestatus;
    console.log(status);
    let movieid;
    let moviestatusinfoobjarr = [];
    let value1 = await movieinfo.find({ MovieName: moviename });
    movieid = value1[0]["MovieId"];
  
    let value2 = await theatrerentedmovieinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value2.length == 0) {
      console.log("Theatre not there in rentedmovieinfo");
      let newdocument = new theatrerentedmovieinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.moviestatusinfo = [];
      moviestatusinfoobjarr = newdocument.moviestatusinfo;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Created new Document");
    } else {
      moviestatusinfoobjarr = value2[0]["moviestatusinfo"];
      console.log(moviestatusinfoobjarr);
    }
  
    if (moviestatusinfoobjarr.length != 0) {
      for (let i = 0; i < moviestatusinfoobjarr.length; i++) {
        if (moviestatusinfoobjarr[i]["MovieId"] == movieid) {
          moviestatusinfoobjarr[i]["status"] = status;
        }
      }
  
      theatrerentedmovieinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            moviestatusinfo: moviestatusinfoobjarr,
          }
        )
        .then(() => {
          console.log("Inserted updated rented movie data in database");
          res.redirect("/tmdashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No movies Present in theatre!!!");
      res.redirect("/tmdashboard");
    }
  });
  
  router.post("/editmovie", async function (req, res) {
    let moviename = req.body.moviename;
    let status = req.body.moviestatus;
    let movieid;
    let moviestatusinfoobjarr = [];
    let value1 = await movieinfo.find({ MovieName: moviename });
    movieid = value1[0]["MovieId"];
  
    let value2 = await theatrerentedmovieinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value2.length == 0) {
      console.log("Theatre not there in rentedmovieinfo");
      let newdocument = new theatrerentedmovieinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.moviestatusinfo = [];
      moviestatusinfoobjarr = newdocument.moviestatusinfo;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Created new Document");
    } else {
      moviestatusinfoobjarr = value2[0]["moviestatusinfo"];
      console.log(moviestatusinfoobjarr);
    }
  
    if (moviestatusinfoobjarr.length != 0) {
      for (let i = 0; i < moviestatusinfoobjarr.length; i++) {
        if (moviestatusinfoobjarr[i]["MovieId"] == movieid) {
          moviestatusinfoobjarr[i]["status"] = status;
        }
      }
  
      theatrerentedmovieinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            moviestatusinfo: moviestatusinfoobjarr,
          }
        )
        .then(() => {
          console.log("Inserted updated rented movie data in database");
          res.redirect("/tmdashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No movies Present in theatre!!!");
      res.redirect("/tmdashboard");
    }
  });

  module.exports = router;