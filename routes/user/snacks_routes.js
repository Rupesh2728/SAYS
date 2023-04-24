const express = require("express");
const router = express.Router();

// Database
const ticketinfo = require("../../models/user/ticketsinfo");
const theatresignupinfo = require("../../models/theatre/signup");
const snackinfo = require("../../models/theatre/snackinfo");


router.get("/", async (req, res) => {
    let value1 = await ticketinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    let ticketarr = value1[0]["Ticketinfo"];
    let n = ticketarr.length;
    if (req.cookies.isUserLogin) {
      let ticketid;
      let theatrename;
      let location;
  
      if (req.cookies.TicketIdForSnacks) {
        ticketid = req.cookies.TicketIdForSnacks;
      } else {
        ticketid = ticketarr[n - 1]["TicketId"];
      }
  
      let value1 = await ticketinfo.findOne({
        UserReferenceNumber: req.cookies.UserReferenceNumber,
      });
  
      value1 = value1.Ticketinfo;
  
      for (let i = 0; value1.length; i++) {
        if (ticketid == value1[i]["TicketId"]) {
          theatrename = value1[i]["theatrename"];
          location = value1[i]["location"];
          break;
        }
      }
  
      let value2 = await theatresignupinfo.findOne({
        tName: theatrename,
        city: location,
      });
      value2 = value2.tReferenceNumber;
  
      let value3 = await snackinfo.findOne({ tReferenceNumber: value2 });
      value3 = value3.snackarr;
  
      res.clearCookie("TicketIdForSnacks");
      res.render("snackspage", {
        TicketId: ticketid,
        fooditem: value3,
        ticketarr: ticketarr,
      });
    } else res.redirect("/login");
  });


  router.post("/", async (req, res) => {
    let ticketid = req.body.Ticketid;
  
    res.cookie("TicketIdForSnacks", ticketid);
  
    res.redirect("/snacks");
  });

  module.exports = router;