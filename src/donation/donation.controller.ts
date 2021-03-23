import { CustomResponse } from "../common/custom-response";
import { ParamError } from "../errors/param.error";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { DonationService } from "./donation.service";
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";
import { User } from "../user/user.entity";
import { authenticationMiddleware } from '../authentication/authentication.middleware';

class DonationController implements IBaseController {
    public path = "/donation";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authenticationMiddleware)
        this.router.post(`${this.path}/`, this.donation);
    }

    private donation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        if (req.body.user_id && req.body.amount) {
            DonationService.getInstance()
                .newDonation(req.body.user_id, req.body.amount)
                .then((user: User) => {
                    customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "donation done", user);
                    res.send(customResponse);
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("id or amount must be specified"));
        }
    };
}

export default DonationController;
