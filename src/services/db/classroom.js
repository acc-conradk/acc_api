/**
 * @param {import('../db').Database} db
 */
export default (db) => {
    return {
        createTeacherStudent: async function (teacher_email, student_emails) {
            const errors = [];
            for (let student_email of student_emails) {
                try {
                    await db.insertRecord('teacher_students', { teacher_email, student_email });
                } catch (err) {}
            }
        },
    };
};
