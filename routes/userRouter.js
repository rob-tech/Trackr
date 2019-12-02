const express = require("express");
const bodyParser = require("body-parser");
const passport=require("passport")
const userRouter = express.Router();
const UserSchema = require("../models/User");
const { createToken, getToken, token } = require("../authenticate")

userRouter.post("/register/", async (req, res) => {
  try {
    var user = await UserSchema.register(req.body, req.body.password);   
    res.send(user);
  } catch (exx) {
    res.statusCode = 500;
    res.send(exx);
  }
});


userRouter.post("/refresh", token, (req, res) => {
  try {
  var token = createToken({_id: req.user._id, email: req.user.email})
  res.statusCode = 200
  res.json({
      status: "New Token Generated",
      user: req.user,
      token: token,
      success: true,
  })
} catch (err) {
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err
  });
}
})

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
    try
    {
        var token = createToken({ _id: req.user._id });
        // res.render('error', {        
        //     message: err.message,
        //     error: {}
        // });
        res.send({
            success: true,
            email: req.user.email,
            token: token
          });
          
    }
    catch(ex)
    {
      res.send(ex)
    }  
});

userRouter.get("/",async(req,res)=>{
   try
   {
    
     var users= await UserSchema.find({})     
    //  res.render('error', {        
    //     message: err.message,
    //     error: {}
    // });
    res.send(users)
    }
   catch(ex)
   {
       res.send(ex)
   }
})

userRouter.get("/manager",async(req,res)=>{
  try
  {
   
    var users= await UserSchema.find({ role: { $in: 'manager'} })     
   //  res.render('error', {        
   //     message: err.message,
   //     error: {}
   // });
   res.send(users)
   }
  catch(ex)
  {
      res.send(ex)
  }
})


userRouter.get("/:id",async(req,res)=>{
    try
    {
      var users= await UserSchema.findById({_id:req.params.id})
      
    //   res.render('error', {        
    //     message: err.message,
    //     error: {}
    // });
    res.send(users)
    }
    catch(ex)
    {
        res.send(ex)
    }
 })

 userRouter.delete("/:id",async(req,res)=>{
    try
    {
      var users= await UserSchema.findByIdAndDelete({_id:req.params.id})

    res.send("user deleted successfully.")       
    }
    catch(ex)
    {
        res.send(ex)
    }
 })

 userRouter.put("/:id",async(req,res)=>{
    try
    {       
      var users= await UserSchema.findByIdAndUpdate({_id:req.params.id},req.body)

      res.send("user updated successfully.")
    }
    catch(ex)
    {
        res.send(ex)
    }
 })

module.exports = userRouter;
