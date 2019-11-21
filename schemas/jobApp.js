const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const { Schema} = require("mongoose")

var JobApp = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
    },
    roleTitle: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobOffer: [{
        _id: { type: Schema.Types.ObjectId, auto: true },
        salary: String,
        contractTerms: String,
    }],
    status: {
        type: String,
        enum: ["applied", "pending", "rejected"]
    },

    
    })



module.exports = mongoose.model("JobApp", JobApp)