import * as uuid from 'uuid';
/**
 * @param {import('../db').Database} db
 */
export default (db) => {
    const classroomDB = {
        createTeacherStudent: async function (teacher_email, student_emails) {
            const errors = [];
            //Ensure that the teacher record exists, and create it if it doesn't
            let teacher = await db.getRecord('teacher', { teacher_email });
            if (!teacher) {
                let teacher_id = uuid.v4();
                await db.insertRecord('teacher', { teacher_id, teacher_email });
            }

            //Fetch and index existing student records for those with emails
            let existing_students = await db.getRecords('student', { student_email: student_emails });
            let students_email_index = existing_students.reduce((state, student) => {
                const { student_email } = student;
                state[student_email] = student;
                return state;
            }, {});

            for (let student_email of student_emails) {
                try {
                    let student = students_email_index[student_email];
                    if (!student) {
                        //Create students that have not yet been created
                        student = {
                            student_id: uuid.v4(),
                            student_email,
                            suspended: 0,
                        };
                        await db.insertRecord('student', student);
                    }
                    //Create teacher_student record
                    let record = await db.getRecord('teacher_student', { teacher_email, student_email });
                    if (!record) {
                        // Only create if new record is not found
                        let teacher_student_id = uuid.v4();
                        await db.insertRecord('teacher_student', { teacher_student_id, teacher_email, student_email });
                    }
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
        addStudentsByEmails: async function (student_emails) {
            let students = [];
            for (let student_email of student_emails) {
                let existing_student = await classroomDB.getStudent(student_email);
                if (!existing_student) {
                    let student = await classroomDB.addStudent({ student_email });
                    students.push(student);
                }
            }
            return students;
        },
        addStudent: async function (student) {
            let student_id = uuid.v4();
            const record = {
                student_id,
                ...student,
            };
            await db.insertRecord('student', record);
            return record;
        },
        getStudent: async function (student_email) {
            let student = await db.getRecord('student', { student_email });
            return student;
        },
        updateStudent: async function (student_id, student) {
            await db.updateRecords('student', student, { student_id });
        },
        getTeacherStudents: async function (teacher_email) {
            return await db.getRecords('teacher_student', { teacher_email });
        },
        getStudentsByEmails: async function (student_emails) {
            return await db.getRecords('student', { student_email: student_emails });
        },
    };
    return classroomDB;
};
