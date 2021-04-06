export interface Environment {
    app: {
        APP_PORT: number
    }
    db: {
        DB_TYPE: "mysql" /*ConnectionOptions["type"]*/ 
        DB_HOST: string
        DB_PORT: number
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_DATABASE: string
    },
    jwt: {
        SECRET: string
    },
    logger: {
        level: string
    }
}