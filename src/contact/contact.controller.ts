import { CustomResponse } from "../common/custom-response";
import { ParamError } from "../errors/param.error";
import express from "express";
import { ECode } from "../types/code.enum";
import { EStatus } from "../types/status.enum";
import IBaseController from "../common/controllers/base.controller.interface";
import { ContactService } from "./contact.service";
import { getMailOptions } from "../mail/mail-options";
import { transporter } from "../mail/transporter";
import { SentMessageInfo } from "nodemailer";
import { Logger } from "../common/log/logger";

class ContactController implements IBaseController {
    public path = "/contact";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/`, this.contact);
    }

    private contact = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let customResponse: CustomResponse;
        const body = req.body;
        if (body.email && body.firstname && body.lastname && body.subject && body.message) {
            ContactService.getInstance()
                .contact(body.email, body.firstname, body.lastname, body.subject, body.message)
                .then(async (contact) => {
                    transporter.sendMail(
                        await getMailOptions(
                            ["test@tree.com"],
                            "Nouveau message",
                            { subject: body.subject, message: body.message },
                            "./templates/contact.handlebars"
                        ),
                        (error: Error, info: SentMessageInfo) => {
                            if (error) {
                                customResponse = new CustomResponse(EStatus.FAIL, ECode.INTERNAL_SERVER_ERROR, "Email not sended", error);
                                Logger.error(error);
                            } else {
                                customResponse = new CustomResponse(EStatus.SUCCESS, ECode.OK, "Message successfully sended", contact);
                            }
                            res.send(customResponse);
                        }
                    );
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("All params have to be specified"));
        }
    };
}

export default ContactController;
