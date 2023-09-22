"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAchievements = exports.getUserPoints = exports.loginUser = exports.registerUser = void 0;
const password_js_1 = require("../../../authentication/encryption/password.js");
const messages_js_1 = require("../../../common/messages.js");
const users_js_1 = require("../../models/Users/users.js");
const database_js_1 = require("../database.js");
const registerUser = (userData) => {
    console.log(`registering ${userData.email}`);
    return (0, database_js_1.connectToDB)()
        .then(async (client) => {
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('Users');
        const user = {
            ...userData,
            password: (0, password_js_1.hashPassword)(userData.password),
        };
        const userForDB = new users_js_1.UserModel(user);
        const newUser = await collection.insertOne(userForDB);
        const collection2 = db.collection("AchievementsDictionary");
        const newDict = {
            userID: newUser.insertedId.toString(),
            achievmentsNames: [],
            userPoints: 0,
            commonNumber: 0,
            rareNumber: 0,
            veryCommonNumber: 0,
            veryRareNumber: 0,
            totalNumber: 0,
        };
        collection2.insertOne(newDict);
        return newUser;
    });
};
exports.registerUser = registerUser;
const loginUser = (loginData) => {
    console.log(`logging in ${loginData.email}`);
    return (0, database_js_1.connectToDB)()
        .then(async (client) => {
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('Users');
        const possibleUser = await collection.findOne({ email: loginData.email });
        if (!possibleUser) {
            return messages_js_1.EMAIL_DOES_NOT_EXIST_MESSAGE;
        }
        const passwordMatches = await (0, password_js_1.comparePassword)(loginData.password, possibleUser.password);
        if (!passwordMatches) {
            return messages_js_1.INVALID_CREDENTIALS_MESSAGE;
        }
        return possibleUser;
    });
};
exports.loginUser = loginUser;
const getUserPoints = (userID) => {
    return (0, database_js_1.connectToDB)()
        .then(async (client) => {
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('AchievementsDictionary');
        const userAchievementsAndPoints = await collection.findOne({ userID: userID });
        if (!userAchievementsAndPoints) {
            return messages_js_1.DEFAULT_ERROR_MESSAGE;
        }
        return userAchievementsAndPoints;
    });
};
exports.getUserPoints = getUserPoints;
const getUserAchievements = (userID) => {
    return (0, database_js_1.connectToDB)()
        .then(async (client) => {
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('AchievementsDictionary');
        const userAchievements = await collection.findOne({ userID: userID });
        if (!userAchievements) {
            console.log(userAchievements);
            return messages_js_1.DEFAULT_ERROR_MESSAGE;
        }
        const collection2 = db.collection('Achevments');
        const achievements = await collection2.find({}).toArray();
        const result = achievements.filter(ach => userAchievements.achievmentsNames.find((name) => name === ach.name));
        return result;
    });
};
exports.getUserAchievements = getUserAchievements;
