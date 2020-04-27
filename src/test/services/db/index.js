import makeClassroomDB from '../../../services/db/classroom';
import * as db from '../../db';
export default {
    classroom: makeClassroomDB(db),
};

/**
 * @typedef Database
 * @property {function(string, any)} insertRecord
 */
