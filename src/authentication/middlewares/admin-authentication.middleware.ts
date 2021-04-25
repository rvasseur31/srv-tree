import { IRequestWithUser } from "../../common/interfaces/request-with-user.interface";
import { NextFunction, Response } from "express";
import { UserRole } from "../../user/user-role.enum";
import { UnauthorizedException } from '../../errors/unauthorized.error';

export const adminAuthenticationMiddleware = async (request: IRequestWithUser, response: Response, next: NextFunction) => {
    if (request.user.role === UserRole.ADMIN) {
        next();
    } else {
        next(new UnauthorizedException());
    }
};
