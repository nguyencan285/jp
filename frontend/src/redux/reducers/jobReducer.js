import {
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_RESET,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_RESET,
    EDIT_JOB_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_RESET,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_RESET,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_RESET,
    REGISTER_JOB_SUCCESS,

    CALCULATE_SIMILARITY_REQUEST,
    CALCULATE_SIMILARITY_SUCCESS,
    CALCULATE_SIMILARITY_FAIL,
    HR_JOBS_REQUEST,
    HR_JOBS_SUCCESS,
    HR_JOBS_FAIL,
   
    JOB_APPLY_REQUEST, JOB_APPLY_SUCCESS, JOB_APPLY_FAIL,
         HR_JOBS_LOAD_REQUEST, HR_JOBS_LOAD_SUCCESS, HR_JOBS_LOAD_FAIL
        ,
        HR_JOB_APPLICATIONS_REQUEST,
    HR_JOB_APPLICATIONS_SUCCESS,
    HR_JOB_APPLICATIONS_FAIL,
} from "../constants/jobconstant"
export const hrJobApplicationsReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case HR_JOB_APPLICATIONS_REQUEST:
            return { loading: true, jobs: [] };
        case HR_JOB_APPLICATIONS_SUCCESS:
            return { loading: false, jobs: action.payload };
        case HR_JOB_APPLICATIONS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const jobApplyReducer = (state = {}, action) => {
    switch (action.type) {
        case JOB_APPLY_REQUEST:
            return { loading: true };
        case JOB_APPLY_SUCCESS:
            return { loading: false, success: true };
        case JOB_APPLY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const hrHistoryReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case HR_JOBS_LOAD_REQUEST:
            return { loading: true };
        case HR_JOBS_LOAD_SUCCESS:
            return { loading: false, jobs: action.payload };
        case HR_JOBS_LOAD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const calculateSimilarityReducer = (state = { similarityScore: null }, action) => {
    switch (action.type) {
        case CALCULATE_SIMILARITY_REQUEST:
            return { loading: true };
        case CALCULATE_SIMILARITY_SUCCESS:
            return { loading: false, similarityScore: action.payload.similarityScore };
        case CALCULATE_SIMILARITY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const loadJobReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case JOB_LOAD_REQUEST:
            return { loading: true }
        case JOB_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                jobs: action.payload.jobs
            }
        case JOB_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// single job reducer
export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case JOB_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case JOB_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleJob: action.payload.job,

            }
        case JOB_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case JOB_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}

//Registred job;
export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_JOB_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}
        default:
            return state;
    }
}

// delete job by id
//delete product by id
export const deleteJobReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_JOB_REQUEST:
            return { loading: true }
        case DELETE_JOB_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_JOB_RESET:
            return {}
        default:
            return state;
    }
}


export const updateJobReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_JOB_REQUEST:
            return { loading: true }
        case EDIT_JOB_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                job: action.payload.job
            }
        case EDIT_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_JOB_RESET:
            return {}
        default:
            return state;
    }
}
// HR Jobs Reducer
export const hrJobsReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case HR_JOBS_REQUEST:
            return { loading: true };
        case HR_JOBS_SUCCESS:
            return { loading: false, jobs: action.payload };
        case HR_JOBS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};