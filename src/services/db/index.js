import MySQLDriver from 'mysqldriver';
import makeClassroomDB from './classroom';
import { getConfig } from '../../config/index';
const config = getConfig();
const db = createDatabase();
export default {
    classroom: makeClassroomDB(db),
    db,
};

/**
 * @typedef Database
 * @property {function(string, any)} insertRecord
 * @property {function(string, any): Promise<any[]>} getRecords
 * @property {function(string, any): Promise<any>} getRecord
 * @property {function(string, any, any): Promise<any>} updateRecords
 */

function createDatabase() {
    const db = new MySQLDriver({ ...config.mysql });
    return {
        insertRecord: async (table_name, record) => {
            return await db.insertRecord(table_name, record);
        },
        getRecords: async (table_name, where) => {
            return await db.getRecords(table_name, where);
        },
        getRecord: async (table_name, where) => {
            return await db.getRecord(table_name, where);
        },
        /**
         * @returns {Promise<*>}
         */
        updateRecords: async (table_name, record_props, where) => {
            return await db.updateRecords(table_name, record_props, where);
        },
        reset: async () => {
            await db.query('DELETE FROM student');
            await db.query('DELETE FROM teacher');
            await db.query('DELETE FROM teacher_student');
        },
    };
}
