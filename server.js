var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./model/login");
var mongoOp2    =   require("./model/product");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.route("/product")
    .get(function(req,res){
        var response = {};
        mongoOp2.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
               

            } else {
                response = data;
                 console.log("Password match");
              
            }
            
            res.json(response);
        });
    })
      .post(function(req,res){
        var db = new mongoOp2();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.ItemName = req.body.ItemName; 
        db.Price = req.body.Price;
        db.Description = req.body.Description;
        db.Catagory = req.body.Catagory;
       

        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false, "message" : "Data added"};
                res.json(response);
            }
            
        });
    });

      router.route("/getproduct/:id")
        .get(function(req,res){
        var response = {};
        
        mongoOp2.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
                res.json(response);
            } else {
                response = {"error" : false,"message" : data};
                
                res.json(response);
            }
           //console.log(data.userPassword);
            
        });
    }) ;

   router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
               

            } else {
                response = data;
                 console.log("Password match");
              
            }
            
            res.json(response);
        });
    })
      .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.Name = req.body.Name; 
        db.Email = req.body.Email;
        db.Password = req.body.Password;
        

        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false, "message" : "Data added"};
                res.json(response);
            }
            
        });
    });

router.route("/login")
.put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findOne({Email : req.body.id},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
             response = {"error" : false,"message" : data};
                
                if(data == null)
                {
                   console.log("data.userPassword"); 
                  // res.json(response);
                res.status(400).json(response);
                   
                }
                else{
                    data.userEmail = req.body.userEmail;
                    if(req.body.userPassword == data.Password){
                            res.json(response);
                            console.log("sucess!");
                    }
                    else{
                        res.status(400).json(response);
                        console.log("fail!");
                    }
           console.log("data.userPassword");
                    
                }
              
            }
        });
    });

app.use('/',router);

app.listen(3500);
console.log("Listening to PORT 3500");