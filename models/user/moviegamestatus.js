const mongoose = require('mongoose');
const DocumentSchema = mongoose.Schema({
     
    UserReferenceNumber :
    {
        type: String,
        required: true,
    },
    played:{
        type: Boolean,
        required: true,
    }
});

const DocumentCollection = mongoose.model('moviegamestatus', DocumentSchema);
module.exports = DocumentCollection;