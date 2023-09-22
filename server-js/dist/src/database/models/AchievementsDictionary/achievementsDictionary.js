"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsDictionaryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaTypes_1 = require("../schemaTypes");
const schema = new mongoose_1.default.Schema({
    userID: schemaTypes_1.required_string,
    achievmentsNames: [schemaTypes_1.required_string],
    userPoints: schemaTypes_1.required_number
});
exports.AchievementsDictionaryModel = mongoose_1.default.model('AchievementsDictionary', schema);
