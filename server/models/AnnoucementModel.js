import mongoose from "mongoose";
import Officer from "./OfficerModel";

const AnnoucementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Officer,
        required: true
    },
    posX: {
        type: Double,
        required: true
    },
    posY: {
        type: Double, 
        required: true
    }
})

const Annoucement = mongoose.Model("Annoucement", AnnoucementSchema)
export default Annoucement