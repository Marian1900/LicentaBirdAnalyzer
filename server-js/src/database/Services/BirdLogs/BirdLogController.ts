import { ObjectId } from 'mongodb';
import { connectToDB } from "../database.js";
import { BirdLogModel } from './../../models/BirdLogs/birdLogs';
import { BirdLogAddData } from "./types.js";

export const getAllBirdLogsForUser = (userId: string) => {
    return connectToDB()
        .then(client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('BirdLog');
            const filterCriteria = { userId: userId };
            const result = collection.find(filterCriteria);
            return result.toArray();
        });
}

export const getAllBirdLogs = () => {
    return connectToDB()
        .then(client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('BirdLog');
            const result = collection.find({});
            return result.toArray();
        });
}

export const addBirdLog = (data: BirdLogAddData) => {
    return connectToDB()
        .then(async client => {
            const db = client.db(process.env.DATABASE_NAME);
            const logsCollection = db.collection('BirdLog');
            const speciesCollection = db.collection('Species');
            console.log(data);
            const specie = await speciesCollection.findOne({ latinName: data.finding.latinName.toLocaleLowerCase() });
            if (specie) {
                const achievementsCollection = db.collection('Achevments');
                const achievementsDictionaryCollection = db.collection('AchievementsDictionary');
                const pointsDictionaryCollection = db.collection('PointsDictionary');

                const achievementsDictionaryEntry = await achievementsDictionaryCollection.findOne({ userID: data.userId });
                const pointsDictionary = await pointsDictionaryCollection.find({}).toArray();
                console.log(achievementsDictionaryEntry);
                if (achievementsDictionaryEntry) {
                    const currentAchievements: string[] = achievementsDictionaryEntry.achievmentsNames;
                    if (!currentAchievements.includes("first_bird")) {
                        currentAchievements.push("first_bird");
                        achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "achievement" && item.name === "first_bird")?.points || 0;
                    }
                    achievementsDictionaryEntry.totalNumber += 1;
                    if (achievementsDictionaryEntry.totalNumber === 10) {
                        currentAchievements.push("bird_enthusiast");
                        achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "achievement" && item.name === "bird_enthusiast")?.points || 0;
                    }
                    if (achievementsDictionaryEntry.totalNumber === 100) {
                        currentAchievements.push("bird_master");
                        achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "achievement" && item.name === "bird_master")?.points || 0;
                    }
                    switch (specie.rarity) {
                        case "very common":
                            achievementsDictionaryEntry.veryCommonNumber += 1;
                            achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "identification" && item.name === specie.rarity)?.points || 0;
                            break;
                        case "common":
                            achievementsDictionaryEntry.commonNumber += 1;
                            achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "identification" && item.name === specie.rarity)?.points || 0;
                            break;
                        case "rare":
                            achievementsDictionaryEntry.rareNumber += 1;
                            achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "identification" && item.name === specie.rarity)?.points || 0;
                            if (achievementsDictionaryEntry.rareNumber === 10) {
                                currentAchievements.push("bird_scouter");
                                achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "achievement" && item.name === "bird_scouter")?.points || 0;
                            }
                            break;
                        case "very rare":
                            achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "identification" && item.name === specie.rarity)?.points || 0;
                            achievementsDictionaryEntry.veryRareNumber += 1;
                            if (achievementsDictionaryEntry.veryRareNumber === 10) {
                                currentAchievements.push("treasure_hunter");
                                achievementsDictionaryEntry.userPoints += pointsDictionary.find(item => item.type === "achievement" && item.name === "treasure_hunter")?.points || 0;
                            }
                            break;
                    }
                    achievementsDictionaryCollection.updateOne({ userID: data.userId }, { $set: { ...achievementsDictionaryEntry } })
                }
            }
            const logForDB = new BirdLogModel(data);
            return logsCollection.insertOne(logForDB);
        });
}

export const deleteBirdLog = (id: string) => {
    return connectToDB()
        .then(client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('BirdLog');
            return collection.deleteOne({ _id: new ObjectId(id) });
        });
}