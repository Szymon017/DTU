import axios from "axios";

export const getAllAnnoucements = async() => {
    const token = localStorage.getItem("token")

    try {
        return await axios.get('https://dtu-sa.onrender.com:5000/annoucements',{
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
        return await axios.post(`https://detective-task-unit-sa.onrender.com:5000/annoucements`,data,{
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
        return await axios.delete(`https://detective-task-unit-sa.onrender.com:5000/annoucements/${id}`,{
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
        return await axios.put(`https://detective-task-unit-sa.onrender.com:5000/annoucements/${data._id}`,data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}