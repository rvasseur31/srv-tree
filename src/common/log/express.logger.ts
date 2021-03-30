import expressWinston from "express-winston";
import { Logger } from "./logger";

export const expressLogger = expressWinston.logger({
    winstonInstance: Logger,
    msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
});
