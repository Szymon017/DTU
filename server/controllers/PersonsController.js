import Person from "../models/Person.js";

const addNewPerson = async (req, res) => {
    const { firstName, lastName, id, phone, email } = req.body;
    console.log("XDD");
    try {
        
        const newPerson = await Person.create({
            firstName,
            lastName,
            id,
            phone,
            email
        });
        res.status(200).json({
            message: "success",
            object: newPerson
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllPersons = async(req, res) => {
    try {
        const result = await Person.find({})
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
    addNewPerson,
    getAllPersons
}