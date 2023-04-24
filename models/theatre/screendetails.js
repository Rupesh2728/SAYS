const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    Screenid :
    {   
        type: String,
        required: true,
    },

    Screenname:
    {  
        type: String,
        required: true,
    },

    numrows:
    {
        type:Number,
        required: true,
    },

    numcol:
    {
        type:Number,
        required: true,
    },

    seatarrangement:
    {
        type:[[]],
        required: true,
    },

    capacity:
    {
        type:Number,
        required: true,
    }
})

const screeninfo = mongoose.model('screeninfo', DocumentSchema);
module.exports = screeninfo;