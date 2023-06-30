import axios from "axios";

export const addNewPerson = (data) => {
    const token = localStorage.getItem("token")

    try {
        return axios.post(`http://localhost:5000/persons`, data,{
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
        return axios.get(`http://localhost:5000/persons${url}`,{
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
        return axios.put(`http://localhost:5000/persons/${id}`, data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}