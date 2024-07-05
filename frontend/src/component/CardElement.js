import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CardElement = ({ jobTitle, description, category, location, id }) => {
    const { palette } = useTheme();
    
    return (
        <Card sx={{ 
            minWidth: 275, 
            mb: 3, 
            mt: 3, 
            bgcolor: palette.background.paper,
            boxShadow: 3,
            '&:hover': {
                boxShadow: 6,
            },
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ color: palette.text.secondary, mr: 1, fontSize: 18 }} />
                    <Typography sx={{ fontSize: 14, color: palette.text.secondary }} gutterBottom>
                        {location}
                    </Typography>
                </Box>
                
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                    {jobTitle}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CategoryIcon sx={{ color: palette.text.secondary, mr: 1, fontSize: 18 }} />
                    <Chip label={category} size="small" color="secondary" />
                </Box>
                
                <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                    {description.split(" ").slice(0, 20).join(" ") + "..."}
                </Typography>
            </CardContent>
            
            <CardActions>
                <Button 
                    component={Link} 
                    to={`/job/${id}`}
                    variant="contained" 
                    size="small" 
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: palette.primary.dark,
                        }
                    }}
                >
                    More Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardElement; 