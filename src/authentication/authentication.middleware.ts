// import { IRequestWithUser } from "../common/interfaces/request-with-user.interface";
// import { NextFunction, Response } from "express";
// import * as jwt from "jsonwebtoken";
// import { User } from '../user/user.entity';
// import { getConnection } from "typeorm";
// import { WrongAuthenticationTokenException } from "../errors/wrong-authentication-token.exeption";
// import { AuthenticationTokenMissingException } from "../errors/authentication-token-missing.exeption";
// import { IDataStoredInToken } from "./data-stored-in-token.interface";

// export const authenticationMiddleware = async (request: IRequestWithUser, response: Response, next: NextFunction) => {
//     const userRepository = getConnection().manager;
//     const cookies = request.cookies;
//     if (cookies && cookies.Authorization) {
//         const secret = "Passw0rd";
//         try {
//             const verificationResponse = jwt.verify(cookies.Authorization, secret) as IDataStoredInToken;
//             const id = verificationResponse._id;
//             const user = await userRepository.findOne(User, id);
//             userRepository.getId
//             if (user) {
//                 request.user = user;
//                 next();
//             } else {
//                 next(new WrongAuthenticationTokenException());
//             }
//         } catch (error) {
//             next(new WrongAuthenticationTokenException());
//         }
//     } else {
//         next(new AuthenticationTokenMissingException());
//     }
// };
