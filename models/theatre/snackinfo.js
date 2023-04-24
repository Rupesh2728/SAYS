const mongoose = require('mongoose');
const snackdetail = mongoose.Schema({
  
    SnackName:
    {  
        type: String,
        required: true,
    },

    category:
    {
        type: String,
        required: true,
    },

    price:
    {
        type: String,
        required: true,
    },

   imgurl:
    {
        type: String,
        required: true,
    },
})

const DocumentSchema = mongoose.Schema({
    tReferenceNumber:
    {
        type: String,
        required: true,
    },

    snackarr:
    {
        type: [snackdetail],
        required: true,
    },
})

const snackinfo = mongoose.model('snackinfo', DocumentSchema);
module.exports = snackinfo;