import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        default: null
    },
    profileID:{
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
})

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;