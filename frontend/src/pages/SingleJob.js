import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import Navbar from '../component/Navbar';
import { jobLoadSingleAction } from '../redux/actions/jobAction';
import Button from '@mui/material/Button';
import { userApplyJobAction } from '../redux/actions/userAction';
import { calculateSimilarityAction } from '../redux/actions/similarityActions'; // Import similarity action
import { useTheme } from '@emotion/react';

const SingleJob = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob);
    const { similarityScore, loading: similarityLoading, error: similarityError } = useSelector(state => state.similarityScore);
    const { userInfo } = useSelector(state => state.signIn); // Access the userLogin state to get userInfo
    const { id } = useParams();

    const [showScore, setShowScore] = useState(false);
    const [buttonText, setButtonText] = useState('Show Similarity Score');

    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [dispatch, id]);

    const applyForAJob = () => {
        dispatch(userApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location
        }));
    };

    const fetchSimilarityScore = () => {
        // Make sure to replace 'userInfo.id' with the actual path to user ID in userInfo object
        const userId = userInfo && userInfo.id; // Adjust this if necessary
        if (userId && singleJob && singleJob._id) {
            dispatch(calculateSimilarityAction(userId, singleJob._id));
            setShowScore(true);
        } else {
            console.error("User ID or Job ID is missing.");
        }
    };

    useEffect(() => {
        if (showScore && similarityScore !== undefined) {
            setButtonText(`Similarity Score: ${Number(similarityScore).toFixed(2)}`);
        }
    }, [similarityScore, showScore]);

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa" }}>
                <Navbar />
                <Box sx={{ height: 'calc(100vh - 140px)' }}>
                    <Container sx={{ pt: '30px' }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>
                                {loading ? <LoadingBox /> :
                                    <Card sx={{ bgcolor: palette.primary.white }} >
                                        <CardContent>
                                            <Typography variant="h5" component="h3">
                                                {singleJob && singleJob.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: ${singleJob && singleJob.salary}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                            </Typography>
                                            <Typography variant="body2" sx={{ pt: 2 }}>
                                                {singleJob && singleJob.description}
                                            </Typography>
                                            {showScore && similarityLoading && <LoadingBox />}
                                            {showScore && similarityError && (
                                                <Typography variant="body2" color="error">
                                                    {similarityError}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button onClick={applyForAJob} sx={{ fontSize: "13px", mb: 2 }} variant='contained'>Apply for this Job</Button>
                                    <Button 
                                        onClick={fetchSimilarityScore} 
                                        sx={{ fontSize: "13px" }} 
                                        variant='contained' 
                                        disabled={showScore && similarityScore !== undefined}
                                    >
                                        {showScore && similarityScore !== undefined ? (
                                            <Typography variant="h6" component="span" sx={{ fontSize: "1.5em" }}>
                                                Similarity Score: {Number(similarityScore).toFixed(2)}
                                            </Typography>
                                        ) : 'Show Similarity Score'}
                                    </Button>
                                </Card>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default SingleJob;
