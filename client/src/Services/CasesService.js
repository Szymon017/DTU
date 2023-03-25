import axios from 'axios';

export const addNewCase = async (caseData) => {
    try {
        return await axios.post('http://localhost:5000/cases', caseData)
    } catch (err) {
        return err
    }
}

export const getAllCases = async () => {
    try {
        return await axios.get('http://localhost:5000/cases')
    } catch (err) { 
        return err
    }
}

export const deleteCase = async (id) => {
    try {
        return await axios.delete(`http://localhost:5000/cases/${id}`)
    } catch (err) {
        return err.message
    }
}

export const editCase = async (id, data) => {
    try {
        return await axios.put(`http://localhost:5000/cases/${id}`,data)
    } catch (err) {
        return err.message
    }
}