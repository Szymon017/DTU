import mongoose from "mongoose";
import Officer from "../models/OfficerModel.js";

const AnnoucementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posX: {
        type: Number,
        required: true
    },
    posY: {
        type: Number, 
        required: true
    },
    color: {
        type: String,
        required: false,
        default: "white"
    }
})

const Annoucement = mongoose.model("Annoucement", AnnoucementSchema)
export default Annoucement