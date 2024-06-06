// src/redux/reducers/similarityReducer.js

import { CALCULATE_SIMILARITY_REQUEST, CALCULATE_SIMILARITY_SUCCESS, CALCULATE_SIMILARITY_FAIL } from '../constants/jobconstant';

const initialState = {
    loading: false,
    similarityScore: null,
    error: null,
};

export const similarityReducer = (state = initialState, action) => {
    switch (action.type) {
        case CALCULATE_SIMILARITY_REQUEST:
            return { ...state, loading: true };
        case CALCULATE_SIMILARITY_SUCCESS:
            return { ...state, loading: false, similarityScore: action.payload };
        case CALCULATE_SIMILARITY_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
