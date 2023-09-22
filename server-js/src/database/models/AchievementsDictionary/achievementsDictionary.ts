import mongoose from "mongoose";
import { AchievementsDictionary } from "../../Services/User/types";
import { required_number, required_string } from "../schemaTypes";

const schema = new mongoose.Schema<AchievementsDictionary>({
    userID: required_string,
    achievmentsNames: [required_string],
    userPoints: required_number
});

export const AchievementsDictionaryModel = mongoose.model('AchievementsDictionary', schema);
