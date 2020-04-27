let _store = {
    teacher: {},
    student: {},
    teacher_students: {},
};
export async function insertRecord(tableName, record) {
    const pk_name = `${tableName}_id`;
    const store = _store[tableName];
    const id = record[pk_name];
    store[id] = record;
}
