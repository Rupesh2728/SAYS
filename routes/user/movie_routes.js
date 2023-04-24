const express = require("express");
const router = express.Router();
//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatrerentedmovieinfo = require("../../models/theatre/theatremovie");
const movieinfo = require("../../models/theatre/movieinfo");
const moviereviewdata = require("../../models/user/Moviereview");
const movieshowinfo = require("../../models/theatre/movieshowdetails");
const ticketinfo = require("../../models/user/ticketsinfo");
const screeninfo = require("../../models/theatre/theatrescreen");
const showdatailsinfo = require("../../models/theatre/movieshowdetails");


function convertdate(inputDate) {
    // inputDate = '28th June,2021'------>2021-06-28
  
    const date = new Date(inputDate.replace(/(st|nd|rd|th)/, ""));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  }


async function fillLatestandUpcoming(city, latestmovies1, upcomingmovies1) {
    const date2 = new Date();
    const today = date2.toISOString().slice(0, 10);
    let checkrepeatedmovies = [];
    let value1 = await theatresignupinfo.find({ city: city });
  
    for (let i = 0; i < value1.length; i++) {
      let value2 = await theatrerentedmovieinfo.findOne({
        tReferenceNumber: value1[i].tReferenceNumber,
      });
      //array of objects
      let moviearrayBasedoncity = value2.moviestatusinfo;
  
      for (let i = 0; i < moviearrayBasedoncity.length; i++) {
        let value3 = await movieinfo.findOne({
          MovieId: moviearrayBasedoncity[i].MovieId,
        });
  
        if (checkrepeatedmovies.includes(moviearrayBasedoncity[i].MovieId)) {
          continue;
        } else {
          checkrepeatedmovies.push(moviearrayBasedoncity[i].MovieId);
        }
  
        const date3 = new Date(moviearrayBasedoncity[i].rentaldate);
        const rentaldate = date3.toISOString().slice(0, 10);
  
        if (rentaldate.localeCompare(today) <= 0) {
          if (moviearrayBasedoncity[i].status == "Active") {
            latestmovies1.push(value3);
          }
  
          // console.log(value3);
        } else {
          upcomingmovies1.push(value3);
        }
      }
    }
  }


  async function CheckLatestMoviesForReviewHub(reviewdata) {
    const date2 = new Date();
    const today = date2.toISOString().slice(0, 10);
    let releasedate;
    let value = await movieinfo.find({});
    for (let i = 0; i < value.length; i++) {
      releasedate = value[i].releasedate;
      releasedate = convertdate(releasedate);
  
      if (releasedate.localeCompare(today) <= 0) {
        reviewdata.push(value[i]);
      }
    }
  
    for (let i = 0; i < reviewdata.length; i++) {
      let myobj2 = { movie: reviewdata[i]["MovieName"] };
      let x = await moviereviewdata.find(myobj2).sort({ rating: -1 }).limit(1);
  
      // console.log(x);
  
      if (x.length != 0) {
        // console.log("hi icame here");
        reviewdata[i]["rating"] = x[0]["rating"];
        reviewdata[i]["reviewdesc"] = x[0]["reviewdesc"];
      } else {
        reviewdata[i]["rating"] = "";
        reviewdata[i]["reviewdesc"] = "";
      }
    }
  }


