"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationTokenMissingException = void 0;
const http_exception_1 = require("./http.exception");
const code_enum_1 = require("../types/code.enum");
/**
 * Exception called when authentification failed.
 */
class AuthenticationTokenMissingException extends http_exception_1.HttpException {
    /**
     * Constructor.
     *
     * @param message : response message.
     */
    constructor() {
        super(code_enum_1.ECode.UNAUTHORIZED, 'Authentication token missing');
    }
}
exports.AuthenticationTokenMissingException = AuthenticationTokenMissingException;
//# sourceMappingURL=authentication-token-missing.exeption.js.map