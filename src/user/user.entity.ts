import { IUser } from "./user.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    // Hide password on select
    @Column({ select: false })
    public password: string;

    @Column()
    public token: string;

    @Column()
    public resetPasswordToken: string;

    public constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }
}
