const express = require("express");
const bodyParser = require("body-parser");
const passport=require("passport")
const userRouter = express.Router();
const UserSchema = require("../models/User");
const { createToken } = require("../authenticate")
userRouter.post("/register/", async (req, res) => {
  try {
    console.log(req.body)
    var user = await UserSchema.register(req.body, req.body.password);
    console.log(user);
    res.send(user);
  } catch (exx) {
    res.statusCode = 500;
    res.send(exx);
  }
});
userRouter.post("/login", passport.authenticate("local"), (req, res) => {
    try
    {
        var token = createToken({ _id: req.user._id });
        console.log(token)
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

userRouter.get("/", async (req,res)=>{
    res.send(await UserSchema.find({}))
})
module.exports = userRouter;
