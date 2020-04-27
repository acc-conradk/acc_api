import services from '../services';
import makeClassroomController from './classroom';
export default {
    classroom: makeClassroomController(services),
};
