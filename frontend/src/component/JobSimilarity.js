import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateSimilarityAction } from '../actions/jobActions';

const JobSimilarity = ({ userId, jobId }) => {
    const dispatch = useDispatch();
    
    const { similarityScore, loading, error } = useSelector(state => state.similarityScore);

    useEffect(() => {
        dispatch(calculateSimilarityAction(userId, jobId));
    }, [dispatch, userId, jobId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Similarity Score: {similarityScore}</p>
            )}
        </div>
    );
};

export default JobSimilarity;
