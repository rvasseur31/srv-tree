import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IContact } from './contact.interface';

@Entity()
export class Contact implements IContact {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    subject: string;

    @Column()
    message: string;

    public constructor(email: string, firstname: string, lastname: string, subject: string, message: string) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.subject = subject;
        this.message = message;
    }
}
