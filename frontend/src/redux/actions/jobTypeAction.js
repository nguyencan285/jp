import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_SUCCESS,
    DELETE_JOB_TYPE_REQUEST,
    DELETE_JOB_TYPE_SUCCESS,
    DELETE_JOB_TYPE_FAIL,
    EDIT_JOB_TYPE_REQUEST,
    EDIT_JOB_TYPE_SUCCESS,
    EDIT_JOB_TYPE_FAIL,
} from '../constants/jobTypeConstant';


// Delete Job Type
export const deleteJobTypeAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_JOB_TYPE_REQUEST });
        await axios.delete(`/api/type/delete/${id}`);
        dispatch({ type: DELETE_JOB_TYPE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_JOB_TYPE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Edit Job Type
export const editJobTypeAction = (id, jobTypeData) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_JOB_TYPE_REQUEST });
        const { data } = await axios.put(`/api/type/update/${id}`, jobTypeData);
        dispatch({ type: EDIT_JOB_TYPE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_JOB_TYPE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// load jobs type
export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/jobs');
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}