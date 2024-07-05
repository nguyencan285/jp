import { Card, CardContent, Stack, Typography, Alert } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import Navbar from '../component/Navbar';
import { jobLoadSingleAction, applyForJobAction } from '../redux/actions/jobAction';
import Button from '@mui/material/Button';
import { calculateSimilarityAction } from '../redux/actions/similarityActions';
import { useTheme } from '@emotion/react';

const SingleJob = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob);
    const { similarityScore, loading: similarityLoading, error: similarityError } = useSelector(state => state.similarityScore);
    const { userInfo } = useSelector(state => state.signIn);
    const { id } = useParams();

    const [showScore, setShowScore] = useState(false);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [dispatch, id]);

    const handleApply = () => {
        const userId = userInfo && userInfo.id;
        if (userId && id) {
            
            dispatch(applyForJobAction(userId, id));
            setApplied(true);
        } else {
            console.error("User ID or Job ID is missing.");
        }
    };

    const fetchSimilarityScore = () => {
        const userId = userInfo && userInfo.id;
        if (userId && singleJob && singleJob._id) {
            dispatch(calculateSimilarityAction(userId, singleJob._id));
            setShowScore(true);
        } else {
            console.error("User ID or Job ID is missing.");
        }
    };

    const getSimilarityMessage = (score) => {
        if (score >= 60 && score <= 80) {
            return "You meet most of the requirements for this job. You should consider applying!";
        } else if (score > 80 && score <= 100) {
            return "You're a strong match for this job. The recruiter is looking for you!";
        }
        return "You need to improve your skills to adapt to this job.";
    };

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
                                    <Card sx={{ bgcolor: palette.primary.white }}>
                                        <CardContent>
                                            <Typography variant="h5" component="h3">
                                                {singleJob && singleJob.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: ${singleJob && singleJob.salary}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Availability</Box>: {singleJob && singleJob.available ? 'Available' : 'Not Available'}
                                            </Typography>
                                            {singleJob && singleJob.skills && (
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Skills Required</Box>: {Object.keys(singleJob.skills).join(', ')}
                                                </Typography>
                                            )}
                                            <Typography variant="body2" sx={{ pt: 2 }}>
                                                {singleJob && singleJob.description}
                                            </Typography>
                                            {showScore && similarityLoading && <LoadingBox />}
                                            {showScore && similarityError && (
                                                <Typography variant="body2" color="error">
                                                    {similarityError}
                                                </Typography>
                                            )}
                                            {showScore && similarityScore !== undefined && (
                                                <Alert
                                                    severity={similarityScore > 80 ? "success" : "info"}
                                                    sx={{ mt: 2 }}
                                                >
                                                    {getSimilarityMessage(similarityScore)}
                                                </Alert>
                                            )}
                                        </CardContent>
                                    </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button
                                        onClick={handleApply}
                                        sx={{ fontSize: "13px", mb: 2 }}
                                        variant='contained'
                                        disabled={applied}
                                    >
                                        {applied ? 'Applied' : 'Apply for this Job'}
                                    </Button>
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
