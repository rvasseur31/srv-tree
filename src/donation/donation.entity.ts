import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IDonation } from './donation.interface';
import { IUser } from "../user/user.interface";
import { User } from "../user/user.entity";

@Entity()
export class Donation implements IDonation {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public amount: number;

    @Column()
    public dateTime: Date;

    @ManyToOne(() => User, user => user.donations)
    user: User;

    public constructor(amount: number, dateTime: Date) {
        this.amount = amount;
        this.dateTime = dateTime;
    }
}
