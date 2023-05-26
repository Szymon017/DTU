import mongoose from "mongoose";
import Officer from "./OfficerModel.js";
import Person from "./Person.js";
import CrimeOrg from "./CrimeOrgModel.js";

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
    },
    archived: {
        type: Boolean,
        default: false
    },
    evidences: [{
        description: {
            type: String,
        },
        photo: {
            type: String
        }
    }],
    persons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Person
    }],
    orgs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CrimeOrg
    }]
})

const Case = mongoose.model("Case", CaseSchema)
export default Case;