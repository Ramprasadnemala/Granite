const mongoose= require("mongoose");

const ProductModel= new mongoose.Schema({
    // name, email, phone, city
    date:{
         type:String,
         required:true
    },
    DC_No:{
        type:String,
         required:true
    },
    vehicleNo:{
        type:String,
         required:true
    },
    materialType:{
       type:Number, 
   },
   transportName:{
        type:String,
   },
   sourcePlace:{
        type:String,
   },
 gross:{
        type:Number,
         required:true
    },
    materialType:{
       type:Number, 
   },
   tare:{
        type:Number,
   },
   net:{
    type:Number,
   },
   loadingTime:{
    type:String,
     required:true
},
unloadingTime:{
    type:String,
},
royalty:{
    type:Number,
},
remarks:{
    type:String,
},
})

module.exports = mongoose.model('products', ProductModel)