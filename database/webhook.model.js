const mongoose=require('mongoose');
const webhook=mongoose.Schema({
    name:String,
    payload:Object,
    addedBy:String,
    mail:String
},{
    timestamps:true
});
module.exports=mongoose.model('WebHook',webhook);