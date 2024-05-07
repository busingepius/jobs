const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide the company name"],
        maxlength: [50, "Name must be longer than 3 characters"],
        minLength: [4, "Name must be longer than 3 characters"],
    },
    position:{
        type:String,
        required: [true, "Please provide the position"],
        maxlength:50,
    },
    status:{
        type: String,
        enum: {values: ["pending","declined","interview"]},
        default: "pending",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Job", JobSchema);