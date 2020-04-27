import { assert, expect } from 'chai';
import testServices from './services';
import makeClassroomController from '../controllers/classroom';
const classroomController = makeClassroomController(testServices);
describe('Classroom', async () => {
    it('Assign students to teacher', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', ['studentjon@gmail.com', 'studenthon@gmail.com']);
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
});
