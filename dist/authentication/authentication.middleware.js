"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const wrong_authentication_token_exeption_1 = require("../errors/wrong-authentication-token.exeption");
const authentication_token_missing_exeption_1 = require("../errors/authentication-token-missing.exeption");
const authenticationMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_1.getConnection().manager;
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = "Passw0rd";
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret);
            const id = verificationResponse._id;
            const user = yield userRepository.findOne(user_entity_1.User, id);
            userRepository.getId;
            if (user) {
                request.user = user;
                next();
            }
            else {
                next(new wrong_authentication_token_exeption_1.WrongAuthenticationTokenException());
            }
        }
        catch (error) {
            next(new wrong_authentication_token_exeption_1.WrongAuthenticationTokenException());
        }
    }
    else {
        next(new authentication_token_missing_exeption_1.AuthenticationTokenMissingException());
    }
});
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication.middleware.js.map