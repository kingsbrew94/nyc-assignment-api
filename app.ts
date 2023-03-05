import express from 'express';
import {Server} from 'typescript-rest';
import cors from 'cors';
import getRootDirectory from './utils/getRootDirectory';
import { EnvironmentVariables } from './utils';

// Initialize express
const app: express.Application = express();

// Initialize server port
const SERVER_PORT = process.env.NODE_ENV !== 'production' ? EnvironmentVariables.get('server.port') : process.env.PORT;

// Initialize application root directory path
const ROOT_DIR = getRootDirectory();

// Allow cross-origin-site access
app.use(cors());

// Load Controllers And Models
Server.loadServices(app,[`${ROOT_DIR}/controllers/*`,`${ROOT_DIR}/models/*`]);

app.listen(SERVER_PORT, function() {
    console.log(`Server listening on port: ${SERVER_PORT}`);
});