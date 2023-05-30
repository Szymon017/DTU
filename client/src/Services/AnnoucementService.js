import axios from "axios";

export const getAllAnnoucements = async() => {
    try {
        return await axios.get('http://localhost:5000/annoucements');
    } catch (error) {
        return error.message;
    }
}

export const addNewAnnoucement = async(data) => {
    try {
        return await axios.post(`http://localhost:5000/annoucements`,data);
    } catch (error) {
        return error.message;       
    }
}

export const deleteAnAnnoucement = async(id) => {
    try {
        return await axios.delete(`http://localhost:5000/annoucements/${id}`);
    } catch (error) {
        return error.message;
    }
}

export const updateAnnoucement = async(data) => {
    try {
        return await axios.put(`http://localhost:5000/annoucements/${data._id}`,data)
    } catch (error) {
        return error.message
    }
}