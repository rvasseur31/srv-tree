import { EntityManager, getConnection } from "typeorm";
import { Contact } from "./contact.entity";

export class ContactService {
    private static INSTANCE: ContactService;
    private manager: EntityManager;

    private constructor() {
        this.manager = getConnection().manager;
    }

    public static getInstance(): ContactService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new ContactService();
        }
        return this.INSTANCE;
    }

    async contact(email: string, firstName: string, lastName: string, subject: string, content: string) {
        const message: Contact = new Contact(email, firstName, lastName, subject, content);
        return await this.manager.save(message);
    }
}
