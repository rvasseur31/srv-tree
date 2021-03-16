"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongAuthenticationTokenException = void 0;
const http_exception_1 = require("./http.exception");
const code_enum_1 = require("../types/code.enum");
/**
 * Exception called when authentification failed.
 */
class WrongAuthenticationTokenException extends http_exception_1.HttpException {
    /**
     * Constructor.
     *
     * @param message : response message.
     */
    constructor() {
        super(code_enum_1.ECode.UNAUTHORIZED, 'Wrong authentication token');
    }
}
exports.WrongAuthenticationTokenException = WrongAuthenticationTokenException;
//# sourceMappingURL=wrong-authentication-token.exeption.js.map