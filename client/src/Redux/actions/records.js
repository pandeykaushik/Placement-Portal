import { RECORDS_ERROR, GET_RECORDS, ADD_RECORD, ADD_RECORD_ERROR, GET_RECORD, RECORD_ERROR } from './types'
import axios from 'axios'
import { setAlert } from './alerts'
export const getRecords = (filterData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = filterData;
        const res = await axios.post('/api/page', body, config)
        dispatch({
            type: GET_RECORDS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: RECORDS_ERROR,
            payload: error.message
        })
    }
}
export const addRecord = (formData) => async dispatch => {
    const body = formData;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/student/add-new', body, config)
        dispatch({
            type: ADD_RECORD,
            payload: res.data
        })
        dispatch(setAlert("Record added successfully", "success"))
    } catch (error) {
        dispatch(setAlert("Oops something went wrong!!", "danger"))
        dispatch({
            type: ADD_RECORD_ERROR,
            payload: error.response.data
        })
    }
}
export const getRecord = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/student/${id}`)
        dispatch({
            type: GET_RECORD,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: RECORD_ERROR
        })
        dispatch(setAlert("Record Not Found!! Try again.", "danger"))
    }
}