import AuthenticationController from "./authentication/authentication.controller";
import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import config from "./ormconfig";
import UserController from "./user/user.controller";

createConnection(config)
    .then(async (_) => {
        const app = new App([
            new AuthenticationController(),
            new UserController()
        ], 5000);
        app.listen();
    })
    .catch((error) => {
        console.log("Error while connecting to the database", error);
        return error;
    });
