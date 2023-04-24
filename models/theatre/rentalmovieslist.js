const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    MovieId:
    {
        type: String,
        required: true,
    },

    MovieName:
    {  
        type: String,
        required: true,
    },

    city:{
        type: String,
        required: true,
    },

})

const rentalmovieinfo = mongoose.model('rentalmovieinfo', DocumentSchema);
module.exports = rentalmovieinfo;