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

/**
 *
 * @api {get} /api/commonstudents Common Students
 * @apiName CommonStudents
 * @apiDescription Get the list of common students for a given list of teachers
 * @apiGroup API
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String[]} teacher The list of teachers
 *
 * @apiSuccess (200) {String} status The status of the request
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "teacher": "teacherken@gmail.com"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "students":
 *     [
 *       "commonstudent1@gmail.com",
 *       "commonstudent2@gmail.com"
 *     ]
 * }
 *
 *
 */
router.get('/commonstudents', async (req, res) => {
    let teachers = req.query.teacher;
    if (!Array.isArray(teachers)) {
        teachers = [teachers];
    }
    const students = await controllers.classroom.getCommonStudents(teachers);
    res.status(200);
    res.json({
        students,
    });
});

/**
 *
 * @api {post} /api/suspend Suspend Student
 * @apiName Suspend
 * @apiDescription Suspends a student by email
 * @apiGroup API
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} student The email address of the student to be suspended
 *
 * @apiSuccess (204) {String} status The status of the request
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "student" : "studentmary@gmail.com"
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
router.post('/suspend', async (req, res) => {
    const student_email = req.body.student;
    await controllers.classroom.suspendStudent(student_email);
    res.status(204);
    res.json({
        status: 'ok',
    });
});

/**
 *
 * @api {post} /api/retrievefornotifications Retrieve for notifications
 * @apiName RetrieveForNotifications
 * @apiDescription Retrieve a list of student emails for a notification
 * @apiGroup API
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} teacher The email address of the teacher
 * @apiParam  {String} notification The notification to be sent out (allows @ mentions for student emails)
 *
 * @apiSuccess (204) {String} status The status of the request
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *   "teacher":  "teacherken@gmail.com",
 *   "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "recipients":
 *     [
 *       "studentbob@gmail.com",
 *       "studentagnes@gmail.com",
 *       "studentmiche@gmail.com"
 *     ]
 * }
 *
 *
 */
router.post('/retrievefornotifications', async (req, res) => {
    const teacher = req.body.teacher;
    const notification = req.body.notification;
    const recipients = await controllers.classroom.findNotificationRecipients(teacher, notification);
    res.status(204);
    res.json({
        recipients,
    });
});

export default router;
