import express from "express";
import cors from "cors";
import helmet from "helmet"
import cookieParser from 'cookie-parser';
import IBaseController from "./common/controllers/base.controller.interface";
import { errorMiddleware } from './errors/middlewares/error.middleware';
import { CustomResponse } from './common/custom-response';
import { EStatus } from './types/status.enum';
import { ECode } from './types/code.enum';
import { Logger } from "./common/log/logger";
import { expressLogger } from './common/log/express.logger';

class App {
    public app: express.Application;
    public port: number;

    constructor(apiControllers: IBaseController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeApiControllers(apiControllers);
        this.initializeErrorMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(expressLogger);
    }

    private initializeApiControllers(controllers: IBaseController[]) {
        this.app.get("/", (req, res) => {
            res.json(new CustomResponse(EStatus.SUCCESS, ECode.OK, "api works", null));
        })
        controllers.forEach((controller: IBaseController) => {
            this.app.use("/api/", controller.router);

        });
    }

    private initializeErrorMiddlewares() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            Logger.debug(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
