"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cfg = (0, dotenv_1.config)();
const port = process.env.PORT;
const userServiceRouter = require('./src/database/Services/User/UserService');
const logService = require('./src/database/Services/BirdLogs/BirdLogService');
const speciesService = require('./src/database/Services/Species/SpeciesService');
app.listen(port, () => {
    console.log(`Server listening on a ${port}`);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(userServiceRouter);
app.use(logService);
app.use(speciesService);
exports.default = app;
