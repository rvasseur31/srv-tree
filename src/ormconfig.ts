import { ConnectionOptions } from "typeorm";
import { config } from './common/environment/config';

export const typeORMConfig: ConnectionOptions = {
    type: config.db.DB_TYPE,
    host: config.db.DB_HOST,
    port: config.db.DB_PORT,
    username: config.db.DB_USERNAME,
    password: config.db.DB_PASSWORD,
    database: config.db.DB_DATABASE,
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    logging: false,
};
