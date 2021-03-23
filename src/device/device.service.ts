import { EntityManager, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { DeviceState, DeviceStateValue } from "./device-state.enum";
import { DeviceType, DeviceTypePrice } from "./device-type.enum";
import { Device } from "./device.entity";

export class DeviceService {
    private static INSTANCE: DeviceService;
    private manager: EntityManager;

    private constructor() {
        this.manager = getConnection().manager;
    }

    public static getInstance(): DeviceService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new DeviceService();
        }
        return this.INSTANCE;
    }

    async addDevice(name: string, brand: string, year: number, state: DeviceState, type: DeviceType, user_id: number) {
        const user: User = await this.manager.findOne(User, user_id);
        const device: Device = new Device(name, brand, year, state, type, user);
        await this.manager.save(device)
        const plantedTree = user.plantedTree + Math.trunc(DeviceTypePrice.get(type) * DeviceStateValue.get(state) / 15);
        return await UserService.getInstance().update(user_id, {plantedTree});
    }
}
