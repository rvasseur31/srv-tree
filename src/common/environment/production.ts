import { Environment } from "./environment.interface";

export const production: Environment = {
    app: {
        APP_PORT: 80,
    },
    db: {
        DB_TYPE: "mysql",
        DB_HOST: "localhost",
        DB_PORT: 3306,
        DB_USERNAME: "root",
        DB_PASSWORD: "",
        DB_DATABASE: "node"
    },
    logger: {
        level: "info"
    }
}