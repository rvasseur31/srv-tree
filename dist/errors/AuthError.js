"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const HttpException_1 = require("./HttpException");
const code_enum_1 = require("../types/code.enum");
/**
 * Exception called when authentification failed.
 */
class AuthError extends HttpException_1.HttpException {
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
//# sourceMappingURL=AuthError.js.map