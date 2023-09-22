import mongoose from "mongoose";
import { UserType } from "../../Services/User/types.js";
import { required_string } from "../schemaTypes.js";

const schema = new mongoose.Schema<UserType>({
    email: { ...required_string, unique: true },
    password: required_string,
    firstName: required_string,
    lastName: required_string,
    role: required_string,
});

export const UserModel = mongoose.model<UserType>('Users', schema);