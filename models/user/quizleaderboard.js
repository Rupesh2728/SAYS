const mongoose = require('mongoose');
const DocumentSchema = mongoose.Schema({
     
    UserReferenceNumber :
    {
      
        type: String,
        required: true,
        trim: true,

    },
    firstName:{
         
        type: String,
        required: true,
        trim: true,
    },
  
    email:{
    
       type:String,
       required:true


    },
    
    points:{
        type:Number,
        required:true,
    }
});

const DocumentCollection = mongoose.model('moviegameleaderboard', DocumentSchema);
module.exports = DocumentCollection;