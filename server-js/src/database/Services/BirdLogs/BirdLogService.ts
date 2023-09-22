import express from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../../../common/messages.js';
import { addBirdLog, deleteBirdLog, getAllBirdLogs, getAllBirdLogsForUser } from './BirdLogController.js';
import { BirdLogAddData } from './types.js';

const router = express.Router();

router.route('/BirdLog/userLogs')
    .get(
        async function (req, res) {
            const userID = req.query.userID;
            if (typeof userID !== 'string') {
                res.status(500);
                throw new Error(DEFAULT_ERROR_MESSAGE);
            }
            try {
                const result = await getAllBirdLogsForUser(userID);
                res.json(result);
            } catch (err: any) {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE)
            }
        })

router.route('/BirdLog/allLogs')
    .get(
        async function (req, res) {
            try {
                const result = await getAllBirdLogs();
                res.json(result);
            } catch (err: any) {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE)
            }
        })

router.route('/BirdLog/add')
    .post(
        async function (req, res) {
            const logData: BirdLogAddData = req.body;
            try {
                const result = await addBirdLog(logData);
                res.send(result.insertedId);
            } catch (err: any) {
                console.log(err);
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE)
            }
        })

router.route('/BirdLog/delete')
    .delete(
        async function (req, res) {
            const logID = req.query.logID;
            if (typeof logID !== 'string') {
                res.status(500);
                throw new Error(DEFAULT_ERROR_MESSAGE);
            }
            try {
                const result = await deleteBirdLog(logID);
                res.send(result);
            } catch (err: any) {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE)
            }
        })

module.exports = router;