import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './api/index';
import { getConfig } from './config/index';

const config = getConfig();
const app = express();
/** @type {*} */
const corsMiddleware = cors;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsMiddleware());
app.use(routers);
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
