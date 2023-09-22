"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaTypes_1 = require("../schemaTypes");
const schema = new mongoose_1.default.Schema({
    _id: schemaTypes_1.required_string,
    latinName: schemaTypes_1.required_string,
    englishName: schemaTypes_1.required_string,
    rarity: schemaTypes_1.required_string,
    sorID: schemaTypes_1.required_string,
});
exports.UserModel = mongoose_1.default.model('Species', schema);
