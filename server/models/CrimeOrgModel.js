import mongoose from "mongoose";
import Case from "./CaseModel.js";
import Person from "./Person.js";

const CrimeOrgSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    dangerLevel: {
        type: Number,
        default: 1
    },
    photo: {
        type: String, 
        required:false,
        default: "https://cdn.dribbble.com/users/25373/screenshots/16939058/comp-1_2_still_2x.gif?compress=1&resize=400x300&vertical=top"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Person
    }],
    cases:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Case
    }]
})

const CrimeOrg = mongoose.model("CrimeOrg", CrimeOrgSchema)
export default CrimeOrg;