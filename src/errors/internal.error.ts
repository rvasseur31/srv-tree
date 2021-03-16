import { HttpException } from './http.exception';
import { ECode } from '../types/code.enum';

/**
 * Internal Error.
 */
export class InternalError extends HttpException {
    /**
     * Constructor.
     */
    constructor() {
        super(ECode.INTERNAL_SERVER_ERROR, "Internal error");
    }
}