import { assert, expect } from 'chai';
import testServices from './services';
import * as db from './db';
import makeClassroomController from '../controllers/classroom';
import { getNotificationMentions } from '../lib/notification';
const classroomController = makeClassroomController(testServices);
describe('Classroom', async () => {
    beforeEach(() => {
        db.reset();
    });
    it('Assign students to teacher', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', ['studentjon@gmail.com', 'studenthon@gmail.com']);
    });
    it('Gets common students (single teacher)', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', [
            'commonstudent1@gmail.com',
            'commonstudent2@gmail.com',
            'student_only_under_teacher_ken@gmail.com',
        ]);
        const commonstudents = await classroomController.getCommonStudents(['teacherken@gmail.com']);

        //check the output
        const expected = ['commonstudent1@gmail.com', 'commonstudent2@gmail.com', 'student_only_under_teacher_ken@gmail.com'];
        expect(commonstudents).to.have.members(expected);
    });
    it('Gets common students', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', [
            'commonstudent1@gmail.com',
            'commonstudent2@gmail.com',
            'student_only_under_teacher_ken@gmail.com',
        ]);
        await classroomController.assignStudentsToTeacher('teacherjoe@gmail.com', ['commonstudent1@gmail.com', 'commonstudent2@gmail.com']);
        const commonstudents = await classroomController.getCommonStudents(['teacherken@gmail.com', 'teacherjoe@gmail.com']);

        //check the output
        const expected = ['commonstudent1@gmail.com', 'commonstudent2@gmail.com'];
        expect(commonstudents).to.have.members(expected);
    });
    it('Suspends a student', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', ['studentjon@gmail.com', 'studenthon@gmail.com']);
        await classroomController.suspendStudent('studentjon@gmail.com');
        const student = await classroomController.getStudentByEmail('studentjon@gmail.com');
        assert.isTrue(student.suspended === 1, 'Student was not suspended');
    });
    it('Gets notification mentions', async () => {
        let notification = 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com';
        let mentions = getNotificationMentions(notification);
        const expected = ['studentagnes@gmail.com', 'studentmiche@gmail.com'];
        expect(mentions).to.have.members(expected);
    });
    it('Finds notification recipients', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', ['studentjon@gmail.com', 'studenthon@gmail.com']);
        await classroomController.assignStudentsToTeacher('teacherbob@gmail.com', ['studentagnes@gmail.com', 'studentmiche@gmail.com']);
        const data = {
            'teacher': 'teacherken@gmail.com',
            'notification': 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com',
        };
        const { teacher, notification } = data;
        await classroomController.suspendStudent('studentjon@gmail.com');
        await classroomController.suspendStudent('studentagnes@gmail.com');
        const recipients = await classroomController.findNotificationRecipients(teacher, notification);
        const expected = ['studenthon@gmail.com', 'studentmiche@gmail.com'];
        expect(recipients).to.have.members(expected);
    });
});
