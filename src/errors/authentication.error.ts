import { HttpException } from './http.exception';
import { ECode } from '../types/code.enum';

/**
 * Exception called when authentification failed.
 */
export class AuthError extends HttpException {
    /**
     * Constructor.
     *
     * @param message : response message.
     */
    constructor(message?: string) {
        super(ECode.FORBIDDEN, message);
    }
}