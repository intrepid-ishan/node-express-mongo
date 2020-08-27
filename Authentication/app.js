var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),//requires the model with Passport-Local Mongoose plugged in
    LocalStrategy         = require("passport-local"),//module for using uname, pass
    passportLocalMongoose = require("passport-local-mongoose");//mongoose plugin[https://mongoosejs.com/docs/plugins.html]
const mongoose            = require('mongoose');//ODM library  //--continue[https://www.npmjs.com/package/passport-local-mongoose]
    
    
    mongoose.connect('mongodb://localhost:27017/auth_demo_app', {
      useNewUrlParser: true,//to avoid Deprecation Warning
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));


var app = express();//using various functionality of express[object.function]

app.set('view engine','ejs');//eliminate repetative use of .ejs while rendering
app.use(bodyParser.urlencoded({extended: true}));//when post req || forms in use

//.use as a function in one go [newsyntax]
app.use(require("express-session")({
    secret: "anything here",//to encode decode session
    resave: false,
    saveUninitialized: false
}));

//for using passport
app.use(passport.initialize());
app.use(passport.session());


//at login time added [6.]
passport.use(new LocalStrategy(User.authenticate()));

//use static serialize and deserialize of model for passport session support
//Reading data from session
passport.serializeUser(User.serializeUser());//encoding, #plugin_used_here
passport.deserializeUser(User.deserializeUser());//decoding, #plugin_used_here


//==============
//ROUTES
//==============

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

//===Auth Routes===

//show sign up form
app.get("/register",function(req,res){
    res.render("register");
});

//handling user sign up
app.post("/register",function(req,res){
    //User.(pluginFunctionHere)  [(unsaved obj,password,callback)]
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        //login user, handle session, run serialize method
        passport.authenticate("local")(req,res,function(){
            //afterlogin
            res.redirect("/secret");
        });
    });
});


//show login form
app.get("/login",function(req,res){
    res.render("login");
});

//login logic [route, middleware, callback]
//middleware: code that runs before final route callback
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect: "/login"
}),function(req,res){
//not requried
});


app.get("/logout",function(req,res){
    //destroying user data in session
    req.logout();
    res.redirect("/");
});

//UD-MiddleWare
//standardArgs[req,res,next]
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, ()=>{
    console.log("Server has started!");
});