import {Injectable, Logger, Req} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../../users/users.service";
import * as process from "process";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(
        private readonly userService: UsersService, //
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
            passReqToCallback: true,
            ignoreExpiration: true
        });
    }

    async validate(req, payload): Promise<any> {
        const authorization: string = req.headers['authorization'].split(' ')[1];

        const user = await this.userService.findByUserNo(payload.userNo);

        if (authorization === user.accessToken) {

            return {
                email: payload.email,
                userNo: payload.userNo,
                userCl: payload.userCl,
            }
        } else return undefined

    }
}