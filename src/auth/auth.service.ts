import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {Users} from "../common/entity/users.entity";
import {Response} from 'express';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {

    constructor(
        // private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    //Access Token 발급
    getAccessToken({user}: { user: Users }): string {
        return this.jwtService.sign({
                email: user.email,
                userNo: user.userNo,
                userCl: user.userCl.clDtlCode
            },
            {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '5m'
            }
        );
    }


    setRefreshToken({user, res}: { user: Users, res: Response }): string {
        const refreshToken = this.jwtService.sign(
            {
                email: user.email,
                userNo: user.userNo,
                userCl: user.userCl.clDtlCode
            },
            {
                secret: process.env.REFRESH_TOKEN_SECRET_KEY,
                expiresIn: '2w',
            },
        );
        //배포환경에서는 쿠키 보안옵션과 CORS 추가해주어야함
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return refreshToken;
    }
}