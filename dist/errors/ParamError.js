"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamError = void 0;
const http_exception_1 = require("./http.exception");
const code_enum_1 = require("../types/code.enum");
/**
 * Error class, handle wrong param in request.
 */
class ParamError extends http_exception_1.HttpException {
    /**
     * Constructor.
     *
     * @param message
     * @param code
     * @param status
     */
    constructor(message) {
        super(code_enum_1.ECode.PRECONDITION_FAILED, message);
    }
}
exports.ParamError = ParamError;
//# sourceMappingURL=ParamError.js.map