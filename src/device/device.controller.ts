import { CustomResponse } from "../common/custom-response";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";

class DeviceController implements IBaseController {
    public path = "/device";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/add-device`, this.addDevice);
    }

    private addDevice = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        const body = req.body;
    };
}

export default DeviceController;
