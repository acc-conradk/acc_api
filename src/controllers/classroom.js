import { getNotificationMentions } from '../lib/notification';
/**
 * @param {import('../services/index').Services} services
 */

export default (services) => {
    const DB = services.db;
    return {
        /**
         * @param {string} teacher_email
         * @param {string[]} student_emails
         */
        async assignStudentsToTeacher(teacher_email, student_emails) {
            if (!teacher_email) {
                throw new Error(`Missing param: 'teacher_email'`);
            }
            if (!student_emails) {
                throw new Error(`Missing param: 'student_emails'`);
            }
            await DB.classroom.addStudentsByEmails(student_emails);
            await DB.classroom.createTeacherStudent(teacher_email, student_emails);
        },
        /**
         * @param {string[]} teacher_emails
         */
        async getCommonStudents(teacher_emails) {
            if (!teacher_emails) {
                throw new Error(`Missing param: 'teacher_emails'`);
            }
            if (teacher_emails.length === 0) {
                return [];
            }
            return await DB.classroom.getCommonStudents(teacher_emails);
        },
        /**
         * @param {string} student_email
         */
        async suspendStudent(student_email) {
            let student = await DB.classroom.getStudent(student_email);
            if (!student) {
                throw new Error(`Student does not exist`);
            }
            student.suspended = 1;
            const { student_id } = student;
            return await DB.classroom.updateStudent(student_id, student);
        },
        /**
         * @param {string} student_email
         */
        async getStudentByEmail(student_email) {
            return await DB.classroom.getStudent(student_email);
        },
        async findNotificationRecipients(teacher_email, notification) {
            const teacher_students = await DB.classroom.getTeacherStudents(teacher_email);
            const mentions = await getNotificationMentions(notification);
            const student_index = {};
            for (let student_email of mentions) {
                student_index[student_email] = 1;
            }
            for (let teacher_student of teacher_students) {
                const { student_email } = teacher_student;
                student_index[student_email] = 1;
            }

            //Filter out suspended users
            const student_emails = Object.keys(student_index);
            const students = await DB.classroom.getStudentsByEmails(student_emails);
            for (let student of students) {
                const { student_email, suspended } = student;
                if (suspended) {
                    delete student_index[student_email];
                }
            }
            return Object.keys(student_index);
        },
    };
};
