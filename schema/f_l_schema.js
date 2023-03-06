const mongoose = require('mongoose')

const schema = mongoose.Schema;

const f_l_schema = new schema({
    image:{type:String},
    title:{type:String, required:true},
    price:{type:String, required:true},
    reviews:{type:String, required:true},
    ratings :{type:String, required:true},
    originalPrice:{type:String, required:true},
    offerPercentage:{type:String, required:true}
}
    
,{timestamps:true}
)

const f_l_Schema = mongoose.model("f_l",f_l_schema)

module.exports = f_l_Schema;
