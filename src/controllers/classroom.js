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
    };
};
