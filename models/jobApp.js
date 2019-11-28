const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const { Schema } = require("mongoose")

var JobApp = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    roleTitle: {
        type: String,
        required: true,
    },
    contractType: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    applyUrl: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    applied: {
        type: Date
    },
    interview1: {
        type: Date
    },
    interview2: {
        type: Date
    },
    status: {
        type: String,
        enum: ["wishlist", "applied", "interview", "offer", "rejected"]
    },
}, {
    timestamps: true
});





module.exports = mongoose.model("JobApp", JobApp)