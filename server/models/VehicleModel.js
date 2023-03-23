import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    }
})

const Vehicle = mongoose.Model("Vehicle", VehicleSchema)
export default Vehicle;