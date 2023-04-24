const mongoose = require('mongoose');

const statusinfo= mongoose.Schema({
 
    MovieId :
    {   
        type: String,
        required: true,
        trim: true,
    },

    status:
    {  
        type: String,
        required: true,
    },

    rentaldays:
    {
        type: Number,
        required: true,
    },

    rentaldate:
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

    moviestatusinfo:
    {  
        type: [statusinfo],
        required: true,
    },
})


const tmovieinfo = mongoose.model('tmovieinfo', DocumentSchema);
module.exports = tmovieinfo;