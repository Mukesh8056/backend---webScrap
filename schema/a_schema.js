const mongoose = require('mongoose')

const schema = mongoose.Schema;

const a_schema = new schema({
    image:{type:String},
    title:{type:String},
    price:{type:String},
    reviews:{type:String},
    ratings :{type:String,},
    originalPrice:{type:String},
    offerPercentage:{type:String}
}
    
,{timestamps:true}
)

const a_Schema = mongoose.model("a_mobile",a_schema)

module.exports = a_Schema;
