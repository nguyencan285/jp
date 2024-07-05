import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_RESET,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_RESET,
    JOB_TYPE_LOAD_SUCCESS,
    DELETE_JOB_TYPE_REQUEST,
    DELETE_JOB_TYPE_SUCCESS,
    DELETE_JOB_TYPE_FAIL,
    EDIT_JOB_TYPE_REQUEST,
    EDIT_JOB_TYPE_SUCCESS,
    EDIT_JOB_TYPE_FAIL
} from "../constants/jobTypeConstant"

export const jobTypeReducer = (state = { jobType: [] }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { loading: true, jobType: [] };
        case JOB_TYPE_LOAD_SUCCESS:
            return { loading: false, jobType: action.payload };
        case JOB_TYPE_LOAD_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_JOB_TYPE_REQUEST:
            return { ...state, loading: true };
        case DELETE_JOB_TYPE_SUCCESS:
            return { ...state, loading: false, jobType: state.jobType.filter((type) => type._id !== action.payload) };
        case DELETE_JOB_TYPE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case EDIT_JOB_TYPE_REQUEST:
            return { ...state, loading: true };
        case EDIT_JOB_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                jobType: state.jobType.map((type) => (type._id === action.payload._id ? action.payload : type)),
            };
        case EDIT_JOB_TYPE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
// load job type reducer
export const loadJobTypeReducer = (state = { jobType: [] }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { loading: true }
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT
            }
        case JOB_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// create job type reducer
export const createJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_JOB_TYPE_REQUEST:
            return { loading: true }
        case CREATE_JOB_TYPE_SUCCESS:
            return {
                loading: false,
                jobType: action.payload,
            }
        case CREATE_JOB_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_JOB_TYPE_RESET:
            return {}
        default:
            return state;
    }

}