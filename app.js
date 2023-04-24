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

