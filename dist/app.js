"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./errors/middlewares/error.middleware");
const custom_response_1 = require("./common/custom-response");
const status_enum_1 = require("./types/status.enum");
const code_enum_1 = require("./types/code.enum");
class App {
    constructor(apiControllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeApiControllers(apiControllers);
        this.initializeErrorMiddlewares();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(cookie_parser_1.default());
    }
    initializeApiControllers(controllers) {
        this.app.get("/", (req, res) => {
            res.json(new custom_response_1.CustomResponse(status_enum_1.EStatus.SUCCESS, code_enum_1.ECode.OK, "api works", null));
        });
        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }
    initializeErrorMiddlewares() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map