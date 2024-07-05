import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";

import ChartComponent from '../../component/ChartComponent';


const AdminDashboard = () => {
    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    Welcome to Admin Dashboard !
                </Typography>
                

            </Box>
        </>
    )
}

export default AdminDashboard