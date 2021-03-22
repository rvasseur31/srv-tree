import { AuthError } from "../errors/authentication.error";
import { ParamError } from "../errors/param.error";
import { User } from "../user/user.entity";
import bcrypt from "bcrypt";
import { EntityManager, getConnection } from "typeorm";
import { Utils } from "../common/utils";

export class AuthenticationService {
    private static INSTANCE: AuthenticationService;
    private userRepository: EntityManager;

    private constructor() {
        this.userRepository = getConnection().manager;
    }

    public static getInstance(): AuthenticationService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new AuthenticationService();
        }
        return this.INSTANCE;
    }

    async register(email: string, password: string) {
        if (Utils.validateEmail(email)) {
            try {
                const userToCreate: User = new User(email, bcrypt.hashSync(password, 10));
                const user: User = await this.userRepository.save(userToCreate);
                return user;
            } catch (error) {
                throw error;
            }
        } else {
            throw new ParamError("Wrong email format");
        }
    }

    async login(email: string, password: string) {
        if (Utils.validateEmail(email)) {
            const user: User = await this.userRepository.findOne(User, { email: email });
            if (user) {
                try {
                    if (bcrypt.compareSync(password, user.password)) {
                        return user;
                    } else {
                        throw new AuthError("Password doesn't match");
                    }
                } catch (error) {
                    throw error;
                }
            } else {
                throw new AuthError("Email doesn't exist in database");
            }
        } else {
            throw new ParamError("Wrong email format");
        }
    }

    async resetPassword(email: string) {
        if (Utils.validateEmail(email)) {
            const user: User = await this.userRepository.findOne(User, { email: email });
            if (user) {
                await getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        resetPasswordToken: Math.random().toString(36),
                    })
                    .where("id = :id", { id: user.id })
                    .execute();
                return await this.userRepository.findOne(User, { email: email });
            }
        } else {
            throw new ParamError("Wrong email format");
        }
    }

    async updatePassword(token: string, password: string) {
        const user: User = await this.userRepository.findOne(User, { resetPasswordToken: token });
        if (user) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    password: password,
                })
                .where("id = :id", { id: user.id })
                .execute();
            return user;
        }
    }
}
