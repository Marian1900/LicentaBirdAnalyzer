import express from 'express';
import { DEFAULT_ERROR_MESSAGE, EMAIL_ALREADY_EXISTS_MESSAGE } from '../../../common/messages.js';
import { getUserAchievements, getUserPoints, loginUser, registerUser } from './UserController.js';
import { LoginCredentials, UserType } from './types.js';

const router = express.Router();
router.route('/register')
    .post(async function (req, res) {
        const userData: UserType = req.body;
        try {
            const result = await registerUser(userData);
            res.send(result.insertedId);
        } catch (err: any) {
            res.status(500);
            const code: number = err.code;
            if (code === 11000) {
                res.send(EMAIL_ALREADY_EXISTS_MESSAGE);
                return;
            }
            res.send(DEFAULT_ERROR_MESSAGE)
        }
    })

router.route('/login')
    .post(async function (req, res) {
        const loginCredentials: LoginCredentials = req.body;
        try {
            const result = await loginUser(loginCredentials);
            if (typeof result === "string") {
                res.status(500);
                res.send(result);
                return;
            }
            res.send(result);
        } catch (err: any) {
            res.status(500);
            res.send(DEFAULT_ERROR_MESSAGE)
        }
    })

router.route('/userPoints')
    .get(async function (req, res) {
        const userID = req.query.userID;
        try {
            if (typeof userID !== "string") {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE);
                return;
            }
            const result = await getUserPoints(userID);
            res.send(result);
            return;
        } catch (err: any) {
            res.status(500);
            res.send(DEFAULT_ERROR_MESSAGE)
        }
    })

router.route('/userAchievements')
    .get(async function (req, res) {
        const userID = req.query.userID;
        try {
            if (typeof userID !== "string") {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE);
                return;
            }
            const result = await getUserAchievements(userID);
            if (!result) {
                res.status(500);
                res.send(DEFAULT_ERROR_MESSAGE);
                return;
            }
            res.send(result);
            return;
        } catch (err: any) {
            res.status(500);
            res.send(DEFAULT_ERROR_MESSAGE)
        }
    })

module.exports = router;