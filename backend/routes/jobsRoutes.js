const express = require('express');
const router = express.Router();
const { createJob, singleJob, deleteJob,updateJob, showJobs,calculateJobSimilarity } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//jobs routes

// /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);
// /api/jobs/delete/:jobId
router.delete('/job/delete/:jobId', isAuthenticated,isAdmin,deleteJob);

router.get('/calculate-similarity/:userId/:jobId', calculateJobSimilarity);

module.exports = router;