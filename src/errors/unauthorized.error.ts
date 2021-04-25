import { HttpException } from './http.exception';
import { ECode } from '../types/code.enum';

/**
 * Exception called when authentification failed.
 */
export class UnauthorizedException  extends HttpException {
    /**
     * Constructor.
     *
     * @param message : response message.
     */
    constructor() {
        super(ECode.UNAUTHORIZED, 'You must have the role Admin');
    }
}