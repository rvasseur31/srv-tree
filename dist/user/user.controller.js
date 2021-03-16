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
const custom_response_1 = require("../common/custom-response");
const status_enum_1 = require("../types/status.enum");
const code_enum_1 = require("../types/code.enum");
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.path = "/user";
        this.router = express_1.default.Router();
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            user_service_1.UserService.getInstance()
                .findAll()
                .then((users) => {
                customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "All users fetched", users);
                res.send(customResponse);
            })
                .catch((error) => {
                next(error);
            });
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            if (req.body.id) {
                user_service_1.UserService.getInstance()
                    .findOne(req.body.id)
                    .then((user) => {
                    customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "User fetched", user);
                    res.send(customResponse);
                })
                    .catch((error) => {
                    next(error);
                });
            }
            else {
                next(new param_error_1.ParamError("id must be specified"));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            if (req.body.id) {
                user_service_1.UserService.getInstance()
                    .update(req.body.id, req.body.data)
                    .then((user) => {
                    customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "User updated", user);
                    res.send(customResponse);
                })
                    .catch((error) => {
                    next(error);
                });
            }
            else {
                next(new param_error_1.ParamError("id must be specified"));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let customResponse;
            if (req.body.id) {
                user_service_1.UserService.getInstance()
                    .delete(req.body.id)
                    .then(() => {
                    customResponse = new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "User deleted", null);
                    res.send(customResponse);
                })
                    .catch((error) => {
                    next(error);
                });
            }
            else {
                next(new param_error_1.ParamError("id must be specified"));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.findAll);
        this.router.get(`${this.path}/one`, this.findOne);
        this.router.put(`${this.path}/update`, this.update);
        this.router.delete(`${this.path}`, this.delete);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map