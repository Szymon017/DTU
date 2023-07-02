import axios from "axios";

export const addNewPerson = (data) => {
    const token = localStorage.getItem("token")

    try {
        return axios.post(`https://dtu-sa.onrender.com/persons`, data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}

export const getAllPersons = (data) => {
    const token = localStorage.getItem("token")

    let url="?";
    if(data){
        if(data.id){
            url+=`id=${data.id}&`
        }
    }
    try {
        return axios.get(`https://dtu-sa.onrender.com/persons${url}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}

export const updatePerson = (id, data) => {
    const token = localStorage.getItem("token")

    try {
        return axios.put(`https://dtu-sa.onrender.com/persons/${id}`, data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}