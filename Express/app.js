var express = require("express");
var app = express();

app.get("/",function(req, res){
    res.send("Hi there");
});

app.get("/by",function(req,res){
    res.send("Goodbye");
    console.log("Check Check");
});

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});