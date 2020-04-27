import express from 'express';
const router = express.Router();
router.use('/', (req, res) => {
    res.json({
        status: 'ok',
    });
});
export default router;
