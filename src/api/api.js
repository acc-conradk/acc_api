import express from 'express';
const router = express.Router();
/**
 *
 * @api {post} /api/register Register
 * @apiName Register
 * @apiDescription Assign a list of students to a teacher
 * @apiGroup API
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} teacher The email address of the teacher that students are registered to
 *
 * @apiSuccess (204) {String} status The status of the request
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "teacher": "teacherken@gmail.com"
 *   "students":
 *     [
 *       "studentjon@gmail.com",
 *       "studenthon@gmail.com"
 *     ]
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "status" : "ok"
 * }
 *
 *
 */
router.post('/register', async (req, res) => {
    res.json({
        status: 'ok',
    });
});
export default router;
