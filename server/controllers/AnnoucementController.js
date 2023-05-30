import Annoucement from "../models/AnnoucementModel.js";

const addNewAnnoucement = async (req, res) => {
    const { title, description, color } = req.body;

    try {
        const newAnnoucement = await Annoucement.create({ title, description, posX: 500, posY: 231, color: color });
        res.status(200).json({
            message: "Successfully added new Annoucement",
            results: newAnnoucement
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

const getAllAnnoucements = async (req, res) => {
    try {
        const result = await Annoucement.find();
        res.status(200).json({
            message: "Successfully got all annoucements",
            results: result
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteAnAnnoucement = async (req, res) => {
    try {
        const result = await Annoucement.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: "Successfully deleted an annoucement"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateAnnoucement = async (req, res) => {
    try {
        const newAnnoucement = await Annoucement.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        if (!newAnnoucement) throw Error("No annoucement found!")
        res.status(200).json({
            status: "Successfully updated an annoucement",
            data: newAnnoucement
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed to update an annoucement",
            message: error.message
        })
    }
}

export {
    addNewAnnoucement,
    getAllAnnoucements,
    deleteAnAnnoucement,
    updateAnnoucement
}