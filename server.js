const express=require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const server = express();
const UserRouter = require("./routes/userRouter")
const SchoolRouter=require("./routes/schoolRouter")
//var jobappRouter = require("./routes/jobappRouter")

server.set("port", process.env.PORT || 4000)
server.use(cors())
require('dotenv').config()
server.use(bodyParser.json())
server.use(passport.initialize()) 
server.use("/user",UserRouter)
server.use("/school",SchoolRouter)
//server.use("/application", jobappRouter)

const url=process.env.MONGODB
console.log(url)
mongoose.connect(url,{
  useNewUrlParser: true,useUnifiedTopology: true
}).then(
  server.listen(server.get('port'), () => {
      console.log("SERVER IS RUNNING ON " + server.get("port"))
  })
).catch(err => console.log(err))

server.get("/", (req, res) => {
  res.send("Hello")
})
