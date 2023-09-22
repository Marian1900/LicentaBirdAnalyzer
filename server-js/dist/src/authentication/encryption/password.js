"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function generateSalt() {
    return bcrypt_1.default.genSaltSync(16);
}
function hashPassword(password) {
    return bcrypt_1.default.hashSync(password, generateSalt());
}
exports.hashPassword = hashPassword;
;
async function comparePassword(plainPassword, databaseHashedPassword) {
    return await bcrypt_1.default.compare(plainPassword, databaseHashedPassword);
}
exports.comparePassword = comparePassword;
