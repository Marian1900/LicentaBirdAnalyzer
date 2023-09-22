import mongoose from "mongoose";
const schema = new mongoose.Schema({
    username: String,
    displayName: String,
});
export const UserModel = mongoose.model('Model', schema);
