"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const http_exception_1 = require("./http.exception");
const code_enum_1 = require("../types/code.enum");
/**
 * Internal Error.
 */
class InternalError extends http_exception_1.HttpException {
    /**
     * Constructor.
     */
    constructor() {
        super(code_enum_1.ECode.INTERNAL_SERVER_ERROR, "Internal error");
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=InternalError.js.map