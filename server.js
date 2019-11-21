const express = require("express")
const cors = require("cors")
var jobappRouter = require("./routes/jobappRouter")
var userRouter = require("./routes/userRouter")
const auth = require("./authenticate")

const mongoose = require("mongoose")
const passport = require("passport")


const server = express()

server.use(cors())
server.use(express.json());
server.use(passport.initialize())

server.use("/application", jobappRouter)
server.use("/user", userRouter)

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true
}).then(server.listen(3000, () => {
  console.log("Server running on port 3000");
})).catch(err => console.log(err))