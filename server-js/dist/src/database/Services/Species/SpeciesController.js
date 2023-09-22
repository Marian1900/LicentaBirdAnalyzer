"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBirdSpecies = void 0;
const database_1 = require("../database");
const getBirdSpecies = () => {
    return (0, database_1.connectToDB)()
        .then(client => {
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('Species');
        const result = collection.find({});
        return result.toArray();
    });
};
exports.getBirdSpecies = getBirdSpecies;
