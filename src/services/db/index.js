import makeClassroomDB from './classroom';
const db = {};
export default {
    classroom: makeClassroomDB(db),
};