router.get("/", async (req, res) => {
    if (req.cookies.isUserLogin) {
      let latestmovies = [];
      let upcomingmovies = [];
      let reviewdata = [];
      let default_city = "Vijayawada";
  
      await fillLatestandUpcoming(default_city, latestmovies, upcomingmovies);
  
      await CheckLatestMoviesForReviewHub(reviewdata);
  
      res.render("moviepage", {
        checklocaton: default_city,
        checkLangfileter: "",
        checkGenrefilter: "",
        latestmovies: latestmovies,
        upcomingmovies: upcomingmovies,
        reviewdata: reviewdata,
      });
    } else res.redirect("/login");
  });


  router.get("/individualmovie", async (req, res) => {
    const mname = req.query.name;
    const mcity = req.query.city;
  
    let value = await movieinfo.find({ MovieName: mname });
  
    value = value[0];
  
    if (req.cookies.isUserLogin)
      res.render("individualpage", { movieobj: value, location: mcity });
    else res.redirect("/login");
  });


  router.get("/timings", async (req, res) => {
    const mname = req.query.name;
    const mcity = req.query.city;
    let showdetailsarray = [];
    let timingsarray = [];
    let obj = {};
    let timevalue;
  
    let flag = false;
  
    let value = await movieinfo.find({ MovieName: mname });
    value = value[0];
  
    let value1 = await theatresignupinfo.find({ city: mcity });
    for (let i = 0; i < value1.length; i++) {
      let value2 = await movieshowinfo.findOne({
        tReferenceNumber: value1[i].tReferenceNumber,
      });
  
      movietimearray = value2.showdetails;
  
      for (let i = 0; i < movietimearray.length; i++) {
        if (movietimearray[i].MovieName == mname) {
          flag = true;
  
          let time = movietimearray[i].showtime + " " + movietimearray[i].ampm;
          if (req.cookies.timefilter) {
            if (time == req.cookies.timefilter) {
              timingsarray.push(time);
              timevalue = time;
            }
          } else {
            timingsarray.push(time);
            timevalue = "Show All";
          }
        }
      }
  
      if (flag && timingsarray.length != 0) {
        timingsarray.sort((a, b) => {
          const timeA = new Date("01/01/2000 " + a);
          const timeB = new Date("01/01/2000 " + b);
          return timeA - timeB;
        });
        obj.tReff = value1[i].tReferenceNumber;
        obj.tName = value1[i].tName;
        obj.timingsarray = timingsarray;
        timingsarray = [];
  
        showdetailsarray.push(obj);
        obj = {};
        flag = false;
      } else {
        timevalue = req.cookies.timefilter;
      }
    }
  
    res.clearCookie("timefilter");
    if (req.cookies.isUserLogin)
      res.render("timingspage", {
        timevalue: timevalue,
        movieobj: value,
        showdetailsarray: showdetailsarray,
      });
    else res.redirect("/login");
  });
  
  router.post("/timings", async function (req, res) {
    let timeselected = req.body.time;
    let name = req.query.name;
    let city = req.query.city;
    if (timeselected != "Show All") {
      res.cookie("timefilter", timeselected);
    }
    res.redirect("/movies/timings?name=" + name + "&" + "city=" + city);
  });


  router.post("/seatarrangement/getseatarr", async function (req, res) {
    let tReff = req.body.tReff;
    let screenname = req.body.sname;
    let userbookingseatarr;
    let numrows, numcols;
    let screendetails = await screeninfo.find({ tReferenceNumber: tReff });
    screendetails = screendetails[0]["Screens"];
    for (let i = 0; i < screendetails.length; i++) {
      if (screendetails[i]["screenname"] == screenname) {
        userbookingseatarr = screendetails[i]["userbookingseatarr"];
        numrows = screendetails[i]["numrows"];
        numcols = screendetails[i]["numcols"];
      }
    }
    res.json({
      userbookingseatarr: userbookingseatarr,
      numcols: numcols,
      numrows: numrows,
    });
  });
  
  router.post("/seatarrangement/addticket", async function (req, res) {
    let treff = req.body.tReff;
    let MovieName = req.body.MovieName;
    let ScreenName = req.body.screenname;
    let seatarr = req.body.seatnumarr;
    let stime = req.body.time;
  
    let value1 = await movieinfo.find({ MovieName: MovieName });
    let imgurl = value1[0]["imgurl"];
    let currtid;
    let value2 = await ticketinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    if (value2.length == 0) {
      let newdocument = new ticketinfo();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.Ticketinfo = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new document in ticketifo database");
        })
        .catch((err) => {
          console.log(err);
        });
  
      currtid = "SAYS1001";
    } else {
      let lastticketid =
        value2[0]["Ticketinfo"][value2[0]["Ticketinfo"].length - 1]["TicketId"];
      lastticketid = lastticketid.slice(4);
      lastticketid = Number(lastticketid);
      lastticketid += 1;
      currtid = "SAYS" + lastticketid;
    }
  
    let value3 = await theatresignupinfo.find({ tReferenceNumber: treff });
    let tname = value3[0]["tName"];
    let loc = value3[0]["city"];
  
    let obj = {
      TicketId: currtid,
      MovieName: MovieName,
      Movieimgurl: imgurl,
      theatrename: tname,
      location: loc,
      time: stime,
      seats: seatarr,
      screenname: ScreenName,
    };
  
    let value4 = await ticketinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    value4[0]["Ticketinfo"].push(obj);
  
    ticketinfo
      .updateOne(
        { UserReferenceNumber: req.cookies.UserReferenceNumber },
        {
          UserReferenceNumber: req.cookies.UserReferenceNumber,
          Ticketinfo: value4[0]["Ticketinfo"],
        }
      )
      .then(() => {
        console.log("Added New Ticket into Db");
        res.json({ k: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/seatarrangement/updateseatsarr", async function (req, res) {
    let seatarr = req.body.seatarr;
    let treff = req.body.tReff;
    let sname = req.body.sname;
    let value = await screeninfo.find({ tReferenceNumber: treff });
    for (let i = 0; i < value[0]["Screens"].length; i++) {
      if (value[0]["Screens"][i]["screenname"] == sname) {
        value[0]["Screens"][i]["userbookingseatarr"] = seatarr;
        break;
      }
    }
  
    screeninfo
      .updateOne(
        { tReferenceNumber: treff },
        {
          tReferenceNumber: treff,
          Screens: value[0]["Screens"],
        }
      )
      .then(() => {
        console.log("Updated user screen info in Db");
        res.json({ k: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/seatarrangement", async (req, res) => {
    const mname = req.query.name;
    const treffnum = req.query.tReff;
    const showtime = req.query.time;
    let premiumprice;
    let normalprice;
    let screenname;
    let userbookingseatarr;
    let showdetailsarray = await showdatailsinfo.find({
      tReferenceNumber: treffnum,
    });
    showdetailsarray = showdetailsarray[0]["showdetails"];
    for (let i = 0; i < showdetailsarray.length; i++) {
      if (
        showdetailsarray[i]["MovieName"] == mname &&
        showdetailsarray[i]["showtime"] + " " + showdetailsarray[i]["ampm"] ==
          showtime
      ) {
        screenname = showdetailsarray[i]["screenname"];
        premiumprice = showdetailsarray[i]["pclassprice"];
        normalprice = showdetailsarray[i]["nclassprice"];
      }
    }
  
    let infoobj = {
      mname: mname,
      tReff: treffnum,
      showtime: showtime,
      premiumprice: premiumprice,
      normalprice: normalprice,
      screenname: screenname,
    };
  
    let screendetails = await screeninfo.find({ tReferenceNumber: treffnum });
    screendetails = screendetails[0]["Screens"];
    for (let i = 0; i < screendetails.length; i++) {
      if (screendetails[i]["screenname"] == screenname) {
        userbookingseatarr = screendetails[i]["userbookingseatarr"];
      }
    }
    let movieobj = await movieinfo.findOne({ MovieName: mname });
    if (req.cookies.isUserLogin)
      res.render("seatarrangement", {
        movieobj: movieobj,
        userbookingseatarr: userbookingseatarr,
        infoobj: infoobj,
      });
    else res.redirect("/login");
  });



  router.post("/searchbar", async function (req, res) {
    let moviename = req.body.moviename;
    let city = req.body.City;
  
    res.redirect("/movies/individualmovie?name=" + moviename + "&city=" + city);
  });
  
  router.post("/getsuggestion", async function (req, res) {
    let city = req.body.city;
    let latestmovies = [];
    let upcomingmovies = [];
    await fillLatestandUpcoming(city, latestmovies, upcomingmovies);
    res.json(latestmovies);
  });
  
  router.post("/", async function (req, res) {
    let lang = req.body.Lang;
    let genre = req.body.Genre;
    let city = req.body.location;
  
    let latestmovies1 = [];
    let upcomingmovies1 = [];
    let latestmovies2 = [];
    let upcomingmovies2 = [];
    let reviewdata = [];
  
    await fillLatestandUpcoming(city, latestmovies1, upcomingmovies1);
    await await CheckLatestMoviesForReviewHub(reviewdata);
  
    if (lang == "All" && genre == "All") {
      res.render("moviepage", {
        checklocaton: city,
        checkLangfileter: "",
        checkGenrefilter: "",
        latestmovies: latestmovies1,
        upcomingmovies: upcomingmovies1,
        reviewdata: reviewdata,
      });
    } else if (lang != "All" && genre == "All") {
      for (let i = 0; i < latestmovies1.length; i++) {
        if (latestmovies1[i].language == lang) {
          latestmovies2.push(latestmovies1[i]);
        }
      }
      for (let i = 0; i < upcomingmovies1.length; i++) {
        if (upcomingmovies1[i].language == lang) {
          upcomingmovies2.push(upcomingmovies1[i]);
        }
      }
  
      res.render("moviepage", {
        checklocaton: city,
        checkLangfileter: lang,
        checkGenrefilter: "",
        latestmovies: latestmovies2,
        upcomingmovies: upcomingmovies2,
        reviewdata: reviewdata,
      });
    } else if (lang == "All" && genre != "All") {
      for (let i = 0; i < latestmovies1.length; i++) {
        if (latestmovies1[i].genre.includes(genre)) {
          latestmovies2.push(latestmovies1[i]);
        }
      }
      for (let i = 0; i < upcomingmovies1.length; i++) {
        if (upcomingmovies1[i].genre.includes(genre)) {
          upcomingmovies2.push(upcomingmovies1[i]);
        }
      }
  
      res.render("moviepage", {
        checklocaton: city,
        checkLangfileter: "",
        checkGenrefilter: genre,
        latestmovies: latestmovies2,
        upcomingmovies: upcomingmovies2,
        reviewdata: reviewdata,
      });
    } else {
      for (let i = 0; i < latestmovies1.length; i++) {
        if (
          latestmovies1[i].genre.includes(genre) &&
          latestmovies1[i].language == lang
        ) {
          latestmovies2.push(latestmovies1[i]);
        }
      }
  
      for (let i = 0; i < upcomingmovies1.length; i++) {
        if (
          upcomingmovies1[i].genre.includes(genre) &&
          upcomingmovies[i].language == lang
        ) {
          upcomingmovies2.push(upcomingmovies1[i]);
        }
      }
  
      res.render("moviepage", {
        checklocaton: city,
        checkLangfileter: lang,
        checkGenrefilter: genre,
        latestmovies: latestmovies2,
        upcomingmovies: upcomingmovies2,
        reviewdata: reviewdata,
      });
    }
  });

module.exports = router;