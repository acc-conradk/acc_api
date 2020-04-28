import express from 'express';
import controllers from '../controllers/index';
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, NO_CONTENT } from '../constants/httpCode';
import { UNEXPECTED_ERROR, MissingParamAPIError } from '../constants/errors';
import { STUDENTS_REGISTERED } from '../constants/message';
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
 *     "message": "Students successfully registere"
 * }
 *
 *
 */
router.post('/register', async (req, res) => {
    try {
        const teacher_email = req.body.teacher;
        const student_emails = req.body.students;
        if (!teacher_email) {
            throw new MissingParamAPIError('missing param teacher');
        }
        if (!student_emails) {
            throw new MissingParamAPIError('missing param students');
        }
        await controllers.classroom.assignStudentsToTeacher(teacher_email, student_emails);
        res.status(NO_CONTENT);
        res.json({
            message: STUDENTS_REGISTERED,
        });
    } catch (err) {
        res.status(err.statusCode || INTERNAL_SERVER_ERROR);
        res.json({
            message: err.formattedMessage || UNEXPECTED_ERROR,
        });
    }
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
    try {
        let teachers = req.query.teacher;
        if (!teachers) {
            throw new MissingParamAPIError('missing param teacher');
        }
        if (!Array.isArray(teachers)) {
            teachers = [teachers];
        }
        const students = await controllers.classroom.getCommonStudents(teachers);
        res.status(OK);
        res.json({
            students,
        });
    } catch (err) {
        res.status(err.statusCode || INTERNAL_SERVER_ERROR);
        res.json({
            message: err.formattedMessage || UNEXPECTED_ERROR,
        });
    }
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
    try {
        const student_email = req.body.student;
        if (!student_email) {
            throw new MissingParamAPIError('missing param student');
        }
        await controllers.classroom.suspendStudent(student_email);
        res.status(NO_CONTENT);
        res.json({
            status: 'ok',
        });
    } catch (err) {
        res.status(err.statusCode || INTERNAL_SERVER_ERROR);
        res.json({
            message: err.formattedMessage || UNEXPECTED_ERROR,
        });
    }
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
    try {
        const teacher = req.body.teacher;
        const notification = req.body.notification;
        if (!teacher) {
            throw new MissingParamAPIError('missing param teacher');
        }
        if (!notification) {
            throw new MissingParamAPIError('missing param notification');
        }
        const recipients = await controllers.classroom.findNotificationRecipients(teacher, notification);
        res.status(OK);
        res.json({
            recipients,
        });
    } catch (err) {
        res.status(err.statusCode || INTERNAL_SERVER_ERROR);
        res.json({
            message: err.formattedMessage || UNEXPECTED_ERROR,
        });
    }
});

export default router;
