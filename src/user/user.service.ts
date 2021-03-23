import { AuthError } from "../errors/authentication.error";
import { ParamError } from "../errors/param.error";
import { User } from "../user/user.entity";
import bcrypt from "bcrypt";
import { EntityManager, getConnection } from "typeorm";
import { Utils } from "../common/utils";

export class UserService {
    private static INSTANCE: UserService;
    private userRepository: EntityManager;

    private constructor() {
        this.userRepository = getConnection().manager;
    }

    public static getInstance(): UserService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new UserService();
        }
        return this.INSTANCE;
    }

    async findAll() {
        try {
            const users: User[] = await this.userRepository.find(User);
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            const user: User = await this.userRepository.findOne(User, id, { relations: ["donations"] });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: any) {
        try {
            const user: User = await this.userRepository.findOne(User, id);
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    email: data.email,
                })
                .where("id = :id", { id })
                .execute();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await this.userRepository.delete(User, id);
        } catch (error) {
            throw error;
        }
    }
}