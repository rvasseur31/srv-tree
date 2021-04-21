import { AuthError } from "../errors/authentication.error";
import { ParamError } from "../errors/param.error";
import { User } from "../user/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EntityManager, getConnection } from "typeorm";
import { Utils } from "../common/utils";
import { UserService } from '../user/user.service';
import { ITokenData } from "./token-data.interface";
import { IDataStoredInToken } from "./data-stored-in-token.interface";
import { config } from "../common/environment/config";

export class AuthenticationService {
    private static INSTANCE: AuthenticationService;
    private mananager: EntityManager;

    private constructor() {
        this.mananager = getConnection().manager;
    }

    public static getInstance(): AuthenticationService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new AuthenticationService();
        }
        return this.INSTANCE;
    }

    async register(email: string, password: string, firstName: string, lastName: string) {
        if (Utils.validateEmail(email)) {
            try {
                const encrypted = await bcrypt.hash(password, 10)
                const userToCreate: User = new User(email, encrypted, firstName, lastName);
                const user: User = await this.mananager.save(userToCreate);
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
            const user: User = await this.mananager.findOne(User, { email });
            if (user) {
                try {
                    if (await bcrypt.compare(password, user.password)) {
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
            const user: User = await this.mananager.findOne(User, { email });
            if (user) {
                return UserService.getInstance().update(user.id, {
                    resetPasswordToken: this.createToken(user).token,
                });
            }
        } else {
            throw new ParamError("Wrong email format");
        }
    }

    async updatePassword(token: string, password: string) {
        const user: User = await this.mananager.findOne(User, { resetPasswordToken: token });
        if (user) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    password,
                })
                .where("id = :id", { id: user.id })
                .execute();
            return user;
        }
    }

    public createToken(user: User): ITokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = config.jwt.SECRET;
        const dataStoredInToken: IDataStoredInToken = {
            _id: user.id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
