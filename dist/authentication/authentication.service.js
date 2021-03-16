"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const authentication_error_1 = require("../errors/authentication.error");
const param_error_1 = require("../errors/param.error");
const user_entity_1 = require("../user/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const utils_1 = require("../common/utils");
class AuthenticationService {
    constructor() {
        this.userRepository = typeorm_1.getConnection().manager;
    }
    static getInstance() {
        if (this.INSTANCE == null) {
            this.INSTANCE = new AuthenticationService();
        }
        return this.INSTANCE;
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToCreate = new user_entity_1.User(email, bcrypt_1.default.hashSync(password, 10));
                const user = yield this.userRepository.save(userToCreate);
                user.password = undefined;
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.Utils.validateEmail(email)) {
                const user = yield this.userRepository.findOne(user_entity_1.User, { email: email });
                if (user) {
                    try {
                        if (bcrypt_1.default.compareSync(password, user.password)) {
                            user.password = undefined;
                            return user;
                        }
                        else {
                            throw new authentication_error_1.AuthError("Password doesn't match");
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                }
                else {
                    throw new authentication_error_1.AuthError("Email doesn't exist in database");
                }
            }
            else {
                throw new param_error_1.ParamError("Wrong email format");
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map