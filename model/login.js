var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/cartDb2');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "Name" : String,
    "Email" : String,
    "Password" : String,
  
};
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);