"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
typeorm_1.createConnection(ormconfig_1.default)
    .then((_) => __awaiter(void 0, void 0, void 0, function* () {
    const app = new app_1.default([
        new authentication_controller_1.default()
    ], 5000);
    app.listen();
}))
    .catch((error) => {
    console.log("Error while connecting to the database", error);
    return error;
});
//# sourceMappingURL=server.js.map