import * as uuid from 'uuid';
/**
 * @param {import('../db').Database} db
 */
export default (db) => {
    return {
        createTeacherStudent: async function (teacher_email, student_emails) {
            const errors = [];
            for (let student_email of student_emails) {
                try {
                    let teacher_student_id = uuid.v4();
                    await db.insertRecord('teacher_student', { teacher_student_id, teacher_email, student_email });
                } catch (err) {
                    errors.push(err);
                }
            }
            if (errors.length > 0) {
                throw new Error(`${errors.length} students failed to be added.`);
            }
        },
        /**
         * @param {string[]} teacher_emails
         */
        getCommonStudents: async function (teacher_emails) {
            let teacher_students = await db.getRecords('teacher_student', { teacher_email: teacher_emails });
            /**
             * Keys are student emails, values are number of teachers that match
             * A student is common of the number of matches against teachers matches the total number of teachers
             * @type {Object<string, number>}
             */
            const student_index = {};
            //Tabulate the number of teachers that each student has
            for (let teacher_student of teacher_students) {
                const { student_email } = teacher_student;
                let student_index_record = student_index[student_email] || 0;
                student_index_record += 1;
                student_index[student_email] = student_index_record;
            }

            //Filter out all students that have a same number of teacher matches as the number of provided teachers
            let common_students = Object.keys(student_index).filter((student_email) => {
                let teacher_count = student_index[student_email];
                if (teacher_count === teacher_emails.length) {
                    return true;
                }
                return false;
            });
            return common_students;
        },
    };
};
