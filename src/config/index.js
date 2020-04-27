import * as dotenv from 'dotenv';
dotenv.config();
export function getConfig() {
    return {
        port: process.env.PORT,
        mysql: {
            database: process.env.MYSQL_DATABASE,
            password: process.env.MYSQL_PASSWORD,
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
        },
    };
}
