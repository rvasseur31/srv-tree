import AuthenticationController from "./authentication/authentication.controller";
import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import { typeORMConfig } from "./ormconfig";
import UserController from "./user/user.controller";
import ContactController from './contact/contact.controller';
import DonationController from "./donation/donation.controller";
import DeviceController from './device/device.controller';
import TreeController from "./tree/tree.controller";
import { config } from './common/environment/config';
import { Logger } from "./common/log/logger";

createConnection(typeORMConfig)
    .then(async (_) => {
        const app = new App([
            new AuthenticationController(),
            new UserController(),
            new ContactController(),
            new DonationController(),
            new DeviceController(),
            new TreeController()
        ], config.app.APP_PORT);
        app.listen();
    })
    .catch((error) => {
        Logger.error("Error while connecting to the database", error);
        return error;
    });
