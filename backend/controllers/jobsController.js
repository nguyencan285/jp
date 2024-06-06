const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel')
const natural = require('natural');
const mongoose = require('mongoose');


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

const calculateSimilarityScore = (userSkills, jobSkillsMap) => {
    let score = 0;
    let totalWeight = 0;

    // Convert the Map to an object
    const jobSkills = Object.fromEntries(jobSkillsMap.entries());

    // Calculate total weight of job skills
    for (const skill in jobSkills) {
        totalWeight += jobSkills[skill];
    }

    // Calculate score based on user skills matching job skills
    userSkills.forEach(skill => {
        if (jobSkills[skill]) {
            score += jobSkills[skill];
        }
    });

    // Normalize score based on total weight
    if (totalWeight > 0) {
        score = score / totalWeight;
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

