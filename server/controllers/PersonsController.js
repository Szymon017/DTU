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

const getPersons = async (req, res) => {
    const query = {}
    console.log(req.query.id);
    if(req.query.id){
        query.id = req.query.id
    }
    try {
        if(req.query){
            const result = await Person.find(query)
            if(result.length > 0){
                res.status(200).json({
                    message: "success",
                    results: result
                })
            }else{
                res.status(200).json({
                    message: "Brak osoby o podanym numerze dowodu",
                    results: result
                })
            }
        }else{
            const result = await Person.find({})
            res.status(200).json({
                message: "success",
                results: result
            })
        }
    } catch (err) {
        res.status(404).json({
            error: err.message
        })
    }
}

export {
    addNewPerson,
    getPersons,
    updatePerson
}