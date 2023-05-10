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