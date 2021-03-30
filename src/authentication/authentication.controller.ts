import { ParamError } from "../errors/param.error";
import { NextFunction, Router, Request, Response } from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { AuthenticationService } from "./authentication.service";
import { CustomResponse } from "../common/custom-response";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { User } from "../user/user.entity";
import { ITokenData } from "./token-data.interface";
import { transporter } from "../mail/transporter";
import { getMailOptions } from "../mail/mail-options";
import { SentMessageInfo } from "nodemailer";
import { UserService } from "../user/user.service";
import { Logger } from "../common/log/logger";

class AuthenticationController implements IBaseController {
    public path = "/auth";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/logout`, this.logout);
        this.router.post(`${this.path}/reset-password`, this.resetPassword);
        this.router.post(`${this.path}/update-password`, this.updatePassword);
    }

    private register = async (req: Request, res: Response, next: NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email && req.body.password) {
            AuthenticationService.getInstance()
                .register(req.body.email, req.body.password)
                .then(async (user) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User successfully created", user);
                    const tokenData = AuthenticationService.getInstance().createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    await UserService.getInstance().update(user.id, {token : tokenData.token})
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private login = async (req: Request, res: Response, next: NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email && req.body.password) {
            AuthenticationService.getInstance()
                .login(req.body.email, req.body.password)
                .then(async (user: User) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User successfully logged", user);
                    const tokenData = AuthenticationService.getInstance().createToken(user);
                    res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    await UserService.getInstance().update(user.id, {token : tokenData.token})
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private logout = (req: Request, res: Response) => {
        res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
        res.send(ECode.OK);
    };

    private resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email) {
            AuthenticationService.getInstance()
                .resetPassword(req.body.email)
                .then((user) => {
                    transporter.sendMail(
                        getMailOptions(
                            ["test@tree.com"],
                            "Changement de mot de passe",
                            { link: `http://localhost:4200/reset-password?token=${user.resetPasswordToken}` },
                            "./templates/requestResetPassword.handlebars"
                        ),
                        (error: Error, info: SentMessageInfo) => {
                            if (error) {
                                customResponse = new CustomResponse(EStatus.FAIL, ECode.INTERNAL_SERVER_ERROR, "Email not sended", error);
                                Logger.error(error);
                            } else {
                                customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "Email successfully sended", user);
                            }
                        }
                    );
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private updatePassword = async (req: Request, res: Response, next: NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.email) {
            AuthenticationService.getInstance()
                .resetPassword(req.body.email)
                .then((user) => {
                    transporter.sendMail(
                        getMailOptions(
                            ["test@tree.com"],
                            "Changement de mot de passe",
                            { name: user.email },
                            "./templates/requestResetPassword.handlebars"
                        ),
                        (error: Error, info: SentMessageInfo) => {
                            if (error) {
                                Logger.error(error);
                                customResponse = new CustomResponse(EStatus.FAIL, ECode.INTERNAL_SERVER_ERROR, "Email not sended", error);
                            } else {
                                customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "User password successfully updated", user);
                            }
                        }
                    );
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };

    private createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default AuthenticationController;
