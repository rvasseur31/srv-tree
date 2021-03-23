import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "node",
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    logging: false,
};

export = config;
