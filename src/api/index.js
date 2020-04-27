import express from 'express';
import path from 'path';
import apiRouter from './api';
const router = express.Router();
router.use('/api', apiRouter);
router.use('/', express.static(path.join(__dirname, '../../doc')));
export default router;
