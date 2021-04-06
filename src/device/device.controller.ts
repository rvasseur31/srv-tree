import { CustomResponse } from "../common/custom-response";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { DeviceService } from "./device.service";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { ParamError } from "../errors/param.error";
import { User } from "../user/user.entity";
import { authenticationMiddleware } from "../authentication/authentication.middleware";
import { IRequestWithUser } from '../common/interfaces/request-with-user.interface';

class DeviceController implements IBaseController {
    public path = "/device";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/add-device`, authenticationMiddleware, this.addDevice);
    }

    private addDevice = async (req: IRequestWithUser, res: express.Response, next: express.NextFunction) => {
        const body = req.body;
        let customResponse: CustomResponse;
        if (body.name && body.brand && body.year && body.state && body.type && req.user.id) {
            DeviceService.getInstance()
                .addDevice(body.name, body.brand, body.year, body.state, body.type, req.user.id)
                .then((user: User) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "device sent", user);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id_user, name, brand, year, state or type must be specified"));
        }
    };
}

export default DeviceController;
