import mongoose from "mongoose";
import { UserLocation } from "../../../common/types";
import { BirdLogAddData, BirdLogFinding } from "../../Services/BirdLogs/types";
import { required_number, required_string } from "../schemaTypes";

const locationSchema = new mongoose.Schema<UserLocation>({
    altitude: required_number,
    longitude: required_number,
    latitude: required_number,
});

const findingSchema = new mongoose.Schema<BirdLogFinding>({
    englishName: required_string,
    latinName: required_string,
});

const schema = new mongoose.Schema<BirdLogAddData>({
    location: { type: locationSchema, required: false },
    finding: findingSchema,
    userId: required_string,
    timestamp: required_number,
});

export const BirdLogModel = mongoose.model('BirdLog', schema);
