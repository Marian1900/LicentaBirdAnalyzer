import mongoose from "mongoose";
import { SpecieType } from "../../Services/Species/types";
import { required_string } from "../schemaTypes";

const schema = new mongoose.Schema<SpecieType>({
    _id: required_string,
    latinName: required_string,
    englishName: required_string,
    rarity: required_string,
    sorID: required_string,
});

export const UserModel = mongoose.model<SpecieType>('Species', schema);