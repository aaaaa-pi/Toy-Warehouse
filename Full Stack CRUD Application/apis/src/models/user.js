import mongoose from "mongoose";

export const User = mongoose.model('user',new mongoose.Schema({
    name: String,
    email: String,
    password: String
}))