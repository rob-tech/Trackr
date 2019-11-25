const express = require("express")
const cors = require("cors")
var jobappRouter = require("./routes/jobappRouter")
var userRouter = require("./routes/userRouter")
const auth = require("./authenticate")

require('dotenv').config()

const mongoose = require("mongoose")
const passport = require("passport")


const server = express()

server.set("port", process.env.PORT || 4000)

server.use(cors())
server.use(express.json());
server.use(passport.initialize())

server.use("/application", jobappRouter)
server.use("/user", userRouter)

console.log(process.env.MONGOCONNECT)

mongoose.connect(process.env.MONGOCONNECT, {
  useNewUrlParser: true
}).then(server.listen(server.get('port'), () => {
  console.log("SERVER IS RUNNING ON " + server.get("port"))
}))
// (server.listen(port,  () => {
//   console.log("server is running on port 3000")
.catch(err => console.log(err))

server.get("/", (req, res) => {
  res.send("Hello")
})