import { CustomResponse } from "../common/custom-response";
import express from "express";
import IBaseController from "../common/controllers/base.controller.interface";
import { TreeService } from './tree.service';
import { EStatus } from "../types/status.enum";
import { ECode } from "../types/code.enum";

class TreeController implements IBaseController {
    public path = "/tree";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/get-all`, this.getAllPlantedTree);
    }

    private getAllPlantedTree = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        TreeService.getInstance()
            .getAllPlantedTree()
            .then((plantedTree) => {
                customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "", plantedTree);
                res.send(customResponse);
            })
            .catch((error) => {
                next(error);
            });
    };
}

export default TreeController;
