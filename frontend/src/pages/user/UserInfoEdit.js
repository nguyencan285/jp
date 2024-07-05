import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../redux/actions/userAction';
import { USER_UPDATE_RESET } from '../../redux/constants/userConstant';

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required')
        .max(32, 'First name must be at most 32 characters'),
    lastName: yup
        .string('Enter your last name')
        .required('Last name is required')
        .max(32, 'Last name must be at most 32 characters'),
   
    skills: yup
        .array()
        .of(yup.string())
        .min(1, 'At least one skill is required')
        .required('Skills are required'),
    gender: yup
        .string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .nullable(),
    contactNumber: yup
        .string()
        .nullable(),
    jobsHistory: yup
        .array()
        .of(
            yup.object({
                // Add validation for jobsHistory fields if needed
            })
        )
});

const UserInfoEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector(state => state.userProfile);
    const userUpdateState = useSelector(state => state.userUpdate);
    const { success } = userUpdateState || {};

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            skills: user?.skills || [],
            gender: user?.gender || '',
            contactNumber: user?.contactNumber || '',
            jobsHistory: user?.jobsHistory || []
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            console.log('Form submitted with values:', values);
            dispatch(updateUserProfile(user._id, values));
            actions.resetForm();
        },
    });

    useEffect(() => {
        if (success) {
            console.log('Update success, redirecting...');
            setTimeout(() => {
                dispatch({ type: USER_UPDATE_RESET });
                navigate('/user/info');
            }, 800);
        }
    }, [success, dispatch, navigate]);

    const handleAddSkill = () => {
        formik.setFieldValue('skills', [...formik.values.skills, '']);
    };

    const handleRemoveSkill = (index) => {
        const newSkills = formik.values.skills.filter((_, i) => i !== index);
        formik.setFieldValue('skills', newSkills);
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...formik.values.skills];
        newSkills[index] = value;
        formik.setFieldValue('skills', newSkills);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
            <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                        Edit Personal Info
                    </Typography>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        InputLabelProps={{ shrink: true }}
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                   
                    <Box sx={{ mb: 3, width: '100%' }}>
                        <Typography variant="subtitle1">Skills</Typography>
                        {formik.values.skills.map((skill, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TextField
                                    fullWidth
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                    placeholder={`Skill ${index + 1}`}
                                />
                                <IconButton onClick={() => handleRemoveSkill(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button startIcon={<AddIcon />} onClick={handleAddSkill}>
                            Add Skill
                        </Button>
                    </Box>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={formik.values.gender}
                            label="Gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="contactNumber"
                        name="contactNumber"
                        label="Contact Number"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Contact Number"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                    />
                    <Button fullWidth variant="contained" type='submit'>Edit user</Button>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => navigate('/user/info')} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default UserInfoEdit;