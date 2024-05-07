const {getJobs, getSingleJob, createJob, updateJob, deleteJob} = require("../controllers/jobController");
const {authMiddleware} = require("../middleware");

const jobRoutes = require("express").Router();

jobRoutes.route("/").get(getJobs).post(authMiddleware,createJob);
jobRoutes.route("/:id").get(authMiddleware,getSingleJob).patch(authMiddleware,updateJob).delete(authMiddleware,deleteJob);

module.exports = {jobRoutes};