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
    orgAreaPhoto: {
        type: String,
        required: false,
        default: "https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/127/posts/31881/final_image/3_7a.png"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Person
    }],
    cases:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Case
    }],
    description: {
        type:String,
        required: false
    }
})

const CrimeOrg = mongoose.model("CrimeOrg", CrimeOrgSchema)
export default CrimeOrg;