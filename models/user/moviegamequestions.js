const mongoose = require('mongoose');
const DocumentSchema = mongoose.Schema({
     
    quesid :
    {
      
        type: String,
        required:true,
    },

    mainques:
    {       
        type: String,
        required: true,
    },
  
   options:{
    
       type:Array,
       required:true
    },
    
    correctans:{
        type:String,
        required:true,
    }
});

const DocumentCollection = mongoose.model('moviegamequestions', DocumentSchema);
module.exports = DocumentCollection;