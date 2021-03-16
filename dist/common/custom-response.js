"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
/**
 * Custom response class.
 */
class CustomResponse {
    /**
     * Constructor.
     */
    constructor(status, code, message, body) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.body = body;
    }
    /**
     * To string method definition.
     */
    toString() {
        return "Custom response : [ status : " + this.status
            + " code : " + this.code
            + " message : " + this.message
            + " body : " + this.body + "]";
    }
}
exports.CustomResponse = CustomResponse;
//# sourceMappingURL=custom-response.js.map