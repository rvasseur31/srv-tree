"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const http_exception_1 = require("./http.exception");
const code_enum_1 = require("../types/code.enum");
/**
 * Exception called when authentification failed.
 */
class AuthError extends http_exception_1.HttpException {
    /**
     * Constructor.
     *
     * @param message : response message.
     */
    constructor(message) {
        super(code_enum_1.ECode.FORBIDDEN, message);
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=authentication.error.js.map