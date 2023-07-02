import axios from 'axios';
import jwt_decode from "jwt-decode";

export const login = async (officer) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.post('https://dtu-sa.onrender.com/officers/login', officer,{
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Origin': 'https://dtu-sa.onrender.com'
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
        return await axios.get(`https://dtu-sa.onrender.com/officers/all${url}`,{
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Origin': 'https://dtu-sa.onrender.com'
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
        return await axios.post('https://dtu-sa.onrender.com/officers',data,{
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Origin': 'https://dtu-sa.onrender.com'
            }
        })
    } catch (error) {
        return error
    }
}

export const deleteOfficer = async(id) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`https://dtu-sa.onrender.com/officers/${id}`,{
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Origin': 'https://dtu-sa.onrender.com'
            }
        })
    } catch (error) {
        return error
    }
}

export const authOfficer = async(token) => {
    const token2 = token
    try{
        return await axios.get(`https://dtu-sa.onrender.com/officers/authenticate`,{
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token2}`,
                'Content-Type': 'application/json',
                'Origin': 'https://dtu-sa.onrender.com'
            }
        })
    }catch(error){
        return error
    }


}