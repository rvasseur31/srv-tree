import { AuthError } from "../errors/authentication.error";
import { ParamError } from "../errors/param.error";
import { EntityManager, getConnection } from "typeorm";
import { Contact } from "./contact.entity";

export class ContactService {
    private static INSTANCE: ContactService;
    private contactRepository: EntityManager;

    private constructor() {
        this.contactRepository = getConnection().manager;
    }

    public static getInstance(): ContactService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new ContactService();
        }
        return this.INSTANCE;
    }

    async contact(email: string, firstname: string, lastname: string, subject: string, content: string) {
        const message: Contact = new Contact(email, firstname, lastname, subject, content);
        return await this.contactRepository.save(message);
    }
}
