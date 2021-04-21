import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IContact } from './contact.interface';

@Entity()
export class Contact implements IContact {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    subject: string;

    @Column()
    message: string;

    public constructor(email: string, firstName: string, lastName: string, subject: string, message: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.subject = subject;
        this.message = message;
    }
}
