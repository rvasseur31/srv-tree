import { Environment } from "./environment.interface";

export const development: Environment = {
    app: {
        APP_PORT: 5000,
    },
    db: {
        DB_TYPE: "mysql",
        DB_HOST: "localhost",
        DB_PORT: 3306,
        DB_USERNAME: "root",
        DB_PASSWORD: "",
        DB_DATABASE: "node"
    }
}