import axios from 'axios';

export const addNewCase = async (caseData) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.post('http://localhost:5000/cases', caseData,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return err
    }
}

export const getAllCases = async (data) => {
    const token = localStorage.getItem("token")

    let url = "?";
    if(data){
        if(data.archived===true){
            url += `archived=${data.archived}&`
        }
        if(data.archived===false){
            url += `archived=false&`
        }
        if(data.persons){
            url += `persons=${data.persons}&`
        }
        if(data.orgs){
            url += `orgs=${data.orgs}&`
        }
    }
    try {
        return await axios.get(`http://localhost:5000/cases${url}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) { 
        return err
    }
}

export const deleteCase = async (id) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`http://localhost:5000/cases/${id}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return err.message
    }
}

export const editCase = async (id, data) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.put(`http://localhost:5000/cases/${id}`,data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return err.message
    }
}