import { ParamError } from "../errors/param.error";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { AuthenticationService } from "./authentication.service";
import { CustomResponse } from "../common/custom-response";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { User } from "../user/user.entity";
import jwt from "jsonwebtoken";

class AuthenticationController implements IBaseController {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }

    private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email && req.body.password) {
            AuthenticationService.getInstance()
                .register(req.body.email, req.body.password)
                .then((user) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User successfully created", user);
                    const tokenData = this.createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email && req.body.password) {
            AuthenticationService.getInstance()
                .login(req.body.email, req.body.password)
                .then((user) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User successfully logged", user);
                    const tokenData = this.createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private logout = (req: express.Request, res: express.Response) => {
        res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
        res.send(ECode.OK);
    };

    private createToken(user: User): ITokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = "Passw0rd";
        const dataStoredInToken: IDataStoredInToken = {
            _id: user.id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default AuthenticationController;
