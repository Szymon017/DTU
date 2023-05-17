import axios from "axios"

export const getAllCrimeOrgs = async () => {
    try {
        return await axios.get(`http://localhost:5000/crime`)
    } catch (error) {
        return error.message
    }
}

export const addNewCrimeOrg = async (data) => {
    try {
        return await axios.post(`http://localhost:5000/crime`, data)
    } catch (error) {
        return error.message
    }
}

export const updateCrimeOrg = async (id, data) => {
    try {
        return await axios.put(`http://localhost:5000/crime/${id}`, data)
    } catch (error) {
        return error.message
    }
}

export const archiveOrg = async(data) => {
    try {
        return await axios.put(`http://localhost:5000/crime/${data._id}`,data.archived)
    } catch (error) {
        return error.message
    }
}
