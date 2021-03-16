"use strict";
const config = {
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
module.exports = config;
//# sourceMappingURL=ormconfig.js.map