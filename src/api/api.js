import express from 'express';
import controllers from '../controllers/index';
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
    const teacher_email = req.body.teacher;
    const student_emails = req.body.students;
    await controllers.classroom.assignStudentsToTeacher(teacher_email, student_emails);
    res.status(204);
    res.json({
        status: 'ok',
    });
});
export default router;
