import { Box, MenuItem, Typography, IconButton, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { registerAjobAction } from '../../redux/actions/jobAction';
import { Add, Remove } from '@mui/icons-material';

const validationSchema = yup.object({
    title: yup
        .string('Enter a job title')
        .required('Title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    salary: yup
        .number('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    jobType: yup
        .string('Select a category')
        .required('Category is required')
});

const DashCreateJob = () => {
    const dispatch = useDispatch();

    // Load job types on component mount
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { jobType } = useSelector(state => state.jobTypeAll);

    const [skills, setSkills] = useState([{ skill: '', score: '' }]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            salary: '',
            location: '',
            jobType: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            const skillsObject = skills.reduce((acc, curr) => {
                if (curr.skill && curr.score) {
                    acc[curr.skill] = parseFloat(curr.score);
                }
                return acc;
            }, {});
            const finalValues = { ...values, skills: skillsObject };
            dispatch(registerAjobAction(finalValues));
            actions.resetForm();
            setSkills([{ skill: '', score: '' }]);
        },
    });

    const handleAddSkill = () => {
        setSkills([...skills, { skill: '', score: '' }]);
    };

    const handleRemoveSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    const handleSkillChange = (index, event) => {
        const { name, value } = event.target;
        const newSkills = skills.map((skill, i) => (i === index ? { ...skill, [name]: value } : skill));
        setSkills(newSkills);
    };

    return (
        <>
            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' sx={{ width: '80%' }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Register a Job
                        </Typography>
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="salary"
                            name="salary"
                            label="Salary"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Salary"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        {skills.map((skill, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
                                <TextField
                                    sx={{ mr: 2, flexGrow: 1 }}
                                    name="skill"
                                    label="Skill"
                                    value={skill.skill}
                                    onChange={(event) => handleSkillChange(index, event)}
                                />
                                <TextField
                                    sx={{ mr: 2, width: '100px' }}
                                    name="score"
                                    label="Score"
                                    type="number"
                                    inputProps={{ min: 0, max: 1, step: 0.1 }}
                                    value={skill.score}
                                    onChange={(event) => handleSkillChange(index, event)}
                                />
                                <IconButton color="error" onClick={() => handleRemoveSkill(index)}>
                                    <Remove />
                                </IconButton>
                            </Box>
                        ))}
                        <Button variant="contained" color="primary" onClick={handleAddSkill} sx={{ mb: 3 }}>Add Skill</Button>
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            name="jobType"
                            id="jobType"
                            select
                            label="Category"
                            value={formik.values.jobType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                            helperText={formik.touched.jobType && formik.errors.jobType}
                        >
                            <MenuItem key={""} value={""}></MenuItem>
                            {jobType && jobType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.jobTypeName}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button fullWidth variant="contained" type='submit'>Create Job</Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default DashCreateJob;
