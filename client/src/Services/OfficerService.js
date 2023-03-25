import axios from 'axios';
import jwt_decode from "jwt-decode";

export const login = async (officer) => {
    try {
        return await axios.post('http://localhost:5000/officers/login', officer)
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

export const getAllOfficers = async() => {
    try {
        return await axios.get('http://localhost:5000/officer')
    } catch (err) {
        return err
    }
}
