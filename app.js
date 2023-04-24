const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("server straed on port 3000");
});

//Cookie
const cookieparser = require("cookie-parser");
app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});
app.use(cookieparser());

//MongoDB Altas Connection
const mongoose = require("mongoose");
const { log } = require("console");
const dburl =
  "mongodb+srv://staion1504:aCYw1ZQ3wVZY7ku4@cluster0.xjrpfdo.mongodb.net/SAYS?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(dburl, connectionParams)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Failed to connect to mongodb");
  });

//User Routes
const landingpage = require("./routes/user/landingpage");
const loginpage = require("./routes/user/loginpage");
const signout = require("./routes/user/signout");
const signup = require("./routes/user/signup");
const homeroutes = require("./routes/user/home_routes");
const movieroutes = require("./routes/user/movie_routes");
const userprofileroutes = require("./routes/user/profile_routes");
const snacksroutes = require("./routes/user/snacks_routes");
const aboutusroutes = require("./routes/user/aboutus_routes");
const recentbookingroutes = require("./routes/user/recentbookings_routes");
const movienewsroutes = require("./routes/user/movienews_routes");
const moviereviewroutes = require("./routes/user/moviereviews_routes");
const theatrereviewroutes = require("./routes/user/theatrereview_routes");
const contactusroutes = require("./routes/user/contactus_routes");
const usertheatreprofileroutes = require("./routes/user/usertheatre_routes");
const moviegameroutes = require("./routes/user/moviegame_routes");

app.use("/", landingpage);
app.use("/login", loginpage);
app.use("/signout", signout);
app.use("/Signup", signup);
app.use("/home", homeroutes);
app.use("/movies", movieroutes);
app.use("/profile", userprofileroutes);
app.use("/snacks", snacksroutes);
app.use("/aboutus", aboutusroutes);
app.use("/recentbooking", recentbookingroutes);
app.use("/movienews", movienewsroutes);
app.use("/reviews", moviereviewroutes);
app.use("/treviews", theatrereviewroutes);
app.use("/contactus", contactusroutes);
app.use("/usertheatreprofile", usertheatreprofileroutes);
app.use("/moviegame", moviegameroutes);

//Theatre Dashboard Routes
const Tsignuproutes = require("./routes/Theatre/Tsignup_routes");
const Tdashboardroutes = require("./routes/Theatre/Tdashboard_routes");
const Tprofileroutes = require("./routes/Theatre/Tprofile_routes");
const Tsnackspageroutes = require("./routes/Theatre/Tsnackspage_routes");
const Tmdashboardroutes = require("./routes/Theatre/Tmdashboard_routes");
const Tscheduleroutes = require("./routes/Theatre/Tschedule_routes");
const Tloginroutes = require("./routes/Theatre/Tlogin_routes");
const Tsignoutroutes = require("./routes/Theatre/Tsignout");
const userTheatreinforoutes = require("./routes/Theatre/usertheatreinfo_routes");

app.use("/TSignup", Tsignuproutes);
app.use("/tdashboard", Tdashboardroutes);
app.use("/tprofile", Tprofileroutes);
app.use("/tsnackspage", Tsnackspageroutes);
app.use("/tmdashboard", Tmdashboardroutes);
app.use("/tschedule", Tscheduleroutes);
app.use("/Tlogin", Tloginroutes);
app.use("/Tsignout", Tsignoutroutes);
app.use("/usertheatreinfo", userTheatreinforoutes);

//Admin Dashboard Routes
const adminhomeroutes = require("./routes/Admin/adminhome_routes");
const adminmoviesroutes = require("./routes/Admin/adminmovies_routes");
const adminclientroutes = require("./routes/Admin/adminclient_routes");
const admintheatreroutes = require("./routes/Admin/admintheatre_routes");
const adminmassmailroutes = require("./routes/Admin/adminmassmail_routes");

app.use("/adminhome", adminhomeroutes);
app.use("/adminmovies", adminmoviesroutes);
app.use("/adminclient", adminclientroutes);
app.use("/admintheatre", admintheatreroutes);
app.use("/adminmassmail", adminmassmailroutes);

//<---Unwanted Things--->

// const md5 = require("md5");
// const nodemailer = require("nodemailer");

// const premiumclients = require(__dirname+"/public/js/homepage/premiumclients.js");

