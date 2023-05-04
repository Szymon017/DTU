import axios from "axios";

export const addNewPerson = (data) => {
    try {
        return axios.post(`http://localhost:5000/persons`,data)
    } catch (error) {
        return error.message
    }
}

export const getAllPersons = () => {
    try {
        return axios.get(`http://localhost:5000/persons`)
    } catch (error) {
        return error.message
    }
}