import axios from 'axios';
import { toast } from 'react-toastify'
import {
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_SUCCESS,

    CALCULATE_SIMILARITY_REQUEST,
    CALCULATE_SIMILARITY_SUCCESS,
    CALCULATE_SIMILARITY_FAIL,
    HR_JOBS_REQUEST,
    HR_JOBS_SUCCESS,
    HR_JOBS_FAIL,

   
         JOB_APPLY_REQUEST, 
         JOB_APPLY_SUCCESS, 
         JOB_APPLY_FAIL,
         HR_JOBS_LOAD_REQUEST, 
         HR_JOBS_LOAD_SUCCESS, 
         HR_JOBS_LOAD_FAIL
    
         ,
         HR_JOB_APPLICATIONS_REQUEST,
    HR_JOB_APPLICATIONS_SUCCESS,
    HR_JOB_APPLICATIONS_FAIL
} from "../constants/jobconstant"


export const getHRJobApplications = (hrId) => async (dispatch) => {
    dispatch({ type: HR_JOB_APPLICATIONS_REQUEST });
    try {
        const { data } = await axios.get(`/api/hr/${hrId}/applications`);
        dispatch({
            type: HR_JOB_APPLICATIONS_SUCCESS,
            payload: data.jobs,
        });
    } catch (error) {
        dispatch({
            type: HR_JOB_APPLICATIONS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        toast.error(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
};
export const applyForJobAction = (userId, jobId) => async (dispatch) => {
    dispatch({ type: JOB_APPLY_REQUEST });
    try {
        console.log('Applying for job:', { userId, jobId });
        const { data } = await axios.post(`/api/users/${userId}/jobs/${jobId}/apply`);
        dispatch({
            type: JOB_APPLY_SUCCESS,
            payload: data,
        });
        toast.success('Application submitted successfully');
    } catch (error) {
        dispatch({
            type: JOB_APPLY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        toast.error(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
};


export const getHRHistory = () => async (dispatch) => {
    dispatch({ type: HR_JOBS_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/hr/all');
        dispatch({
            type: HR_JOBS_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: HR_JOBS_LOAD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};



export const getHRJobsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: HR_JOBS_REQUEST });

        const { signIn: { userInfo } } = getState(); // Make sure this is correct
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/hr/jobs', config);

        if (!data || !data.jobs) {
            throw new Error('Invalid data format');
        }

        dispatch({
            type: HR_JOBS_SUCCESS,
            payload: data.jobs,
        });
    } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type: HR_JOBS_FAIL,
            payload: errorMessage,
        });
        toast.error(errorMessage);
    }
};
export const calculateSimilarityAction = (userId, jobId) => async (dispatch) => {
    try {
        dispatch({ type: CALCULATE_SIMILARITY_REQUEST });
        const { data } = await axios.get(`/api/calculate-similarity/${userId}/${jobId}`);
        dispatch({
            type: CALCULATE_SIMILARITY_SUCCESS,
            payload: data.similarityScore
        });
    } catch (error) {
        dispatch({
            type: CALCULATE_SIMILARITY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}


//delete single job action
export const deleteSingleJobAction = (job_id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_REQUEST });
    try {
        const { data } = await axios.delete(`/api/job/delete/${job_id}`);
        dispatch({
            type: DELETE_JOB_SUCCESS,
            payload: data
        });
        toast.success("Job deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//edit single job action
export const editSingleJobAction = (job) => async (dispatch) => {
    dispatch({ type: EDIT_JOB_REQUEST });
    try {
        const { data } = await axios.put(`/api/job/update/${job._id}`, job);
        dispatch({
            type: EDIT_JOB_SUCCESS,
            payload: data
        });
        toast.success("Job updated successfully");
    } catch (error) {
        dispatch({
            type: EDIT_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// register job action
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        const { data } = await axios.post("/api/job/create", job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}