// //User requirements
// const userinfo = require("./models/user/signup");
// const moviereviewdata = require("./models/user/Moviereview");
// const theatrereviewdata = require("./models/user/theatrereview");

// //Theatre requirements
// const rentalmovies = require("./models/theatre/rentalmovieslist");
// const theatrerentedmovieinfo = require("./models/theatre/theatremovie");
// const theatresignupinfo = require("./models/theatre/signup");
// const movieinfo = require("./models/theatre/movieinfo");
// const snackinfo = require("./models/theatre/snackinfo");
// const userTinfo = require("./models/theatre/abouttheatre");
// const ticketinfo = require("./models/user/ticketsinfo");

// //Admin requirements
// const contactusqueries = require("./models/Admin/contactusqueries");
// const theatreverification = require("./models/Admin/theatreverification");

// let nearbyplaces = require(__dirname +
//   "/public/js/theatredashboard/nearbyplaces.js");

// const screeninfo = require("./models/theatre/theatrescreen");
// const movieshowinfo = require("./models/theatre/movieshowdetails");

// Movie Game
// const questions = require("./models/user/moviegamequestions");
// const mgamestatus = require("./models/user/moviegamestatus");
// const quizleaderboard = require("./models/user/quizleaderboard");
// const showdatailsinfo = require("./models/theatre/movieshowdetails");
// const rentalmovieinfo = require("./models/theatre/rentalmovieslist");
// const tmovieinfo = require("./models/theatre/theatremovie");

// function convertdate(inputDate) {
//   // inputDate = '28th June,2021'------>2021-06-28

//   const date = new Date(inputDate.replace(/(st|nd|rd|th)/, ""));
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;
//   return formattedDate;
// }
// async function CheckLatestMoviesForReviewHub(reviewdata) {
//   const date2 = new Date();
//   const today = date2.toISOString().slice(0, 10);
//   let releasedate;
//   let value = await movieinfo.find({});
//   for (let i = 0; i < value.length; i++) {
//     releasedate = value[i].releasedate;
//     releasedate = convertdate(releasedate);

//     if (releasedate.localeCompare(today) <= 0) {
//       reviewdata.push(value[i]);
//     }
//   }

//   for (let i = 0; i < reviewdata.length; i++) {
//     let myobj2 = { movie: reviewdata[i]["MovieName"] };
//     let x = await moviereviewdata.find(myobj2).sort({ rating: -1 }).limit(1);

//     // console.log(x);

//     if (x.length != 0) {
//       // console.log("hi icame here");
//       reviewdata[i]["rating"] = x[0]["rating"];
//       reviewdata[i]["reviewdesc"] = x[0]["reviewdesc"];
//     } else {
//       reviewdata[i]["rating"] = "";
//       reviewdata[i]["reviewdesc"] = "";
//     }
//   }
// }

// async function fillLatestandUpcoming(city, latestmovies1, upcomingmovies1) {
//   const date2 = new Date();
//   const today = date2.toISOString().slice(0, 10);
//   let checkrepeatedmovies = [];
//   let value1 = await theatresignupinfo.find({ city: city });

//   for (let i = 0; i < value1.length; i++) {
//     let value2 = await theatrerentedmovieinfo.findOne({
//       tReferenceNumber: value1[i].tReferenceNumber,
//     });
//     //array of objects
//     let moviearrayBasedoncity = value2.moviestatusinfo;

//     for (let i = 0; i < moviearrayBasedoncity.length; i++) {
//       let value3 = await movieinfo.findOne({
//         MovieId: moviearrayBasedoncity[i].MovieId,
//       });

//       if (checkrepeatedmovies.includes(moviearrayBasedoncity[i].MovieId)) {
//         continue;
//       } else {
//         checkrepeatedmovies.push(moviearrayBasedoncity[i].MovieId);
//       }

//       const date3 = new Date(moviearrayBasedoncity[i].rentaldate);
//       const rentaldate = date3.toISOString().slice(0, 10);

//       if (rentaldate.localeCompare(today) <= 0) {
//         if (moviearrayBasedoncity[i].status == "Active") {
//           latestmovies1.push(value3);
//         }

//         // console.log(value3);
//       } else {
//         upcomingmovies1.push(value3);
//       }
//     }
//   }
// }
