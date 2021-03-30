import { ParamError } from "../errors/param.error";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { CustomResponse } from "../common/custom-response";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { User } from "../user/user.entity";
import { UserService } from "./user.service";
import { authenticationMiddleware } from '../authentication/authentication.middleware';

class UserController implements IBaseController {
    public path = "/user";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authenticationMiddleware, this.findAll);
        this.router.get(`${this.path}/one`, authenticationMiddleware, this.findOne);
        this.router.put(`${this.path}/update`, authenticationMiddleware, this.update);
        this.router.delete(`${this.path}`, authenticationMiddleware, this.delete);
    }

    private findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        UserService.getInstance()
            .findAll()
            .then((users) => {
                customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "All users fetched", users);
                res.send(customResponse);
            })
            .catch((error) => {
                next(error);
            });
    };

    private findOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.id) {
            UserService.getInstance()
                .findOne(req.body.id)
                .then((user: User) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User fetched", user);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id must be specified"));
        }
    };

    private update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.id) {
            UserService.getInstance()
                .update(req.body.id, req.body.data)
                .then((user: User) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User updated", user);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id must be specified"));
        }
    };

    private delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.id) {
            UserService.getInstance()
                .delete(req.body.id)
                .then(() => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User deleted", null);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id must be specified"));
        }
    };
}

export default UserController;