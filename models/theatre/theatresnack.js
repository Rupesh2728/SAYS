const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    tReferenceNumber :
    {   
        type: String,
        required: true,
        trim: true,
    },

    SnackName:
    {  
        type: [],
        required: true,
    },
})

const tsnackinfo = mongoose.model('snackinfo', DocumentSchema);
module.exports = tsnackinfo;