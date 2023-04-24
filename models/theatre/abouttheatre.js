const mongoose = require('mongoose');
const DocumentSchema = mongoose.Schema({
    tReferenceNumber :{   
        type: String,
        required: true,
    },
    tName:{
         
        type: String,
        required: true,
        trim: true,
    },

    imgurl1:
    {
        type: String,
        required: true,
    },

    imgurl2:
    {
        type: String,
        required: true,
    },

    imgurl3:
    {
        type: String,
        required: true,
    },

    screentype:
    {
        type: String,
        required: true,
    },

    snacks:
    {
        type: String,
    },

    Ttype:
    {
        type: String,
    },

    sound:
    {
        type: String,
    },

    about:{
        type: String,
        required: true,
    },
})

const userTinfo = mongoose.model('abouttheatre', DocumentSchema);
module.exports =userTinfo;