import { IUser } from "./user.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    public constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }
}
