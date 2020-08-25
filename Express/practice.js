var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hi there! Welcome to my assignment!');
  });

app.get("/speak/:animalname",function(req,res){
    var animalname = req.params.animalname;
    if(animalname== "pig"){
        var sound = "'Oink'";
    }
    else if(animalname == "cow"){
        var sound = "'Moo'";
    }
    else{
        var sound = "'Woof Woof!'";
    }    

    res.send("The " + animalname + " says " + sound);    
});


app.get('/repeat/:word/:number',function(req,res){
    var word = req.params.word;
    var number =  parseInt(req.params.number,10);
    var i;
    var final = "";
    for(i=0; i<number ; i++ ){
        final = final + word + " ";
    }
    res.send(final + " ");

});

app.get('*', function (req, res) {
    res.send('Sorry page not found... What are you doing with your life?');
  });



app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});