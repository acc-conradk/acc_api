import * as dotenv from 'dotenv';
dotenv.config();
export function getConfig() {
    return {
        port: process.env.PORT,
    };
}
