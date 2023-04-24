const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
     
    tReferenceNumber :{   
        type: String,
        required: true,
        trim: true,
    },
    tName:{
         
        type: String,
        required: true,
        trim: true,
    },

    temail:{
    
       type:String,
       required:true


    },
    tNumber1:{
        type:Number,
        required:true

    },

    tNumber2:{
        type:Number,
        required:true

    },

    street:
    {
       type: String,
       required: true,
    },


     city:{
        
        type:String,
        required:true
     },

     state:{
        
        type:String,
        required:true
     },

     pincode:
     {
        type:Number,
        required:true
     },

    
     licensenum:{
    
        type:String,
        required:true
     },

    LoginPassword:{
        type: String,
        required: true,
    },
  
    nearbyplace1:
    {
        type:String,
        required: true,
    },
    nearbyplace2:
    {
        type:String,
        required: true,
    },
    nearbyplace3:
    {
        type:String,
        required: true,
    },
    nearbyplace4:
    {
        type:String,
        required: true,
    }
})

const theatreverification = mongoose.model('theatreverification', DocumentSchema);
module.exports =theatreverification;
