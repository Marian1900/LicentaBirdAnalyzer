import mongoose from "mongoose";
mongoose.connect('mongodb://localhost/your_db_name');
export const initializeDB = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });
};
