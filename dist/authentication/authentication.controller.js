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
const param_error_1 = require("../errors/param.error");
const express_1 = __importDefault(require("express"));
const authentication_service_1 = require("./authentication.service");
const custom_response_1 = require("../common/custom-response");
const status_enum_1 = require("../types/status.enum");
const code_enum_1 = require("../types/code.enum");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationController {
    constructor() {
        this.path = "/auth";
        this.router = express_1.default.Router();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            if (req.body.email && req.body.password) {
                authentication_service_1.AuthenticationService.getInstance()
                    .register(req.body.email, req.body.password)
                    .then((user) => {
                    customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "User successfully created", user);
                    const tokenData = this.createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    res.send(customResponse);
                })
                    .catch((error) => {
                    next(error);
                });
            }
            else {
                next(new param_error_1.ParamError("Email and password have to be specified"));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            if (req.body.email && req.body.password) {
                authentication_service_1.AuthenticationService.getInstance()
                    .login(req.body.email, req.body.password)
                    .then((user) => {
                    customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "User successfully logged", user);
                    const tokenData = this.createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    res.send(customResponse);
                })
                    .catch((error) => {
                    next(error);
                });
            }
            else {
                next(new param_error_1.ParamError("Email and password have to be specified"));
            }
        });
        this.logout = (req, res) => {
            res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            res.send(code_enum_1.ECode.OK);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }
    createToken(user) {
        const expiresIn = 60 * 60; // an hour
        const secret = "Passw0rd";
        const dataStoredInToken = {
            _id: user.id,
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map