"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_js_1 = require("../../../common/messages.js");
const SpeciesController_js_1 = require("./SpeciesController.js");
const router = express_1.default.Router();
router.route('/species')
    .get(async function (req, res) {
    try {
        const result = await (0, SpeciesController_js_1.getBirdSpecies)();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(messages_js_1.DEFAULT_ERROR_MESSAGE);
    }
});
module.exports = router;
