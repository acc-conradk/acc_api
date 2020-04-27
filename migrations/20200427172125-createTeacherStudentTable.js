'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = async function (db) {
    const sqls = [
        `CREATE TABLE \`teacher_student\` (
            \`teacher_student_id\` VARCHAR(50) NOT NULL DEFAULT '',
            \`teacher_email\` VARCHAR(255) DEFAULT NULL,
            \`student_email\` VARCHAR(255) DEFAULT NULL,
            \`created_by\` VARCHAR(50) DEFAULT NULL,
            \`created_date\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_by\` VARCHAR(50) DEFAULT NULL,
            \`updated_date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            PRIMARY KEY (\`teacher_student_id\`),
            INDEX \`IX_TEA_STU_tea_stu_id\` (\`teacher_student_id\`),
            INDEX \`IX_TEA_STU_tea_ema\` (\`teacher_email\`),
            INDEX \`IX_TEA_STU_stu_ema\` (\`student_email\`)
            
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    ];
    for (let sql of sqls) {
        try {
            await new Promise((resolve, reject) => {
                db.runSql(sql, () => resolve());
            });
        } catch (err) {
            console.error(err);
        }
    }
    return null;
};

exports.down = async function (db) {
    const sqls = [`DROP TABLE teacher_student`];
    for (let sql of sqls) {
        try {
            await new Promise((resolve, reject) => {
                db.runSql(sql, () => resolve());
            });
        } catch (err) {
            console.error(err);
        }
    }
    return null;
};

exports._meta = {
    'version': 1,
};
