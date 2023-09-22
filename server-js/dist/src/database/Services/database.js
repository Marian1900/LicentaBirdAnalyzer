"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongodb_1 = require("mongodb");
const connectToDB = () => mongodb_1.MongoClient.connect(process.env.CONNECTION_STRING);
exports.connectToDB = connectToDB;
