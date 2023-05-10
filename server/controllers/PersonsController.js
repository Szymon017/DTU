import Person from "../models/Person.js";

const addNewPerson = async (req, res) => {
    const { firstName, lastName, id, phone, email, avatar } = req.body;
    try {

        const newPerson = await Person.create({
            firstName,
            lastName,
            id,
            phone,
            email,
            avatar
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

const updatePerson = async (req, res) => {
    console.log("Updating person" + req.body.params);
    try {
        const newPerson = await Person.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!newPerson) {
            throw Error("No person found!")
        }
        res.status(200).json({
            status: "Successfully updated a person",
            data: newPerson
        })
    } catch (error) {
        res.status(200).json({
            status: "Failed to update a person",
            error: error.message
        })
    }

}

const getAllPersons = async (req, res) => {
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
    getAllPersons,
    updatePerson
}