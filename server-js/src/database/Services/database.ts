import { MongoClient } from "mongodb";

export const connectToDB = () => MongoClient.connect(process.env.CONNECTION_STRING);