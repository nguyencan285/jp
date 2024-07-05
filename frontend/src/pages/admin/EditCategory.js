// pages/admin/EditCategory.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editJobTypeAction, jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { Box, Button, TextField, Typography } from '@mui/material';

const EditCategory = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { jobType } = useSelector((state) => state.jobTypeAll);
    const category = jobType.find((type) => type._id === id);
    const [jobTypeName, setJobTypeName] = useState('');

    useEffect(() => {
        if (category) {
            setJobTypeName(category.jobTypeName);
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editJobTypeAction(id, { jobTypeName }));
        navigate('/admin/category');
    };

    return (
        <Box>
            <Typography variant="h4">Edit Category</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    value={jobTypeName}
                    onChange={(e) => setJobTypeName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </form>
        </Box>
    );
};

export default EditCategory;
