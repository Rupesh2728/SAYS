const mongoose = require('mongoose');

const ticketinfo = mongoose.Schema({
    TicketId:{
         
        type: String,
        required: true,
    },
    MovieName:{

        type: String,
        required: true,
        trim: true,

    },

    Movieimgurl:
    {
        type: String,
        required: true,
    },

    theatrename:{
        type: String,
        required: true,
    },

    screenname:{
        type: String,
        required: true,
    },

    location:{
        type: String,
        required: true,
    },

    time:{
        type: String,
        required: true,
    },

    seats:{
       type:Array,
       required:true,
    },
})

const DocumentSchema = mongoose.Schema({
     
    UserReferenceNumber :{
      
        type: String,
        required: true,

    },
    Ticketinfo:
    {
         
        type:[ticketinfo],
        required: true,
    }, 
})

const DocumentCollection = mongoose.model('ticketsinfo', DocumentSchema);
module.exports = DocumentCollection;




