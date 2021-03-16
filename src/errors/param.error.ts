import { HttpException } from './http.exception';
import { ECode } from '../types/code.enum';

/**
 * Error class, handle wrong param in request.
 */
export class ParamError extends HttpException {
    /**
     * Constructor.
     *
     * @param message
     * @param code
     * @param status
     */
    constructor(message?: string) {
        super(ECode.PRECONDITION_FAILED, message);
    }
}