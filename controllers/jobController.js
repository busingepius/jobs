const Job = require("../models/Job");
const {BadRequestError} = require("../errors");

async function getJobs(req, res, next) {
    const jobs = await Job.find();
    res.status(200).json({data: jobs});
}

async function getSingleJob(req, res, next) {
    const {
        user: {userID},
        params: {id}
    } = req;

    console.log(userID);

    const job = await Job.findById({_id: id,createdBy: userID});
    if (!job) {
        throw new BadRequestError(`no job with id: ${id}`);
    }
    res.status(200).json({data: job});
}

async function createJob(req, res, next) {
    const {user, body} = req;
    body.createdBy = user.userID;
    const job = await Job.create(body);
    res.status(201).json({data: job});
}

async function updateJob(req, res, next) {
    const {user: {userID}, params: {id}, body} = req;
    const job = await Job.findOneAndUpdate({createdBy: userID, _id: id}, body, {runValidators: true, new: true});
    if(!job){
        throw new BadRequestError(`no job with id: ${id}`);
    }
    res.status(200).json({data: job});
}

async function deleteJob(req, res, next) {
    const {user: {userID}, params: {id}} = req;
    const job = await Job.findOneAndDelete({createdBy: userID, _id: id});
    if (!job) {
        throw new BadRequestError(`No job with such id: ${id}`);
    }
    res.status(200).json({data: job});
}

module.exports = {getJobs, getSingleJob, createJob, updateJob, deleteJob};