import axios from 'axios';
import jwt_decode from "jwt-decode";

export const login = async (officer) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.post('http://localhost:5000/officers/login', officer,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return err
    }
}

export const getCurrentOfficer = () => {
  
    if (localStorage.getItem("token")) {
        const decoded = jwt_decode(localStorage.getItem("token"));
        if (decoded.id) {
            return decoded.id
        } else {
            return null;
        }
    }
}

export const getAllOfficers = async(filters) => {
    const token = localStorage.getItem("token")

    let url = "?"
    if(filters){
        if(filters.firstName){
            url += `firstName=${filters.firstName}&`
        }
        if(filters.lastName){
            url += `lastName=${filters.lastName}&`
        }
    }
    try {
        return await axios.get(`http://localhost:5000/officers/all${url}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        return err
    }
}

export const addNewOfficer = async(data) => {
    const token = localStorage.getItem("token")

    console.log("DATA", data);
    try {
        return await axios.post('http://localhost:5000/officers',data,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error
    }
}

export const deleteOfficer = async(id) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`http://localhost:5000/officers/${id}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return error
    }
}

export const authOfficer = async(token) => {
    const token2 = token
    try{
        return await axios.get(`http://localhost:5000/officers/authenticate`,{
            headers: {
                authorization: `Bearer ${token2}`
            }
        })
    }catch(error){
        return error
    }


}