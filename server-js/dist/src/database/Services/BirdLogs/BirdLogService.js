"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_js_1 = require("../../../common/messages.js");
const BirdLogController_js_1 = require("./BirdLogController.js");
const router = express_1.default.Router();
router.route('/BirdLog/userLogs')
    .get(async function (req, res) {
    const userID = req.query.userID;
    if (typeof userID !== 'string') {
        res.status(500);
        throw new Error(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
    try {
        const result = await (0, BirdLogController_js_1.getAllBirdLogsForUser)(userID);
        res.json(result);
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/BirdLog/allLogs')
    .get(async function (req, res) {
    try {
        const result = await (0, BirdLogController_js_1.getAllBirdLogs)();
        res.json(result);
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/BirdLog/add')
    .post(async function (req, res) {
    const logData = req.body;
    try {
        const result = await (0, BirdLogController_js_1.addBirdLog)(logData);
        res.send(result.insertedId);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/BirdLog/delete')
    .delete(async function (req, res) {
    const logID = req.query.logID;
    if (typeof logID !== 'string') {
        res.status(500);
        throw new Error(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
    try {
        const result = await (0, BirdLogController_js_1.deleteBirdLog)(logID);
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
module.exports = router;
