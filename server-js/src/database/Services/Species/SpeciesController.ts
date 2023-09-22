import { connectToDB } from "../database";

export const getBirdSpecies = () => {
    return connectToDB()
        .then(client => {
            const db = client.db(process.env.DATABASE_NAME);
            const collection = db.collection('Species');
            const result = collection.find({});
            return result.toArray();
        });
}