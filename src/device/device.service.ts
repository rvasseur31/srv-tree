import { EntityManager, getConnection } from "typeorm";
import { DeviceState } from "./device-state.enum";
import { Device } from './device.entity';

export class DeviceService {
    private static INSTANCE: DeviceService;
    private deviceRepository: EntityManager;

    private constructor() {
        this.deviceRepository = getConnection().manager;
    }

    public static getInstance(): DeviceService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new DeviceService();
        }
        return this.INSTANCE;
    }

    async addDevice(name: string, brand: string, year: number, state: DeviceState) {
        const device: Device = new Device(name, brand, year, state);
        return await this.deviceRepository.save(device);
    }
}
