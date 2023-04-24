const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
     
    UserReferenceNumber :{
      
        type: String,
        required: true,
        trim: true,

    },
    firstName:{
         
        type: String,
        required: true,
        trim: true,
    },
    lastName:{

        type: String,
        required: true,
        trim: true,

    },
    DOB:{

        type:Date,
        required: true

    },
    email:{
    
       type:String,
       required:true


    },
    MobileNumber:{
        type:Number,
        required:true

    },
    Gender:{
        
        type:String,
        required:true

    },
    LoginPassword:{
        type: String,
        required: true,
    },
    profilePassword:{

        type: String,
        required: true,
    },
    cardName :{
     
        type:String,
        required: true,
        trim:true

    },
    cardNumber:{
        type:Number,
        required: true,
        trim:true

    },
    CVV:{
      
        type:String, 
        required: true,
        trim:true
   
    },
    expiry:
    { 
        type:String,
        required: true,
        trim:true     
    }
})

const DocumentCollection = mongoose.model('userregistrations', DocumentSchema);
module.exports = DocumentCollection;