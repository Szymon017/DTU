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
        required: false
    },
    email: {
        type: String,
        required: false
    }
})

const Person = mongoose.model("Person", PersonSchema)
export default Person;