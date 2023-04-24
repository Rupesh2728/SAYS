const mongoose = require("mongoose");
const var1 = mongoose.Schema({

  username: {
    type: String
  },
  usermailid: { type: String },
  rating: { type: Number },
  reviewdesc: { type: String }
});

const theatrereviewSchema = mongoose.Schema({
  tReferenceNumber: { type: String },
  review: { type: [var1] }
});
const theatrereviewdata = mongoose.model("TheatreReviews", theatrereviewSchema);
module.exports = theatrereviewdata;
