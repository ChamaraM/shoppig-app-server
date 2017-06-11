var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/cartDb2');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var productSchema  = {
    "ItemName" : String,
    "Price" : String,
    "Description" : String,
    "Catagory" : String,
  
};
// create model if not exists.
module.exports = mongoose.model('ProductDetails',productSchema);