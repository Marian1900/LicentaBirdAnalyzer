"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdLogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaTypes_1 = require("../schemaTypes");
const locationSchema = new mongoose_1.default.Schema({
    altitude: schemaTypes_1.required_number,
    longitude: schemaTypes_1.required_number,
    latitude: schemaTypes_1.required_number,
});
const findingSchema = new mongoose_1.default.Schema({
    englishName: schemaTypes_1.required_string,
    latinName: schemaTypes_1.required_string,
});
const schema = new mongoose_1.default.Schema({
    location: { type: locationSchema, required: false },
    finding: findingSchema,
    userId: schemaTypes_1.required_string,
    timestamp: schemaTypes_1.required_number,
});
exports.BirdLogModel = mongoose_1.default.model('BirdLog', schema);
