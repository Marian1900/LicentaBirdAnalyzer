import bodyParser from "body-parser";
import { config } from "dotenv";
import express from 'express';

const app = express();
const cfg = config();

const port = process.env.PORT;

const userServiceRouter = require('./src/database/Services/User/UserService');
const logService = require('./src/database/Services/BirdLogs/BirdLogService');
const speciesService = require('./src/database/Services/Species/SpeciesService');

app.listen(port, () => {
    console.log(`Server listening on a ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userServiceRouter);
app.use(logService);
app.use(speciesService);

export default app;