import mongoose from "mongoose";

const CaseSchema = mongoose.Schema({
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
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Case = mongoose.Model("Case", CaseSchema)
export default Case;