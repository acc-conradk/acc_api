import chai from 'chai';
import testServices from './services';
import makeClassroomController from '../controllers/classroom';
const classroomController = makeClassroomController(testServices);
describe('/api/register', async () => {
    it('Adds user data', async () => {
        await classroomController.assignStudentsToTeacher('teacherken@gmail.com', ['studentjon@gmail.com', 'studenthon@gmail.com']);
    });
});
