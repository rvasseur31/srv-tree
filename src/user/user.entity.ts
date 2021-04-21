import { IUser } from "./user.interface";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.enum";
import { Donation } from "../donation/donation.entity";
import { Device } from '../device/device.entity';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column({
        nullable: true,
    })
    public firstName: string;

    @Column({
        nullable: true,
    })
    public lastName: string;

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
        default: 0
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

    @OneToMany(type => Device, device => device.user)
    devices: Device[];

    public constructor(email: string, password: string, firstName: string, lastName: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
