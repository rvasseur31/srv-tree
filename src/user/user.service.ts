import { User } from "../user/user.entity";
import { EntityManager, getConnection } from "typeorm";

export class UserService {
    private static INSTANCE: UserService;
    private manager: EntityManager;

    private constructor() {
        this.manager = getConnection().manager;
    }

    public static getInstance(): UserService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new UserService();
        }
        return this.INSTANCE;
    }

    async findAll() {
        try {
            const users: User[] = await this.manager.find(User, { relations: ["donations"] });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const user: User = await this.manager.findOne(User, id, { relations: ["donations"] });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: any) {
        try {
            const user: User = await this.manager.findOne(User, id);
            await this.manager.update(User, id, data)
            return await this.manager.findOne(User, id);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await this.manager.delete(User, id);
        } catch (error) {
            throw error;
        }
    }
}