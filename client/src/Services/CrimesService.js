import axios from "axios"

export const getAllCrimeOrgs = async (data) => {
    let url="?";
    const token = localStorage.getItem("token")
    if(data){
        if(data.name){
            url+=`name=${data.name}&`
        }
        if(data.archived === false) {
            url+=`archived=${data.archived}`
        }
        if(data.archived === true){
            url+=`archived=${data.archived}`
        }
    }
    try {
        return await axios.get(`https://detective-task-unit-sa.onrender.com/crime${url}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}

export const addNewCrimeOrg = async (data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.post(`https://detective-task-unit-sa.onrender.com/crime`, data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}

export const updateCrimeOrg = async (id, data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.put(`https://detective-task-unit-sa.onrender.com/crime/${id}`, data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}

export const archiveOrg = async(data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.put(`https://detective-task-unit-sa.onrender.com/crime/${data._id}`,data.archived,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.message
    }
}
