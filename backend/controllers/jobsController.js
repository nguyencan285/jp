const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel')

const mongoose = require('mongoose');

const natural = require('natural');
const { TfIdf } = natural;

//create job
exports.createJob = async (req, res, next) => {
    try {
        const { title, description, salary, location, jobType, skills } = req.body;
        const userId = req.user.id;

        const job = await Job.create({
            title,
            description,
            salary,
            location,
            jobType,
            user: userId,
            skills
        });

        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(new ErrorResponse('Error creating job', 500));
        console.log(error)
    }
};


//single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}
// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        await job.remove();

        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


//update job by id.
exports.showJobs = async (req, res, next) => {
    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // filter jobs by category ids
    let categ = [];
    if (req.query.cat) {
        categ = req.query.cat.split(',').map(id => mongoose.Types.ObjectId(id));
    } else {
        const jobTypes = await JobType.find({}, { _id: 1 });
        categ = jobTypes.map(type => type._id);
    }

    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword, jobType: { $in: categ }, location: locationFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: { $in: categ }, location: locationFilter })
            .sort({ createdAt: -1 })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
}
/*
const calculateSimilarityScore = (userSkills, jobSkillsMap) => {
    let score = 0;
    let totalWeight = 0;

    // Convert the Map to an object
    const jobSkills = Object.fromEntries(jobSkillsMap.entries());

    // Calculate total weight of job skills
    for (const skill in jobSkills) {
        totalWeight += jobSkills[skill]; // This maybe always 1 
    }

    // Calculate score based on user skills matching job skills
    userSkills.forEach(skill => {
        if (jobSkills[skill]) {
            score += jobSkills[skill];
        }
    });

    // Normalize score based on total weight 
    if (totalWeight > 0) {
        score = score / totalWeight*100;
    }

    return score;
};


exports.calculateJobSimilarity = async (req, res, next) => {
    try {
        const { userId, jobId } = req.params;

        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) {
            return next(new ErrorResponse('User or Job not found', 404));
        }

        if (!user.skills || !job.skills) {
            return next(new ErrorResponse('User skills or Job skills are not defined', 400));
        }

        // Convert job skills Map to object
        const jobSkillsObject = Object.fromEntries(job.skills.entries());

        // Log the skills for debugging
        console.log("User Skills: ", user.skills);
        console.log("Job Skills: ", jobSkillsObject);

        const similarityScore = calculateSimilarityScore(user.skills, new Map(Object.entries(jobSkillsObject)));
 console.log(similarityScore)
        res.status(200).json({
            success: true,
            similarityScore: similarityScore || 0
        });
    } catch (error) {
        next(new ErrorResponse('Error calculating similarity score', 500));
    }
};
*/
const calculateSimilarityScore = (userSkills, jobSkillsMap) => {
    let matchedSkillsWeight = 0;
    const totalJobSkillsWeight = 1;
    
    // Convert the Map to an object for easier manipulation
    const jobSkills = Object.fromEntries(jobSkillsMap.entries());
    
    // Convert all keys in jobSkills to lowercase
    const lowercaseJobSkills = Object.fromEntries(
        Object.entries(jobSkills).map(([key, value]) => [key.toLowerCase(), value])
    );
    
    // Calculate the matched skills weight
    userSkills.forEach(userSkill => {
        const lowercaseUserSkill = userSkill.toLowerCase();
        if (lowercaseJobSkills.hasOwnProperty(lowercaseUserSkill)) {
            matchedSkillsWeight += lowercaseJobSkills[lowercaseUserSkill];
        }
    });
    
    // Calculate the score
    const score = (matchedSkillsWeight / totalJobSkillsWeight) * 100;
    
    return Math.min(100, Math.max(0, score));
};
exports.calculateJobSimilarity = async (req, res, next) => {
    try {
        const { userId, jobId } = req.params;

        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) {
            return next(new ErrorResponse('User or Job not found', 404));
        }

        if (!user.skills || !job.skills) {
            return next(new ErrorResponse('User skills or Job skills are not defined', 400));
        }

        // Convert job skills Map to object
        const jobSkillsObject = Object.fromEntries(job.skills.entries());

        // Log the skills for debugging
        console.log("User Skills: ", user.skills);
        console.log("Job Skills: ", jobSkillsObject);

        const similarityScore = calculateSimilarityScore(user.skills, new Map(Object.entries(jobSkillsObject)));
        console.log("Similarity Score: ", similarityScore);

        res.status(200).json({
            success: true,
            similarityScore: similarityScore
        });
    } catch (error) {
        next(new ErrorResponse('Error calculating similarity score', 500));
    }
};
// Get jobs created by HR
exports.getHRJobs = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming the HR user ID is obtained from the authenticated request

        const jobs = await Job.find({ user: userId })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName lastName');

        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        next(new ErrorResponse('Error fetching HR jobs', 500));
    }
};

exports.applyForJob = async (req, res, next) => {
    try {
        const { userId, jobId } = req.params;
        console.log(`Received request to apply for job: userId=${userId}, jobId=${jobId}`);

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User details:', user);

        const job = await Job.findById(jobId);
        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ message: 'Job not found' });
        }
        console.log('Job details:', job);

        if (job.applicants.includes(user._id)) {
            console.log('User has already applied for this job');
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        job.applicants.push(user._id);
        await job.save();

        const jobHistory = {
            title: job.title,
            description: job.description,
            salary: job.salary,
            location: job.location,
            user: user._id,
            job: job._id
        };
        user.jobsHistory.push(jobHistory);
        await user.save();

        console.log('Application submitted successfully');
        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.log('Error applying for job:', error);
        res.status(500).json({ message: 'Error applying for job', error: error.message });
    }
};
  

exports.getHRJobApplications = async (req, res, next) => {
    try {
        const { hrId } = req.params;

        const jobs = await Job.find({ user: hrId }).populate({
            path: 'applicants',
            select: 'firstName lastName email skills contactNumber gender'
        });

        if (!jobs) {
            return res.status(404).json({ message: 'No jobs found for this HR user' });
        }

        res.status(200).json({ jobs });
    } catch (error) {
        console.log('Error fetching HR job applications:', error);
        res.status(500).json({ message: 'Error fetching HR job applications', error: error.message });
    }
};