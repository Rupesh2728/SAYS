const mongoose = require('mongoose');
const message = mongoose.Schema({
    UserReferenceNumber :{
      
        type: String,
        required: true,
    }, 
    mailid:{
         
        type: String,
        required: true,
    },
    name:{

        type: String,
        required: true,
    },

    message:
    {
        type: String,
        required: true,
    },

    date:{
          type: String,
        required: true,
    }
})

const DocumentSchema = mongoose.Schema({
     
    UserReferenceNumber :{
      
        type: String,
        required: true,
    },
    msginfo:
    {
         
        type:[message],
        required: true,
    }, 
})

const DocumentCollection = mongoose.model('contactusqueries', DocumentSchema);
module.exports = DocumentCollection;




