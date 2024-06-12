// src/redux/actions/similarityActions.js

import axios from 'axios';
import {
    SIMILARITY_REQUEST,
    SIMILARITY_SUCCESS,
    SIMILARITY_FAIL
} from '../constants/similarityConstants';

export const calculateSimilarityAction = (userId, jobId) => async (dispatch) => {
    try {
        dispatch({ type: SIMILARITY_REQUEST });

        const { data } = await axios.get(`/api/calculate-similarity/${userId}/${jobId}`);

        dispatch({
            type: SIMILARITY_SUCCESS,
            payload: data.similarityScore,
        });
    } catch (error) {
        dispatch({
            type: SIMILARITY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
