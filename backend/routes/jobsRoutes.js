const express = require('express');
const router = express.Router();
const { getHRJobApplications,applyForJob,getHRJobs,createJob, singleJob, deleteJob,updateJob, showJobs,calculateJobSimilarity } = require('../controllers/jobsController');
const { isAuthenticated,isAdmin } = require('../middleware/auth');



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
// /api//calculate-similarity/:userId/:jobId
router.get('/calculate-similarity/:userId/:jobId', calculateJobSimilarity);

router.get('/hr/jobs' ,isAuthenticated,isAdmin,getHRJobs);
router.post('/users/:userId/jobs/:jobId/apply' ,isAuthenticated,applyForJob);

router.get('/hr/all' ,isAuthenticated,isAdmin,getHRJobApplications);

router.get('/hr/:hrId/applications', isAuthenticated,isAdmin,getHRJobApplications);
module.exports = router;