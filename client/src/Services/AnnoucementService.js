import axios from "axios";

export const getAllAnnoucements = async() => {
    const token = localStorage.getItem("token")

    try {
        return await axios.get('http://localhost:5000/annoucements',{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        return error.message;
    }
}

export const addNewAnnoucement = async(data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.post(`http://localhost:5000/annoucements`,data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        return error.message;       
    }
}

export const deleteAnAnnoucement = async(id) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`http://localhost:5000/annoucements/${id}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        return error.message;
    }
}

export const updateAnnoucement = async(data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.put(`http://localhost:5000/annoucements/${data._id}`,data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}