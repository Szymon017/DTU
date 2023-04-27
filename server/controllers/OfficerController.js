import Officer from "../models/OfficerModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
}

const register = async (req, res) => {
    const { firstName, lastName, login, password, phone, avatar } = req.body;
    console.log(req.body);
    try {
        const sign = await Officer.signUp(firstName, lastName, login, password, phone,avatar)
        res.status(200).json({
            message: "success"
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        console.log(login + " " + password);
        const officer = await Officer.login(login, password);
        console.log(officer);
        await Officer.findById({ _id: officer._id })
        const tokenData = {
            _id: officer._id,
            firstName: officer.firstName,
            lastName: officer.lastName,
            phone: officer.phone,
            grade: officer.grade,
            avatar: officer.avatar,
            role: officer.role
        }

        const token = createToken(tokenData)
        res.status(200).json({
            status: "Logged in",
            token: token
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        })
    }
}
const getAllOfficers = async (req, res) => {
    try {
        const result = await Officer.find({}).select({"_id":1, "firstName":1, "lastName":1, "avatar":1, "phone":1, "grade":1})
        res.status(200).json({
            message: "success",
            results: result
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


export {
    register,
    login,
    getAllOfficers
}