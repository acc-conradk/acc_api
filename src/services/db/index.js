import makeClassroomDB from './classroom';
const db = {};
export default {
    classroom: makeClassroomDB(db),
};

/**
 * @typedef Database
 * @property {function(string, any)} insertRecord
 * @property {function(string, any): Promise<any>} getRecords
 */
