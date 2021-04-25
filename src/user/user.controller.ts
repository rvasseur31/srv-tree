import { ParamError } from "../errors/param.error";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { CustomResponse } from "../common/custom-response";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { User } from "../user/user.entity";
import { UserService } from "./user.service";
import { authenticationMiddleware } from '../authentication/middlewares/authentication.middleware';
import { IRequestWithUser } from '../common/interfaces/request-with-user.interface';
import { adminAuthenticationMiddleware } from '../authentication/middlewares/admin-authentication.middleware';

class UserController implements IBaseController {
    public path = "/user";
    public router = express.Router();
    public userRouter = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.path, authenticationMiddleware, this.userRouter);
        this.userRouter.post(`/data`, this.findData);
        this.userRouter.get('/', adminAuthenticationMiddleware, this.findAll);
        this.userRouter.get('/one', adminAuthenticationMiddleware, this.findOne);
        this.userRouter.put('/update', adminAuthenticationMiddleware, this.update);
        this.userRouter.delete('/', adminAuthenticationMiddleware, this.delete);
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

    private findData = async (req: IRequestWithUser, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.params) {
            UserService.getInstance()
                .findData(req.user.id)
                .then((data) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "Data fetched", data);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id must be specified"));
        }
    };

    private findOne = async (req: IRequestWithUser, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.user.id) {
            UserService.getInstance()
                .findOne(req.user.id)
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

    private update = async (req: IRequestWithUser, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.user.id) {
            UserService.getInstance()
                .update(req.user.id, req.body.data)
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

    private delete = async (req: IRequestWithUser, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.user.id) {
            UserService.getInstance()
                .delete(req.user.id)
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