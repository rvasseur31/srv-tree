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
        const body = req.body;
        if (body.email && body.firstname && body.lastname && body.subject && body.message) {
            ContactService.getInstance()
                .contact(body.email, body.firstname, body.lastname, body.subject, body.message)
                .then((contact) => {
                    transporter.sendMail(getMailOptions(["test@tree.com"], body.subject, body.message), (error: Error, info: SentMessageInfo) => {
                        if (error) {
                            return console.log(error);
                        }
                    });
                    res.send(new CustomResponse(EStatus.SUCCESS, ECode.OK, "Message successfully sended", contact));
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new ParamError("Email and password have to be specified"));
        }
    };
}

export default ContactController;
