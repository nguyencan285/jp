// src/redux/reducers/similarityReducer.js
import {
    SIMILARITY_REQUEST,
    SIMILARITY_SUCCESS,
    SIMILARITY_FAIL
} from '../constants/similarityConstants';

export const similarityReducer = (state = { similarityScore: null }, action) => {
    switch (action.type) {
        case SIMILARITY_REQUEST:
            return { loading: true, similarityScore: null };
        case SIMILARITY_SUCCESS:
            return { loading: false, similarityScore: action.payload };
        case SIMILARITY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
