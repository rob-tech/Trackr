const express = require("express");
const jobApp = require("../models/jobApp")


// require('dotenv').config()

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await jobApp.find({}))
    console.log(res)
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