import { IUser } from "./user.interface";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.enum";
import { Donation } from "../donation/donation.entity";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column({
        nullable: true,
    })
    public firstname: string;

    @Column({
        nullable: true,
    })
    public lastname: string;

    @Column({
        default: UserRole.USER,
    })
    public role: UserRole;

    @Column({
        unique: true,
        nullable: true,
    })
    public phoneNumber: string;

    @Column({
        nullable: true,
    })
    public plantedTree: number;

    @OneToMany(() => Donation, donation => donation.user)
    donations: Donation[];

    @Column()
    public password: string;

    @Column({
        unique: true,
        nullable: true,
    })
    public token: string;

    @Column({
        unique: true,
        nullable: true,
    })
    public resetPasswordToken: string;

    public constructor(email?: string, password?: string) {
        this.email = email;
        this.password = password;
    }
}
