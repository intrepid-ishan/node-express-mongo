var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


User.findOne({ name: "Jerry Johnson" }, function (err, user) {
    if (err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "Three things I really hate",
            content: "Overthinking"
        });
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});


//---Before Embedding---
/* 
var newUser = new User({
    email: "17bce052@nirmauni.ac.in",
    name: "Ishan Makadia"
});

newUser.save(function (err, user) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(user);
    }
});

var newPost = new Post({
    title: "Travel",
    content: "Hey you are done"
});
newPost.save(function (err, post) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(post);
    }
});
*/


//---After Embedding---
/*
var newUser = new User({
    name: "Jerry Johnson",
    email: "jerry@gmail.com"
});

newUser.posts.push({
    title: "Tom and Jerry show",
    content: "Just kidding. Go to potions class to learn it"
});

newUser.save(function(err,user){
    if(err){
        console.log(err);
    }
    else{
        console.log(user);
    }
});
*/