export default (db) => {
    return {
        createTeacherStudent: async function (teacher_email, student_emails) {
            console.log('Adding: ', teacher_email, student_emails);
        },
    };
};
