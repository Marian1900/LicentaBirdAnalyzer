import { comparePassword, hashPassword } from "../../../authentication/encryption/password.js";
import { DEFAULT_ERROR_MESSAGE, EMAIL_DOES_NOT_EXIST_MESSAGE, INVALID_CREDENTIALS_MESSAGE } from "../../../common/messages.js";
import { UserModel } from "../../models/Users/users.js";
import { connectToDB } from "../database.js";
import { AchievementsDictionary, LoginCredentials, UserType } from "./types.js";

export const registerUser = (userData: UserType) => {
    console.log(`registering ${userData.email}`);
    return connectToDB()
        .then(async client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('Users');
            const user: UserType = {
                ...userData,
                password: hashPassword(userData.password),
            }
            const userForDB = new UserModel(user);
            const newUser = await collection.insertOne(userForDB);
            const collection2 = db.collection("AchievementsDictionary");
            const newDict: AchievementsDictionary = {
                userID: newUser.insertedId.toString(),
                achievmentsNames: [],
                userPoints: 0,
                commonNumber: 0,
                rareNumber: 0,
                veryCommonNumber: 0,
                veryRareNumber: 0,
                totalNumber: 0,
            }
            collection2.insertOne(newDict);
            return newUser;

        });
}

export const loginUser = (loginData: LoginCredentials) => {
    console.log(`logging in ${loginData.email}`);
    return connectToDB()
        .then(async client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('Users');
            const possibleUser = await collection.findOne({ email: loginData.email })
            if (!possibleUser) {
                return EMAIL_DOES_NOT_EXIST_MESSAGE;
            }
            const passwordMatches = await comparePassword(loginData.password, possibleUser.password);
            if (!passwordMatches) {
                return INVALID_CREDENTIALS_MESSAGE;
            }
            return possibleUser;
        });
}
export const getUserPoints = (userID: string) => {
    return connectToDB()
        .then(async client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('AchievementsDictionary');
            const userAchievementsAndPoints = await collection.findOne({ userID: userID })
            if (!userAchievementsAndPoints) {
                return DEFAULT_ERROR_MESSAGE;
            }
            return userAchievementsAndPoints;
        });
}

export const getUserAchievements = (userID: string) => {
    return connectToDB()
        .then(async client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('AchievementsDictionary');
            const userAchievements = await collection.findOne({ userID: userID })
            if (!userAchievements) {
                console.log(userAchievements)
                return DEFAULT_ERROR_MESSAGE;
            }
            const collection2 = db.collection('Achevments');
            const achievements = await collection2.find({}).toArray();
            const result = achievements.filter(ach => userAchievements.achievmentsNames.find((name: string) => name === ach.name));
            return result
        });
}