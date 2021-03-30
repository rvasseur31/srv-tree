import { InternalError } from './internal.error';
import { HttpException } from './http.exception';
import { ECode } from '../types/code.enum';

export class BcryptError extends HttpException {
    constructor(message?: string) {
        super(ECode.INTERNAL_SERVER_ERROR, message);
    }
}