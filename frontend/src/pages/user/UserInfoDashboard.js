import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserInfoDashboard = () => {
    const { user, loading } = useSelector(state => state.userProfile);
    const { palette } = useTheme();
    const navigate = useNavigate();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Typography variant="h6" color="error">
                    User information not available. Please try logging in again.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
            <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                        Personal Info
                    </Typography>
                    <hr style={{ marginBottom: "30px" }} />
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        First name: {user.firstName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        Last name: {user.lastName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        E-mail: {user.email}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        Gender: {user.gender || 'N/A'}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        Contact Number: {user.contactNumber || 'N/A'}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                        Skills: {user.skills.join(', ')}
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                        Status: {user.role === 0 ? "Regular user" : user.role === 1 ? "Admin" : "HR"}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/user/edit')}>
                        Edit Information
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserInfoDashboard;
