import mongoose from "mongoose";

const PersonSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    avatar: {
        type: String, 
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
        default: ""
    }
})

const Person = mongoose.model("Person", PersonSchema)
export default Person;