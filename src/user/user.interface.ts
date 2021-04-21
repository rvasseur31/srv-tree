import { Device } from "../device/device.entity";
import { Donation } from "../donation/donation.entity";
import { UserRole } from "./user-role.enum";

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber: string;
    plantedTree: number;
    donations: Donation[];
    password: string;
    token: string;
    resetPasswordToken: string;
    devices: Device[];
}
