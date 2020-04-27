let _store = {
    teacher: {},
    student: {},
    teacher_student: {},
};
export async function insertRecord(table_name, record) {
    const pk_name = `${table_name}_id`;
    const store = _store[table_name];
    const id = record[pk_name];
    store[id] = record;
}

export async function getRecords(table_name, where) {
    const store = _store[table_name];
    let records = [];
    for (let key in store) {
        let record = store[key];
        if (recordMatchesWhere(record, where)) {
            records.push(record);
        }
    }
    return records;
}

export async function getRecord(table_name, where) {
    const store = _store[table_name];
    for (let id in store) {
        let record = store[id];
        if (recordMatchesWhere(record, where)) {
            return record;
        }
    }
    return null;
}

export async function updateRecord(table_name, record_id, record_props) {
    const store = _store[table_name];
    let record = store[record_id];
    record = {
        ...record,
        ...record_props,
    };
    store[record_id] = record;
}
/**
 * Checks if a record matches a where condition
 * @param {*} record
 * @param {*} where
 */
function recordMatchesWhere(record, where) {
    const condition_count_max = Object.keys(where).length;
    let condition_count = 0;
    for (let key in where) {
        let val = where[key];
        switch (typeof val) {
            case 'object': {
                //Check that the values match at least one of the items in the provided array
                if (Array.isArray(val)) {
                    let needle = record[key];
                    if (val.includes(needle)) {
                        condition_count++;
                    }
                }
                //Check for an exact match
                else if (record[key] === val) {
                    condition_count++;
                }
                break;
            }
            default: {
                //Check for an exact matc
                if (record[key] === val) {
                    condition_count++;
                }
                break;
            }
        }
    }
    //Insert the record if the conditions match
    if (condition_count === condition_count_max) {
        return true;
    }
    return false;
}
