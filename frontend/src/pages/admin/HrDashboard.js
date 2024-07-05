import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getHRJobsAction, deleteSingleJobAction } from '../../redux/actions/jobAction';

const HrDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHRJobsAction());
    }, [dispatch]);

    const { jobs, loading } = useSelector(state => state.hrJobs);
    const { success: deleteSuccess } = useSelector(state => state.deleteJob);

    let data = jobs || [];

    useEffect(() => {
        if (deleteSuccess) {
            dispatch(getHRJobsAction());
        }
    }, [deleteSuccess, dispatch]);

    const deleteJobById = (e, id) => {
        if (window.confirm(`Are you sure you want to delete job ID: "${id}"?`)) {
            dispatch(deleteSingleJobAction(id));
        }
    };

    const columns = [
        { field: '_id', headerName: 'Job ID', width: 150 },
        { field: 'title', headerName: 'Job Name', width: 150 },
        { field: 'jobType', headerName: 'Category', width: 150, valueGetter: (params) => params.row?.jobType?.jobTypeName },
        { field: 'user', headerName: 'User', width: 150, valueGetter: (params) => params.row?.user?.firstName },
        { field: 'available', headerName: 'Available', width: 150, renderCell: (params) => (params.row.available ? "Yes" : "No") },
        { field: 'salary', headerName: 'Salary', width: 150, renderCell: (params) => `$${params.row.salary}` },
        {
            field: "Actions",
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/hr/edit/job/${params.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={(e) => deleteJobById(e, params.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Recruiter Dashboard
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "white", textDecoration: "none" }} to="/hr/job/create">
                        Create Job
                    </Link>
                </Button>
            </Box>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            sx={{
                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) => theme.palette.secondary.main,
                                },
                                button: {
                                    color: '#ffffff',
                                },
                            }}
                        />
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default HrDashboard;