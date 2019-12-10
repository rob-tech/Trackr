const express = require("express");
const jobApp = require("../models/jobApp")
// const fs = require("fs")
const multer = require("multer")
const path = require("path");
const fs = require("fs-extra")
// require('dotenv').config()

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await jobApp.find({}))
    console.log(res)
})

router.get("/totApp", async (req, res) => {
    var totApp = (await jobApp.find({})).length
    res.send({ totApp: totApp})
})

router.get("/AppsWeek", async (req, res) => {
     var curr = new Date() 
    var week = []
      
      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
        
      }
      var finalArr=[]

      var newApplications = await jobApp.find({ status: { $in: 'applied'} })  
    //   console.log(newApplications)
      newApplications.forEach((e1)=>week.forEach((e2)=>{
    //  console.log(e1.createdAt)
        if(e1.createdAt.toISOString().slice(0, 10) == e2)
        {
            console.log(e2)
            console.log(e1.createdAt)
            finalArr.push(e1)
        }
      }))
      console.log(finalArr)
      var lastWeek = finalArr.length
      res.send({ lastWeek: lastWeek})


})

// router.get("/", async (req, res) => {
// 	const result = await jobApp.find({studentId:new mongoose.Types.ObjectId
// (req.query.studentId)})
//     res.send(result)
// })
var multerInstance = new multer({})

router.post("/:id/image", multerInstance.single("image"), async (req, res) => {
    console.log("hey")
    //1) save the picture
    var fullUrl = req.protocol + "://" + req.get("host") + "/img/"
    console.log("url" + fullUrl)
    var ext = path.extname(req.file.originalname)
    var productID = req.params.id
    var fileName = productID + ext;
    await fs.writeFile("./images/" + fileName, req.file.buffer)

    //2) update image link
    var products = await getProducts();
    var toUpdate = products.find(x => x.ID == req.params.id)
    toUpdate.Image = fullUrl + fileName
    await saveProducts(products)

    res.send(toUpdate)
}) 

router.post("/", async (req, res, next) => {
    // req.body.userId = req.user._id
    try {
        const newJobApp = { ...req.body }
        // newJobApp.userId = req.user._id
  
        await jobApp.create(newJobApp)
        res.send(newJobApp)
    }
    catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }

})

router.delete("/:appId", async (req, res, next) => {
    var application = await jobApp.findById(req.params.appId);
    // if (application.userId == req.user._id) {
      
        jobApp.findByIdAndRemove(
            req.params.appId
        )
            .then(
                app => {
                    res.send("Removed");
                },
                err => next(err)
            )
            .catch(err => next(err));
    // }
    // else {
        // res.status(401)
        // res.send("Unauthorized")
    // }

})


router.put("/:appId",
    (req, res, next) => {
        jobApp.findOneAndUpdate(
            { _id: req.params.appId },
            { $set: req.body },
            { new: true }
        )
            .then(
                app => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(app);
                },

                error => next(error),
            )
            .catch(error => next(error));
    }
)







module.exports = router;