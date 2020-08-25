var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2",{useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false });

var Post = require("./models/post");
var User = require("./models/user");

//---Object References--- 

//Using .create seprately and then push

/*
User.create({
   email: "bob@gmail.com",
   name: "Bob Belcher"
});

//Can use promises here!
Post.create({
   title:"How to cook the best burger Part-4",
   content: "blah blah blah"
},function(err,post){
   User.findOne({email: "bob@gmail.com"},function(err, foundUser){
      if(err){
         console.log(err);
      } else{
         foundUser.posts.push(post);
         foundUser.save(function(err, data){
            if(err){
               console.log(err);
            }else{
               console.log(data);
            }
         });
      }     
   });
});
*/

//---Printing Referenced Objects---
//Find user
//Populate posts for viewing title and content
//Find all posts for that user

/*
User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
   if(err){
      console.log(err);
   }else{
      console.log(user);
   }
});
*/
