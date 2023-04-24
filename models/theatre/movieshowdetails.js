const mongoose = require('mongoose');

const movieshowinfo= mongoose.Schema({
 
    MovieId :
    {   
        type: String,
        required: true,
       
    },

    MovieName:
    {   
        type: String,
        required: true,
      
    },

    duration:
    {
        type: String,
        required: true, 
    },

    screenname:{
        type: String,
        required: true,
    },

    showtime:
    {
        type: String,
        required: true, 
    },

    ampm:
    {
        type: String,
        required: true, 
    },

    pclassprice:{
        type: String,
        required: true, 
    },

    nclassprice:{
        type: String,
        required: true, 
    },

    fromdate:
    {
        type: String,
        required: true,
    },

    todate:
    {
        type: String,
        required: true,
    }
})

const DocumentSchema = mongoose.Schema({
    tReferenceNumber :
    {   
        type: String,
        required: true,
        trim: true,
    },

    showdetails:
    {  
        type: [movieshowinfo],
        required: true,
    },
})


const showdatailsinfo = mongoose.model('showdetails', DocumentSchema);
module.exports = showdatailsinfo;