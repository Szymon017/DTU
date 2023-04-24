import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const OfficerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }, 
    role: {
        type: Number,
        default: 1
    },
    avatar: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
    }
})

OfficerSchema.statics.login = async function (email, password) {
    const officer = await this.findOne({ login: email });

    if (officer) {
        const auth = await bcrypt.compare(password, officer.password);
        if (auth) {
            return officer;
        }
        throw Error('Niepoprawne hasło')
    }
    throw Error('Niepoprawny adres email')

};

OfficerSchema.statics.signUp = async (firstName, lastName, login, password, phone, grade) => {


    if (!firstName, !lastName, !login, !password, !phone, !grade) {
        throw Error('Pola nie mogą być puste!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    console.log(hashed_password);
    const newOfficer = await Officer.create({
        firstName,
        lastName,
        login,
        password: hashed_password,
        phone,
        grade: 1, 
        role: 1
    });

    return newOfficer;
}

const Officer = mongoose.model("Officer", OfficerSchema)
export default Officer;
