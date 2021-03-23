import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { DeviceState } from "./device-state.enum";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public brand: string;

    @Column()
    public year: number;

    @Column()
    public state: DeviceState;

    @ManyToOne(type => User, user => user.devices, {
        nullable: true
    })
    user: User;

    public constructor(name: string, brand: string, year: number, state: DeviceState) {
        this.name = name;
        this.brand = brand;
        this.year = year;
        this.state = state;
    }
}
