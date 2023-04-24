const mongoose = require('mongoose');



const screendetails = mongoose.Schema({
    
    screenname :
    {   
        type: String,
        required: true,
    },

    screencapacity:
    {   
        type:Number,
        required: true,
    },

    numrows:
    {   
        type:Number,
        required: true,
    },

    numcols:
    {   
        type:Number,
        required: true,
    },

    originalseatarrangementarr:{
        type:Array,
        required: true,
    },

    userbookingseatarr:{
        type:Array,
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

    Screens:
    {   
        type:[screendetails],
        required: true,
    },
})

const tscreeninfo = mongoose.model('screeninfo', DocumentSchema);
module.exports = tscreeninfo;