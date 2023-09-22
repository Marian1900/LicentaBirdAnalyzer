"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_js_1 = require("../../../common/messages.js");
const UserController_js_1 = require("./UserController.js");
const router = express_1.default.Router();
router.route('/register')
    .post(async function (req, res) {
    const userData = req.body;
    try {
        const result = await (0, UserController_js_1.registerUser)(userData);
        res.send(result.insertedId);
    }
    catch (err) {
        res.status(500);
        const code = err.code;
        if (code === 11000) {
            res.send(messages_js_1.EMAIL_ALREADY_EXISTS_MESSAGE);
            return;
        }
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/login')
    .post(async function (req, res) {
    const loginCredentials = req.body;
    try {
        const result = await (0, UserController_js_1.loginUser)(loginCredentials);
        if (typeof result === "string") {
            res.status(500);
            res.send(result);
            return;
        }
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/userPoints')
    .get(async function (req, res) {
    const userID = req.query.userID;
    try {
        if (typeof userID !== "string") {
            res.status(500);
            res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
            return;
        }
        const result = await (0, UserController_js_1.getUserPoints)(userID);
        res.send(result);
        return;
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
router.route('/userAchievements')
    .get(async function (req, res) {
    const userID = req.query.userID;
    try {
        if (typeof userID !== "string") {
            res.status(500);
            res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
            return;
        }
        const result = await (0, UserController_js_1.getUserAchievements)(userID);
        if (!result) {
            res.status(500);
            res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
            return;
        }
        res.send(result);
        return;
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
module.exports = router;
