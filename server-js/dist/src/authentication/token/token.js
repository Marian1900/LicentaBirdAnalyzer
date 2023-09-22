"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateAccessToken = (username) => {
    return (0, jsonwebtoken_1.sign)(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};
exports.generateAccessToken = generateAccessToken;
