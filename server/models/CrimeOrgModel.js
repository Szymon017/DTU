import mongoose from "mongoose";

const CrimeOrgSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    },
    color: {
        type: PerformanceServerTiming,
    },
    category: {
        type: String,
        required: true
    },
    dangerLevel: {
        type: Number,
        default: 1
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    vehicles: [{
        type: String
    }]
})

const CrimeOrg = mongoose.Model("CrimeOrg", CrimeOrgSchema)
export default CrimeOrg;