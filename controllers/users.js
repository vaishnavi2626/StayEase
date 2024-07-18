const User = require("../models/user");
const passport = require("passport");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
 };

 module.exports.createNewUser  = async(req,res,next)=>{
    try{
       let {username, email, password} = req.body;
       let newUser = new User({email, username});
       const registeredUser = await User.register(newUser, password);
       req.login(registeredUser,(error)=>{
          if(error){return next(error);}
          req.flash("success","Welcome to EliteNights");
          res.redirect("/listings");
       })
       
    }catch(err){
       req.flash("error",err.message);
       res.redirect("/signup");
    }
 }
 module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
 }
 module.exports.loginUser = (req,res)=>{
    req.flash("success","Welcome back to EliteNights!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 }
 module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
       if(err){
          return next(err);
       }
       req.flash("success","You have logged out!");
       res.redirect("/login");
    })
 };