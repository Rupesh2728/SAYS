const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    movie: String,
    criticname: String,
    rating: Number,
    reviewdesc: String,
    // img: String, closed fro temparory project
  });


const moviereviewdata = mongoose.model('MovieReviews', reviewSchema);
module.exports = moviereviewdata ;