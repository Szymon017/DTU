import mongoose from "mongoose";
import Officer from "./OfficerModel.js";

const CaseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: "Tutaj wpisz treść raportu"
    },
    officers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Officer,
        required: true
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Case = mongoose.model("Case", CaseSchema)
export default Case;