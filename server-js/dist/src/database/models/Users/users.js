"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaTypes_js_1 = require("../schemaTypes.js");
const schema = new mongoose_1.default.Schema({
    email: { ...schemaTypes_js_1.required_string, unique: true },
    password: schemaTypes_js_1.required_string,
    firstName: schemaTypes_js_1.required_string,
    lastName: schemaTypes_js_1.required_string,
    role: schemaTypes_js_1.required_string,
});
exports.UserModel = mongoose_1.default.model('Users', schema);
