import {Injectable, Logger} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import * as process from "process";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                Logger.debug(`req.cookies : ${JSON.stringify(req.cookies['refreshToken'])}`)

                return req.cookies['refreshToken']
            },
            secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
            ignoreExpiration: true
        });
    }

    async validate(payload: any): Promise<any> {
        Logger.debug(JSON.stringify(payload))
        return {
            email: payload.email,
            userNo: payload.userNo,
            userCl: payload.userCl,
        }

    }
}