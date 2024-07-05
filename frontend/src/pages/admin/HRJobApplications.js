import React, { useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getHRJobApplications } from '../../redux/actions/jobAction';

const HRJobApplications = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.signIn);
    const { jobs, loading, error } = useSelector(state => state.hrJobApplications);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            dispatch(getHRJobApplications(userInfo.id));
        }
    }, [dispatch, userInfo]);

    const columns = [
        { field: '_id', headerName: 'Job ID', width: 200 },
        { field: 'title', headerName: 'Job Name', width: 200 },
        {
            field: 'applicants',
            headerName: 'Applicants',
            width: 800,
            renderCell: (params) => (
                params.row.applicants.length > 0 ? (
                    <Box sx={{ padding: 2 }}>
                        {params.row.applicants.map(applicant => (
                            <Box key={applicant._id} sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                    Name: {applicant.firstName} {applicant.lastName}
                                </Typography>
                                <Typography variant="body2">
                                    Email: {applicant.email}
                                </Typography>
                                <Typography variant="body2">
                                    Contact: {applicant.contactNumber}
                                </Typography>
                                <Typography variant="body2">
                                    Gender: {applicant.gender}
                                </Typography>
                                <Typography variant="body2">
                                    Skills: {applicant.skills.join(', ')}
                                </Typography>
                                {applicant.jobsHistory && applicant.jobsHistory.length > 0 && (
                                    <Typography variant="body2" color="textSecondary">
                                        Job History:
                                        {applicant.jobsHistory.map(history => (
                                            <Box key={history._id} sx={{ ml: 2 }}>
                                                <Typography variant="body2">
                                                    {history.title} - {history.applicationStatus}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="textSecondary">No applicants yet</Typography>
                )
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                HR Job Applications
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            ) : (
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={jobs}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowHeight={() => 'auto'}
                            sx={{
                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) => theme.palette.secondary.main,
                                },
                                '& .MuiDataGrid-cell': {
                                    alignItems: 'flex-start',
                                    padding: '10px',
                                },
                                '& .MuiDataGrid-renderingZone': {
                                    maxHeight: 'none !important',
                                },
                                '& .MuiDataGrid-row': {
                                    maxHeight: 'none !important',
                                    height: 'auto',
                                },
                            }}
                        />
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default HRJobApplications;
